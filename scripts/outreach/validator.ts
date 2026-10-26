import dns from "dns";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const ROLE_BASED_PREFIXES = [
  "admin",
  "administrator",
  "billing",
  "compliance",
  "devnull",
  "dns",
  "ftp",
  "hostmaster",
  "info",
  "inoc",
  "ispfeedback",
  "ispsupport",
  "list",
  "list-request",
  "mail",
  "mailer-daemon",
  "marketing",
  "noc",
  "no-reply",
  "noreply",
  "null",
  "phish",
  "phishing",
  "postmaster",
  "privacy",
  "registrar",
  "root",
  "security",
  "spam",
  "sysadmin",
  "support",
  "usenet",
  "uucp",
  "webmaster",
];

export interface ValidationResult {
  isValid: boolean;
  reason?: string;
  isRoleBased?: boolean;
}

export function validateEmailSyntax(email: string): ValidationResult {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    return { isValid: false, reason: "Email is empty" };
  }

  if (cleanEmail.length > 254) {
    return { isValid: false, reason: "Email exceeds maximum length" };
  }

  if (!EMAIL_REGEX.test(cleanEmail)) {
    return { isValid: false, reason: "Invalid email syntax format" };
  }

  const [localPart] = cleanEmail.split("@");
  const isRoleBased = ROLE_BASED_PREFIXES.includes(localPart);

  return { isValid: true, isRoleBased };
}

export async function verifyDomainMx(email: string): Promise<boolean> {
  try {
    const domain = email.split("@")[1];
    if (!domain) return false;

    const mxRecords = await dns.promises.resolveMx(domain);
    return Boolean(mxRecords && mxRecords.length > 0);
  } catch (err) {
    // If DNS query fails or has no MX records
    return false;
  }
}
