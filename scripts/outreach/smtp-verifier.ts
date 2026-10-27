import dns from "node:dns";
import net from "node:net";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {}

export interface SmtpVerifyResult {
  isValid: boolean;
  code: number;
  message: string;
  isCatchAll?: boolean;
}

const catchAllCache = new Map<string, boolean>();

export async function isCatchAllDomain(domain: string): Promise<boolean> {
  const clean = domain.toLowerCase().trim();
  if (catchAllCache.has(clean)) {
    return catchAllCache.get(clean)!;
  }
  const randomEmail = `check_catchall_${Date.now()}@${clean}`;
  const res = await probeSmtpMailbox(randomEmail, 5000);
  const isCatchAll = res.isValid && res.code === 250;
  catchAllCache.set(clean, isCatchAll);
  return isCatchAll;
}

export async function resolveMxHost(domain: string): Promise<string | null> {
  try {
    const records = await dns.promises.resolveMx(domain);
    if (!records || records.length === 0) return null;
    records.sort((a, b) => a.priority - b.priority);
    return records[0].exchange;
  } catch {
    return null;
  }
}

export function probeSmtpMailbox(email: string, timeoutMs: number = 7000): Promise<SmtpVerifyResult> {
  return new Promise(async (resolve) => {
    const domain = email.split("@")[1];
    if (!domain) {
      return resolve({ isValid: false, code: 0, message: "Invalid email domain format" });
    }

    const mxHost = await resolveMxHost(domain);
    if (!mxHost) {
      return resolve({ isValid: false, code: 0, message: "No MX record found for domain" });
    }

    let socket: net.Socket;
    let step = 0;
    let finished = false;

    const finish = (result: SmtpVerifyResult) => {
      if (!finished) {
        finished = true;
        try {
          socket.write("QUIT\r\n");
          socket.destroy();
        } catch {}
        resolve(result);
      }
    };

    const timer = setTimeout(() => {
      finish({ isValid: false, code: 408, message: "SMTP handshake timeout" });
    }, timeoutMs);

    try {
      socket = net.createConnection(25, mxHost);
    } catch (e: any) {
      clearTimeout(timer);
      return resolve({ isValid: false, code: 0, message: `Socket creation error: ${e.message}` });
    }

    socket.setEncoding("utf8");

    socket.on("error", (err) => {
      clearTimeout(timer);
      finish({ isValid: false, code: 0, message: `Socket error: ${err.message}` });
    });

    socket.on("data", (data) => {
      const line = data.toString();
      const code = parseInt(line.substring(0, 3), 10) || 0;

      if (step === 0) {
        // Initial banner received
        if (code === 220) {
          step = 1;
          socket.write("HELO digitalx-solutions.com\r\n");
        } else {
          clearTimeout(timer);
          finish({ isValid: false, code, message: line.trim() });
        }
      } else if (step === 1) {
        // HELO response
        if (code === 250) {
          step = 2;
          socket.write("MAIL FROM:<info@digitalx-solutions.com>\r\n");
        } else {
          clearTimeout(timer);
          finish({ isValid: false, code, message: line.trim() });
        }
      } else if (step === 2) {
        // MAIL FROM response
        if (code === 250) {
          step = 3;
          socket.write(`RCPT TO:<${email}>\r\n`);
        } else {
          clearTimeout(timer);
          finish({ isValid: false, code, message: line.trim() });
        }
      } else if (step === 3) {
        // RCPT TO response!
        clearTimeout(timer);
        if (code === 250) {
          finish({ isValid: true, code, message: line.trim() });
        } else {
          finish({ isValid: false, code, message: line.trim() });
        }
      }
    });
  });
}

// Test runner if executed directly
if (require.main === module) {
  (async () => {
    console.log("Testing mailbox probes...");
    const test1 = await probeSmtpMailbox("jazibshahid0@gmail.com");
    console.log("jazibshahid0@gmail.com ->", test1);

    const test2 = await probeSmtpMailbox("alex@perelelhealth.com");
    console.log("alex@perelelhealth.com ->", test2);

    const test3 = await probeSmtpMailbox("nonexistentxyz99824@gmail.com");
    console.log("nonexistentxyz99824@gmail.com ->", test3);
  })();
}
