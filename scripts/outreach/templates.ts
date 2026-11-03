import { Lead, EmailTemplate } from "./types";
import { defaultOutreachConfig } from "./config";

export function renderTemplate(lead: Lead): EmailTemplate {
  const rawName = lead.name.trim();
  const company = lead.company || "your business";
  let firstName = rawName;

  if (firstName.startsWith("Dr. ")) {
    const parts = firstName.split(" ");
    firstName = parts.length > 2 ? `Dr. ${parts[parts.length - 1]}` : firstName;
  } else if (/\bteam\b/i.test(rawName) || rawName.toLowerCase().startsWith(company.toLowerCase().slice(0, 4))) {
    firstName = `${company} team`;
  } else {
    const firstWord = firstName.split(" ")[0] || "there";
    const isGenericRole = /^(operations|general|managing|practice|clinic|customer|patient|front|intake|property|leasing|agency|founder|director|manager|lead|coordinator|partner|team|office|dispatch|service|estimating|sales|admin|support)$/i.test(firstWord);
    firstName = isGenericRole ? `${company} team` : firstWord;
  }
  const city = lead.city ? ` in ${lead.city}` : "";

  switch (lead.industry) {
    case "trades":
      return renderTradesTemplate(firstName, company, city, lead);
    case "dental":
      return renderDentalTemplate(firstName, company, city, lead);
    case "b2b":
      return renderB2BTemplate(firstName, company, city, lead);
    default:
      return renderGeneralTemplate(firstName, company, city, lead);
  }
}

function renderTradesTemplate(firstName: string, company: string, city: string, lead: Lead): EmailTemplate {
  const isAu = lead.country === "AU" || lead.email.toLowerCase().endsWith(".au");
  const subject = `after-hours calls at ${company}`;

  const webUrl = isAu ? "https://digitalx-solutions.com" : "https://digitalx-solutions.com/usa";
  const software = isAu ? "ServiceM8, Fergus, Simpro, or your calendar" : "ServiceTitan, Jobber, Housecall Pro, or your calendar";
  const directLine = isAu ? "info@digitalx-solutions.com | +61 451 413 786" : "info@digitalx-solutions.com";
  const contractorLabel = isAu ? "Australian trade contractors" : "US trade contractors";

  const companyLower = (company + " " + (lead.notes || "")).toLowerCase();
  const isRoofing = companyLower.includes("roof");
  const isPlumbing = companyLower.includes("plumb");

  let painQuestion = "when calls come in after 6:00 PM or while your crew is tied up on a job, who answers them?";
  let emergencyExample = "emergency callouts vs routine quotes";

  if (isRoofing) {
    painQuestion = "when your crew is up on a roof or quoting on-site, who handles new quote enquiries and emergency storm calls?";
    emergencyExample = "urgent roof leaks / storm damage vs routine restoration quotes";
  } else if (isPlumbing) {
    painQuestion = "when urgent calls come in after-hours or while your team is on a job, who answers them?";
    emergencyExample = "emergency burst pipes / gas leaks vs standard callouts";
  }

  const bodyText = `Hi ${firstName},

Saw the work ${company} is doing${city}. Quick question: ${painQuestion}

In a benchmark test we ran calling trade businesses after-hours, over 60% went straight to voicemail—and over 80% of property owners hang up and immediately call the next contractor on Google.

We deploy autonomous AI voice receptionists trained specifically for ${contractorLabel} that:
- Answer in under 500 milliseconds with an authentic local voice (sounds 100% human)
- Triage ${emergencyExample}
- Dispatch emergency jobs directly to your on-call technician via SMS
- Book standard jobs directly into ${software}

Would you be open to hearing a 60-second live demo call? You can also test it directly in your browser right now:
https://digitalx-solutions.com/try-voice-agent

Best regards,

Ahsan
DigitalX Solutions | AI Telephony & Automation
Web: ${webUrl}
Direct: ${directLine}

---
To opt out, reply with "unsubscribe" and you will be immediately removed.
${defaultOutreachConfig.companyAddress}`;

  const bodyHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1e293b;">
  <p>Hi ${firstName},</p>
  <p>Saw the work ${company} is doing${city}. Quick question: ${painQuestion}</p>
  <p>In a benchmark test we ran calling trade businesses after-hours, <strong>over 60% went straight to voicemail</strong>—and over 80% of property owners hang up and immediately call the next contractor on Google.</p>
  <p>We deploy autonomous AI voice receptionists trained specifically for ${contractorLabel} that:</p>
  <ul>
    <li>Answer in under 500 milliseconds with an authentic local voice (sounds 100% human)</li>
    <li>Triage ${emergencyExample}</li>
    <li>Dispatch emergency jobs directly to your on-call technician via SMS</li>
    <li>Book standard jobs directly into ${software}</li>
  </ul>
  <p>Would you be open to hearing a 60-second live demo call? You can also test it directly in your browser at <a href="https://digitalx-solutions.com/try-voice-agent" style="color: #0f766e; text-decoration: underline; font-weight: 500;">digitalx-solutions.com/try-voice-agent</a>.</p>
  <p>Best regards,</p>
  <p><strong>Ahsan</strong><br/>
  DigitalX Solutions | AI Telephony & Automation<br/>
  <a href="${webUrl}" style="color: #0f766e;">${webUrl.replace('https://', '')}</a> | <a href="mailto:info@digitalx-solutions.com" style="color: #0f766e;">${directLine}</a></p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px 0;" />
  <p style="font-size: 11px; color: #94a3b8; line-height: 1.4;">
    To opt out of future emails, reply with "unsubscribe" and you will be immediately removed.<br/>
    ${defaultOutreachConfig.companyAddress}
  </p>
</div>`;

  return { subject, bodyText, bodyHtml };
}

function renderDentalTemplate(firstName: string, company: string, city: string, lead: Lead): EmailTemplate {
  const isAu = lead.country === "AU" || lead.email.toLowerCase().endsWith(".au");
  const subject = `patient phone inquiries at ${company}`;
  const webUrl = isAu ? "https://digitalx-solutions.com" : "https://digitalx-solutions.com/usa";
  const software = isAu ? "Dental4Windows, Cliniko, or your calendar" : "Dentrix, Eaglesoft, Open Dental, or your scheduling calendar";
  const directLine = isAu ? "info@digitalx-solutions.com | +61 451 413 786" : "info@digitalx-solutions.com";
  const clinicLabel = isAu ? "Australian dental & medical clinics" : "US dental & medical practices";

  const bodyText = `Hi ${firstName},

Hope your week is going well. I came across ${company}'s practice${city}.

Front desk coordinators are frequently overwhelmed greeting arriving patients, processing insurance copays, and answering ringing phones simultaneously. During morning check-ins and lunch hours, practices often miss 25% to 35% of patient calls—dropping prospective high-value treatment inquiries to voicemail.

We deploy 24/7 AI voice receptionists for ${clinicLabel} that:
- Answer instantly on ring 2 with zero hold time
- Handle procedure questions and new patient inquiries naturally
- Sync appointments directly into ${software} without booking conflicts

Would you be open to a quick 3-minute chat or hearing how it works? You can also test a live voice demo directly in your browser here:
https://digitalx-solutions.com/try-voice-agent

Best regards,

Ahsan
DigitalX Solutions | AI Telephony & Healthcare Automation
Web: ${webUrl}
Direct: ${directLine}

---
To opt out, reply with "unsubscribe" to be immediately removed.
${defaultOutreachConfig.companyAddress}`;

  const bodyHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1e293b;">
  <p>Hi ${firstName},</p>
  <p>Hope your week is going well. I came across ${company}'s practice${city}.</p>
  <p>Front desk coordinators are frequently overwhelmed greeting arriving patients, processing insurance copays, and answering ringing phones simultaneously. During morning check-ins and lunch hours, practices often miss 25% to 35% of patient calls—dropping prospective high-value treatment inquiries to voicemail.</p>
  <p>We deploy 24/7 AI voice receptionists for ${clinicLabel} that:</p>
  <ul>
    <li>Answer instantly on ring 2 with zero hold time</li>
    <li>Handle procedure questions and new patient inquiries naturally</li>
    <li>Sync appointments directly into ${software} without booking conflicts</li>
  </ul>
  <p>Would you be open to a quick 3-minute chat or hearing how it works? You can also test a live voice demo directly in your browser at <a href="https://digitalx-solutions.com/try-voice-agent" style="color: #0f766e; text-decoration: underline; font-weight: 500;">digitalx-solutions.com/try-voice-agent</a>.</p>
  <p>Best regards,</p>
  <p><strong>Ahsan</strong><br/>
  DigitalX Solutions | AI Telephony & Healthcare Automation<br/>
  <a href="${webUrl}" style="color: #0f766e;">${webUrl.replace('https://', '')}</a> | <a href="mailto:info@digitalx-solutions.com" style="color: #0f766e;">${directLine}</a></p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px 0;" />
  <p style="font-size: 11px; color: #94a3b8; line-height: 1.4;">
    To opt out, reply with "unsubscribe" to be immediately removed.<br/>
    ${defaultOutreachConfig.companyAddress}
  </p>
</div>`;

  return { subject, bodyText, bodyHtml };
}

function renderB2BTemplate(firstName: string, company: string, city: string, lead: Lead): EmailTemplate {
  const isAu = lead.country === "AU" || lead.email.toLowerCase().endsWith(".au");
  const subject = `automation architecture at ${company} (n8n vs Zapier)`;
  const webUrl = isAu ? "https://digitalx-solutions.com" : "https://digitalx-solutions.com/usa";
  const directLine = isAu ? "info@digitalx-solutions.com | +61 451 413 786" : "info@digitalx-solutions.com";

  const bodyText = `Hi ${firstName},

I came across ${company} while looking at high-growth operations${city}.

Quick question: are you currently running business automations on Zapier or Make?

Many growing service and advisory businesses hit a scaling wall where Zapier execution fees climb to $500–$2,000/month simply to move data between CRMs, forms, and ad channels.

At DigitalX Solutions, we engineer private self-hosted n8n instances and GoHighLevel CRM pipelines:
- Unlimited workflow executions for a flat ~$20/mo server cost (80%+ software savings)
- Strict local data sovereignty (HIPAA and SOC2 compliant)
- Native AI agent nodes connected directly to your CRM and databases

Would you be open to a 10-minute workflow review to see if migrating your pipelines makes sense this quarter?

Best regards,

Ahsan
DigitalX Solutions | Cloud Automation & Integrations
Web: ${webUrl}
Direct: ${directLine}

---
To opt out, reply with "unsubscribe" to be immediately removed.
${defaultOutreachConfig.companyAddress}`;

  const bodyHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1e293b;">
  <p>Hi ${firstName},</p>
  <p>I came across ${company} while looking at high-growth operations${city}.</p>
  <p>Quick question: are you currently running business automations on Zapier or Make?</p>
  <p>Many growing service and advisory businesses hit a scaling wall where Zapier execution fees climb to $500–$2,000/month simply to move data between CRMs, forms, and ad channels.</p>
  <p>At DigitalX Solutions, we engineer private self-hosted n8n instances and GoHighLevel CRM pipelines:</p>
  <ul>
    <li>Unlimited workflow executions for a flat ~$20/mo server cost (80%+ software savings)</li>
    <li>Strict local data sovereignty (HIPAA and SOC2 compliant)</li>
    <li>Native AI agent nodes connected directly to your CRM and databases</li>
  </ul>
  <p>Would you be open to a 10-minute workflow review to see if migrating your pipelines makes sense this quarter?</p>
  <p>Best regards,</p>
  <p><strong>Ahsan</strong><br/>
  DigitalX Solutions | Cloud Automation & Integrations<br/>
  <a href="${webUrl}" style="color: #0f766e;">${webUrl.replace('https://', '')}</a> | <a href="mailto:info@digitalx-solutions.com" style="color: #0f766e;">${directLine}</a></p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px 0;" />
  <p style="font-size: 11px; color: #94a3b8; line-height: 1.4;">
    To opt out, reply with "unsubscribe" to be immediately removed.<br/>
    ${defaultOutreachConfig.companyAddress}
  </p>
</div>`;

  return { subject, bodyText, bodyHtml };
}

function renderGeneralTemplate(firstName: string, company: string, city: string, lead: Lead): EmailTemplate {
  const isAu = lead.country === "AU" || lead.email.toLowerCase().endsWith(".au");
  const subject = `missed call lead recovery for ${company}`;
  const webUrl = isAu ? "https://digitalx-solutions.com" : "https://digitalx-solutions.com/usa";
  const directLine = isAu ? "info@digitalx-solutions.com | +61 451 413 786" : "info@digitalx-solutions.com";

  const bodyText = `Hi ${firstName},

I hope this finds you well. I came across ${company} and wanted to reach out with a quick question.

When new client inquiries call your business while your team is on another line or after-hours, how quickly are they followed up?

We help service businesses capture 100% of inbound calls by deploying:
1. Sub-500ms AI voice receptionists that answer 24/7 and book appointments
2. Under-60-second missed-call text-back that instantly engages prospective clients before they call a competitor

Would you be open to a quick 5-minute call or testing our voice agent demo directly in your browser?
https://digitalx-solutions.com/try-voice-agent

Best regards,

Ahsan
DigitalX Solutions | AI Telephony & Automation
Web: ${webUrl}
Direct: ${directLine}

---
To opt out, reply with "unsubscribe" to be immediately removed.
${defaultOutreachConfig.companyAddress}`;

  const bodyHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1e293b;">
  <p>Hi ${firstName},</p>
  <p>I hope this finds you well. I came across ${company} and wanted to reach out with a quick question.</p>
  <p>When new client inquiries call your business while your team is on another line or after-hours, how quickly are they followed up?</p>
  <p>We help service businesses capture 100% of inbound calls by deploying:</p>
  <ol>
    <li>Sub-500ms AI voice receptionists that answer 24/7 and book appointments</li>
    <li>Under-60-second missed-call text-back that instantly engages prospective clients before they call a competitor</li>
  </ol>
  <p>Would you be open to a quick 5-minute call or testing our voice agent demo directly in your browser at <a href="https://digitalx-solutions.com/try-voice-agent" style="color: #0f766e;">digitalx-solutions.com/try-voice-agent</a>?</p>
  <p>Best regards,</p>
  <p><strong>Ahsan</strong><br/>
  DigitalX Solutions | AI Telephony & Automation<br/>
  <a href="${webUrl}" style="color: #0f766e;">${webUrl.replace('https://', '')}</a> | <a href="mailto:info@digitalx-solutions.com" style="color: #0f766e;">${directLine}</a></p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px 0;" />
  <p style="font-size: 11px; color: #94a3b8; line-height: 1.4;">
    To opt out, reply with "unsubscribe" to be immediately removed.<br/>
    ${defaultOutreachConfig.companyAddress}
  </p>
</div>`;

  return { subject, bodyText, bodyHtml };
}
