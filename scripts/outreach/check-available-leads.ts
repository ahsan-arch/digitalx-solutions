import fs from "fs";
import { scrapedLeads } from "./scraped-leads";

const history = JSON.parse(fs.readFileSync("data/outreach-history.json", "utf8"));
const sentEmails = new Set(history.filter((r: any) => r.status === "sent").map((r: any) => r.email.toLowerCase().trim()));

console.log("History total records:", history.length);
console.log("Sent emails count:", sentEmails.size);
console.log("Scraped leads total:", scrapedLeads.length);

const uncontactedScraped = scrapedLeads.filter((l: any) => l.email && !sentEmails.has(l.email.toLowerCase().trim()));
console.log("Uncontacted in scraped-leads:", uncontactedScraped.length);

if (uncontactedScraped.length > 0) {
  console.log("First 5 uncontacted in scraped-leads:", uncontactedScraped.slice(0, 5));
}

