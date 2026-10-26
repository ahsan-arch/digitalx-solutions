import { Lead, EmailTemplate } from "./types";
import { defaultOutreachConfig } from "./config";

export function renderTemplate(lead: Lead): EmailTemplate {
  let firstName = lead.name.trim();
  if (firstName.startsWith("Dr. ")) {
    const parts = firstName.split(" ");
    firstName = parts.length > 2 ? `Dr. ${parts[parts.length - 1]}` : firstName;
  } else {
    firstName = firstName.split(" ")[0] || "there";
  }

  const company = lead.company || "your business";
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
  const subject = `quick question regarding after-hours calls at ${company}`;

  const bodyText = `Hi ${firstName},

Saw the work ${company} is doing${city}. Quick question: when emergency calls come in after 6:00 PM or while your crew is on a job, who answers them?

In a recent study we ran calling 80 trade businesses after-hours, 61.2% went straight to voicemail—and over 82% of homeowners hang up and immediately dial the next contractor on Google.

We built an autonomous AI voice receptionist specifically for trades that:
- Answers in under 500 milliseconds (sounds authentically human)
- Triages emergency burst pipes / urgent callouts vs routine quotes
- Dispatches emergency jobs directly to your on-call tech via SMS while booking standard jobs into your CRM

Would you be open to testing a 60-second live demo call to hear how it sounds? You can also test it directly in your browser here: https://digitalx-solutions.com/try-voice-agent

Best regards,

Ahsan Architect
Lead Automation Engineer | DigitalX Solutions
Web: https://digitalx-solutions.com
Direct: +61 451 413 786

---
To opt out of future emails, reply with "unsubscribe" and you will be immediately removed.
${defaultOutreachConfig.companyAddress}`;

  const bodyHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1e293b;">
  <p>Hi ${firstName},</p>
  <p>Saw the work ${company} is doing${city}. Quick question: when emergency calls come in after 6:00 PM or while your crew is on a job, who answers them?</p>
  <p>In a recent benchmark study we ran calling 80 trade businesses after-hours, <strong>61.2% went straight to voicemail</strong>—and over 82% of callers hang up and immediately dial the next contractor on Google.</p>
  <p>We built an autonomous AI voice receptionist specifically for trades that:</p>
  <ul>
    <li>Answers in under 500 milliseconds with an authentic local voice</li>
    <li>Triages emergency callouts vs routine quotes</li>
    <li>Dispatches emergency jobs to your on-call technician via SMS and books standard visits directly into your CRM</li>
  </ul>
  <p>Would you be open to testing a 60-second live demo call to hear how it sounds? You can also test it directly in your browser at <a href="https://digitalx-solutions.com/try-voice-agent" style="color: #0f766e; text-decoration: underline;">digitalx-solutions.com/try-voice-agent</a>.</p>
  <p>Best regards,</p>
  <p><strong>Ahsan Architect</strong><br/>
  Lead Automation Engineer | DigitalX Solutions<br/>
  <a href="https://digitalx-solutions.com" style="color: #0f766e;">digitalx-solutions.com</a> | +61 451 413 786</p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px 0;" />
  <p style="font-size: 11px; color: #94a3b8; line-height: 1.4;">
    To opt out of future emails, reply with "unsubscribe" and you will be immediately removed.<br/>
    ${defaultOutreachConfig.companyAddress}
  </p>
</div>`;

  return { subject, bodyText, bodyHtml };
}

function renderDentalTemplate(firstName: string, company: string, city: string, lead: Lead): EmailTemplate {
  const subject = `appointment booking overflow for ${company}`;

  const bodyText = `Hi ${firstName},

Hope your week is going well. I noticed ${company}'s practice${city}.

Front desk coordinators are often overwhelmed greeting arriving patients, processing insurance copays, and answering ringing phones simultaneously. During morning check-ins and lunchtime rushes, clinics frequently miss 25% to 35% of patient calls—dropping prospective high-value treatment inquiries to voicemail.

We deploy 24/7 AI voice receptionists for healthcare & dental clinics that:
- Answer instantly on ring 2 with zero hold time
- Answer procedure and scheduling questions naturally
- Sync appointments directly into practice management calendars (Cliniko, Google Calendar, Dentrix) without booking conflicts

Would you be open to a quick 5-minute chat to see how another clinic deployed this without adding administrative headcount?

Best regards,

Ahsan Architect
DigitalX Solutions | AI Telephony & Automation
Direct: +61 451 413 786 | https://digitalx-solutions.com

---
To opt out, reply with "unsubscribe" to be immediately removed.
${defaultOutreachConfig.companyAddress}`;

  const bodyHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1e293b;">
  <p>Hi ${firstName},</p>
  <p>Hope your week is going well. I noticed ${company}'s practice${city}.</p>
  <p>Front desk coordinators are often overwhelmed greeting arriving patients, processing insurance copays, and answering ringing phones simultaneously. During morning check-ins and lunchtime rushes, clinics frequently miss 25% to 35% of patient calls—dropping prospective high-value treatment inquiries to voicemail.</p>
  <p>We deploy 24/7 AI voice receptionists for healthcare & dental clinics that:</p>
  <ul>
    <li>Answer instantly on ring 2 with zero hold time</li>
    <li>Answer procedure and scheduling questions naturally</li>
    <li>Sync appointments directly into practice management calendars (Cliniko, Google Calendar, Dentrix) without booking conflicts</li>
  </ul>
  <p>Would you be open to a quick 5-minute chat to see how other clinics deployed this without adding administrative headcount?</p>
  <p>Best regards,</p>
  <p><strong>Ahsan Architect</strong><br/>
  DigitalX Solutions | AI Telephony & Automation<br/>
  <a href="https://digitalx-solutions.com" style="color: #0f766e;">digitalx-solutions.com</a> | +61 451 413 786</p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px 0;" />
  <p style="font-size: 11px; color: #94a3b8; line-height: 1.4;">
    To opt out, reply with "unsubscribe" to be immediately removed.<br/>
    ${defaultOutreachConfig.companyAddress}
  </p>
</div>`;

  return { subject, bodyText, bodyHtml };
}

function renderB2BTemplate(firstName: string, company: string, city: string, lead: Lead): EmailTemplate {
  const subject = `automation architecture at ${company} (n8n vs Zapier)`;

  const bodyText = `Hi ${firstName},

I came across ${company} while looking at high-growth operations${city}.

Quick question: are you currently running business automations on Zapier or Make?

Many growing service and advisory businesses hit a scaling wall where Zapier execution fees climb to $500–$2,000/month simply to move data between CRMs, forms, and ad channels.

At DigitalX Solutions, we engineer private self-hosted n8n instances and GoHighLevel CRM pipelines:
- Unlimited workflow executions for a flat ~$20/mo server cost (80%+ software savings)
- Strict local data sovereignty (HIPAA and Australian Privacy Act compliant)
- Native AI agent nodes connected directly to your CRM and databases

Would you be open to a 10-minute workflow review to see if migrating your pipelines makes sense this quarter?

Best regards,

Ahsan Architect
Lead Automation Engineer | DigitalX Solutions
https://digitalx-solutions.com | +61 451 413 786

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
    <li>Strict local data sovereignty (HIPAA and Australian Privacy Act compliant)</li>
    <li>Native AI agent nodes connected directly to your CRM and databases</li>
  </ul>
  <p>Would you be open to a 10-minute workflow review to see if migrating your pipelines makes sense this quarter?</p>
  <p>Best regards,</p>
  <p><strong>Ahsan Architect</strong><br/>
  Lead Automation Engineer | DigitalX Solutions<br/>
  <a href="https://digitalx-solutions.com" style="color: #0f766e;">digitalx-solutions.com</a> | +61 451 413 786</p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px 0;" />
  <p style="font-size: 11px; color: #94a3b8; line-height: 1.4;">
    To opt out, reply with "unsubscribe" to be immediately removed.<br/>
    ${defaultOutreachConfig.companyAddress}
  </p>
</div>`;

  return { subject, bodyText, bodyHtml };
}

function renderGeneralTemplate(firstName: string, company: string, city: string, lead: Lead): EmailTemplate {
  const subject = `missed call lead recovery for ${company}`;

  const bodyText = `Hi ${firstName},

I hope this finds you well. I came across ${company} and wanted to reach out with a quick question.

When new client inquiries call your business while your team is on another line or after-hours, how quickly are they followed up?

We help service businesses capture 100% of inbound calls by deploying:
1. Sub-500ms AI voice receptionists that answer 24/7 and book appointments
2. Under-60-second missed-call text-back that instantly engages prospective clients before they call a competitor

Would you be open to a quick 5-minute call or testing our voice agent demo directly in your browser? https://digitalx-solutions.com/try-voice-agent

Best regards,

Ahsan Architect
DigitalX Solutions | AI Telephony & Automation
Web: https://digitalx-solutions.com | +61 451 413 786

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
  <p><strong>Ahsan Architect</strong><br/>
  DigitalX Solutions | AI Telephony & Automation<br/>
  <a href="https://digitalx-solutions.com" style="color: #0f766e;">digitalx-solutions.com</a> | +61 451 413 786</p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px 0;" />
  <p style="font-size: 11px; color: #94a3b8; line-height: 1.4;">
    To opt out, reply with "unsubscribe" to be immediately removed.<br/>
    ${defaultOutreachConfig.companyAddress}
  </p>
</div>`;

  return { subject, bodyText, bodyHtml };
}
