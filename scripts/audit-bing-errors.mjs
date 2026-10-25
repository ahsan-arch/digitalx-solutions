import fs from 'fs';

// Check URLs in urls.csv or check routes dynamically
const urlsCsv = fs.readFileSync('docs/seo/urls.csv', 'utf8');
const lines = urlsCsv.split('\n').filter(Boolean);

console.log('--- AUDITING URLS FOR TITLE AND DESCRIPTION LENGTHS ---');
const longTitles = [];
const shortDescs = [];

for (let i = 1; i < lines.length; i++) {
  // Regex to extract csv fields: url, status, title, titleLength, description, descriptionLength
  const parts = lines[i].split('","');
  if (parts.length >= 4) {
    const urlAndStatus = parts[0].replace(/^"/, '').split(',');
    const url = urlAndStatus[0];
    const status = urlAndStatus[1];
    const titleAndLen = parts[1]; // "title",len
    // Let's parse properly
  }
}

// Better yet, let's parse with proper CSV splitting
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('page.tsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

console.log('\n--- SCANNING ALL PAGE.TSX FILES ---');
const pageFiles = walk('src/app');

const allIssues = [];

pageFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Find generatePageMetadata calls
  const metaMatch = content.match(/generatePageMetadata\([^,]+,\s*\{([^}]+)\}/s);
  if (metaMatch) {
    const block = metaMatch[1];
    const titleMatch = block.match(/title:\s*["'`]([^"'`]+)["'`]/);
    const descMatch = block.match(/description:\s*(?:["'`]([^"'`]+)["'`]|(\w+))/);
    
    if (titleMatch && !file.includes('[slug]')) {
      const fullTitle = `${titleMatch[1]} | DigitalX Solutions`;
      if (fullTitle.length > 60) {
        allIssues.push({ file, type: 'Title too long', length: fullTitle.length, value: fullTitle });
      }
    }
    
    if (descMatch && descMatch[1] && !file.includes('[slug]')) {
      const desc = descMatch[1].replace(/\s+/g, ' ').trim();
      if (desc.length < 150 || desc.length > 165) {
        allIssues.push({ file, type: 'Meta description out of bounds (150-160)', length: desc.length, value: desc });
      }
    }
  }
});

import { industries } from '../src/data/industries.js';
import { solutions, results } from '../src/data/redesign.js';
import { developmentServices } from '../src/data/development-services.js';
import { articlesData } from '../src/data/insights-articles.js';

console.log('\n--- SCANNING ALL DYNAMIC ROUTES ---');
let dynamicIssues = 0;

// 1. Industries (50)
industries.forEach(ind => {
  const fullTitle = `${ind.name} AI Playbook | DigitalX Solutions`;
  if (fullTitle.length > 60) {
    console.log(`[Industry Title too long] (${fullTitle.length}) ${ind.slug}: "${fullTitle}"`);
    dynamicIssues++;
  }
  const fallbackDesc = `Automate ${ind.name.toLowerCase()} operations with 24/7 AI voice receptionists, instant missed-call text-back, and CRM booking workflows across the US and Australia.`;
  const desc = ind.metaDescription || (fallbackDesc.length < 150 ? `Automate ${ind.name.toLowerCase()} operations with 24/7 AI voice receptionists, instant missed-call text-back, and CRM booking workflows across both the US and Australia.` : fallbackDesc);
  if (desc.length < 150 || desc.length > 165) {
    console.log(`[Industry Desc out of bounds] (${desc.length}) ${ind.slug}: "${desc}"`);
    dynamicIssues++;
  }
});

// 2. Solutions (8)
solutions.forEach(sol => {
  const fullTitle = `${sol.headline} | DigitalX Solutions`;
  if (fullTitle.length > 65) {
    console.log(`[Solution Title too long] (${fullTitle.length}) ${sol.slug}: "${fullTitle}"`);
    dynamicIssues++;
  }
  const desc = sol.metaDescription || sol.summary;
  if (desc.length < 150 || desc.length > 165) {
    console.log(`[Solution Desc out of bounds] (${desc.length}) ${sol.slug}: "${desc}"`);
    dynamicIssues++;
  }
});

// 3. Development Services
developmentServices.forEach(dev => {
  const fullTitle = `${dev.metaTitle} | DigitalX Solutions`;
  if (fullTitle.length > 65) {
    console.log(`[Dev Title too long] (${fullTitle.length}) ${dev.slug}: "${fullTitle}"`);
    dynamicIssues++;
  }
  const desc = dev.metaDescription || dev.summary;
  if (desc.length < 150 || desc.length > 165) {
    console.log(`[Dev Desc out of bounds] (${desc.length}) ${dev.slug}: "${desc}"`);
    dynamicIssues++;
  }
});

// 4. Case Studies
results.forEach(res => {
  const fullTitle = `${res.client} Case Study | DigitalX Solutions`;
  if (fullTitle.length > 65) {
    console.log(`[Work Title too long] (${fullTitle.length}) ${res.slug}: "${fullTitle}"`);
    dynamicIssues++;
  }
  const desc = res.metaDescription || `${res.client}: ${res.impact}`;
  if (desc.length < 150 || desc.length > 165) {
    console.log(`[Work Desc out of bounds] (${desc.length}) ${res.slug}: "${desc}"`);
    dynamicIssues++;
  }
});

// 5. Insights Articles
Object.entries(articlesData).forEach(([slug, art]) => {
  const fullTitle = `${art.metaTitle || art.title} | DigitalX Solutions`;
  if (fullTitle.length > 65) {
    console.log(`[Article Title too long] (${fullTitle.length}) ${slug}: "${fullTitle}"`);
    dynamicIssues++;
  }
  const desc = art.description;
  if (desc.length < 150 || desc.length > 165) {
    console.log(`[Article Desc out of bounds] (${desc.length}) ${slug}: "${desc}"`);
    dynamicIssues++;
  }
});

console.log(`Total dynamic route issues: ${dynamicIssues}`);


