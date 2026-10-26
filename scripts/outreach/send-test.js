const nodemailer = require("nodemailer");

async function sendTest() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info@digitalx-solutions.com",
      pass: "zworvxbmojkpqvtf",
    },
  });

  const subject = "quick question about patient calls at Perelel";

  const bodyText = `Hi Alex,

Saw the work you are doing at Perelel and wanted to reach out directly.

A common challenge we see with healthcare practices is the front desk getting slammed with patient calls, meaning appointment requests and after hours calls end up going to voicemail.

We built an AI voice agent for medical practices that answers every call 24/7 and books appointments straight into your calendar, plus an instant text back if a caller hangs up.

Would you be open to a quick 5 minute chat this week to see how it works?

Best regards,
Muhammad Hashir Butt
DigitalX Solutions
digitalx-solutions.com
+61 451 413 786`;

  console.log("Connecting to Gmail SMTP...");
  await transporter.verify();
  console.log("Transporter verified.");

  console.log("Sending human-written test email to jazibshahid0@gmail.com...");
  const info = await transporter.sendMail({
    from: "Muhammad Hashir Butt <info@digitalx-solutions.com>",
    to: "jazibshahid0@gmail.com",
    replyTo: "info@digitalx-solutions.com",
    subject: subject,
    text: bodyText,
  });

  console.log("EMAIL_SENT_SUCCESS! Message ID:", info.messageId);
}

sendTest().catch((err) => {
  console.error("Failed to send test email:", err);
  process.exit(1);
});
