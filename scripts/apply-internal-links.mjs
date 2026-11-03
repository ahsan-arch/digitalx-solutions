import fs from 'fs';

function updateFile(path, updater) {
  let content = fs.readFileSync(path, 'utf8');
  const updated = updater(content);
  if (content !== updated) {
    fs.writeFileSync(path, updated, 'utf8');
    console.log(`✔ Successfully updated ${path}`);
  } else {
    console.log(`ℹ No changes needed in ${path}`);
  }
}

// 1. USA page
updateFile('src/app/usa/page.tsx', (content) => {
  return content.replace(
    /From Brooklyn brownstones to Austin med spas, we deploy AI voice, Missed call text back, and CRM\s*automation so you stop losing local revenue to missed calls and slow follow ups\./g,
    `From Brooklyn brownstones to Austin med spas, we deploy{" "}\n              <Link href="/solutions/ai-voice-agents" className="font-semibold text-accent hover:underline">\n                24/7 AI voice receptionists\n              </Link>\n              ,{" "}\n              <Link href="/solutions/missed-call-text-back" className="font-semibold text-accent hover:underline">\n                missed-call text-back systems\n              </Link>\n              , and{" "}\n              <Link href="/solutions/gohighlevel-implementation" className="font-semibold text-accent hover:underline">\n                GoHighLevel CRM setups\n              </Link>{" "}\n              so you stop losing local revenue to missed calls and slow follow-ups.`
  );
});

// 2. AU page
updateFile('src/app/au/page.tsx', (content) => {
  return content.replace(
    /Built in Casula, deployed across Sydney, Melbourne, Brisbane, and Perth\. AI voice, Missed call recovery,\s*and CRM systems tuned for Australian customers and Australian Privacy Principles\./g,
    `Built in Casula, deployed across Sydney, Melbourne, Brisbane, and Perth. Deploying{" "}\n              <Link href="/solutions/ai-voice-agents" className="font-semibold text-accent hover:underline">\n                Australian AI voice agents\n              </Link>\n              ,{" "}\n              <Link href="/solutions/missed-call-text-back" className="font-semibold text-accent hover:underline">\n                tradie missed-call text-back\n              </Link>\n              , and{" "}\n              <Link href="/solutions/gohighlevel-implementation" className="font-semibold text-accent hover:underline">\n                GoHighLevel CRM systems\n              </Link>{" "}\n              tuned for Australian customers and Australian Privacy Principles.`
  );
});

// 3. Web Design page
updateFile('src/app/services/web-design-and-development/page.tsx', (content) => {
  return content.replace(
    /We are an automation first agency\. When clients also need a new site &mdash; one engineered to feed leads\s*straight into the automation stack &mdash; we build it ourselves on Next\.js\./g,
    `We are an automation first agency. When clients also need a new site &mdash; one engineered to feed leads straight into our{" "}\n              <Link href="/solutions/ai-voice-agents" className="font-semibold text-accent hover:underline">\n                24/7 AI voice receptionists\n              </Link>\n              ,{" "}\n              <Link href="/solutions/gohighlevel-implementation" className="font-semibold text-accent hover:underline">\n                GoHighLevel CRM setups\n              </Link>\n              , and{" "}\n              <Link href="/solutions/n8n-workflow-automation" className="font-semibold text-accent hover:underline">\n                custom n8n workflows\n              </Link>{" "}\n              &mdash; we build it ourselves on Next.js.`
  );
});

// 4. Meta Ads page
updateFile('src/app/services/meta-ads/page.tsx', (content) => {
  return content.replace(
    /Most agencies still rely on the browser pixel\. We engineer the full attribution loop &mdash; CAPI,\s*server side tagging, deduplication &mdash; so Meta can actually find your customers\./g,
    `Most agencies still rely on the browser pixel. We engineer the full attribution loop &mdash; CAPI, server side tagging, deduplication &mdash; directly feeding into your{" "}\n              <Link href="/solutions/gohighlevel-implementation" className="font-semibold text-accent hover:underline">\n                GoHighLevel CRM pipelines\n              </Link>{" "}\n              and{" "}\n              <Link href="/solutions/n8n-workflow-automation" className="font-semibold text-accent hover:underline">\n                n8n webhook automations\n              </Link>{" "}\n              so Meta can actually find your highest-LTV customers.`
  );
});

// 5. Canonicalize /solutions/ai-voice-receptionists -> /solutions/ai-voice-agents in insights-articles.ts
updateFile('src/data/insights-articles.ts', (content) => {
  return content.replaceAll('/solutions/ai-voice-receptionists', '/solutions/ai-voice-agents');
});

console.log('Finished applying internal linking upgrades.');
