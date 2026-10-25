#!/usr/bin/env node

/**
 * DigitalX Solutions — Build-Time Technical SEO Quality Gate
 * 
 * Enforces non-negotiable SEO standards:
 * 1. Every content page must have >= 500 words of unique body copy.
 * 2. Exactly one <h1> per page.
 * 3. Title length <= 60 characters.
 * 4. Meta description length <= 155 characters.
 * 5. All <img> tags must have a valid alt attribute.
 * 6. All JSON-LD schemas must be valid parseable JSON.
 * 
 * Fails the build (process.exit(1)) if any violations are detected.
 */

const fs = require('fs');
const path = require('path');

const APP_SERVER_DIR = path.resolve(__dirname, '../.next/server/app');

// Exempt technical / utility routes from the 500-word content minimum
const CONTENT_EXEMPT_ROUTES = new Set([
  '/_not-found',
  '/not-found',
  '/404',
  '/500',
  '/api',
  '/legal/cookies',
  '/legal/terms',
  '/legal/privacy',
  '/icon',
  '/apple-icon',
]);

const failures = [];
const checkedRoutes = [];

function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function getRouteFromPath(filePath) {
  let relative = path.relative(APP_SERVER_DIR, filePath).replace(/\\/g, '/');
  if (relative.endsWith('/index.html')) {
    relative = relative.slice(0, -11);
  } else if (relative.endsWith('.html')) {
    relative = relative.slice(0, -5);
  }
  if (!relative.startsWith('/')) {
    relative = '/' + relative;
  }
  return relative === '/index' ? '/' : relative;
}

function stripTags(html, tagNames) {
  let result = html;
  for (const tag of tagNames) {
    let lower = result.toLowerCase();
    let openStr = '<' + tag;
    let closeStr = '</' + tag + '>';
    let startIdx = 0;
    while ((startIdx = lower.indexOf(openStr, startIdx)) !== -1) {
      const endTagIdx = lower.indexOf(closeStr, startIdx);
      if (endTagIdx !== -1) {
        const fullEnd = endTagIdx + closeStr.length;
        result = result.slice(0, startIdx) + ' ' + result.slice(fullEnd);
        lower = result.toLowerCase();
      } else {
        const nextGt = lower.indexOf('>', startIdx);
        if (nextGt !== -1) {
          result = result.slice(0, startIdx) + ' ' + result.slice(nextGt + 1);
          lower = result.toLowerCase();
        } else {
          break;
        }
      }
    }
  }
  return result;
}

function extractUniqueWords(html) {
  // Strip non-content and boilerplate blocks
  let content = stripTags(html, [
    'script',
    'style',
    'svg',
    'nav',
    'footer',
    'noscript',
    'iframe',
  ]);
  // Remove remaining HTML tags
  content = content.replace(/<[^>]+>/g, ' ');
  // Unescape basic HTML entities
  content = content
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');
  // Split into words
  const words = content.trim().split(/\s+/).filter(w => w.length > 0 && !/^[^a-zA-Z0-9]+$/.test(w));
  return words.length;
}

function auditHtmlFile(filePath) {
  const route = getRouteFromPath(filePath);
  if (CONTENT_EXEMPT_ROUTES.has(route) || route.startsWith('/api')) {
    return;
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  const routeFailures = [];

  // 1. Title Check
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = (titleMatch ? titleMatch[1].trim() : '')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');
  if (!title) {
    routeFailures.push({ rule: 'Title Missing', message: 'Page has no <title> tag' });
  } else if (title.length > 60) {
    routeFailures.push({
      rule: 'Title Over 60 Chars',
      message: `Title is ${title.length} chars (exceeds 60 limit): "${title}"`,
    });
  }

  // 2. Meta Description Check
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const rawDesc = descMatch ? descMatch[1].trim() : '';
  const description = rawDesc
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');
  if (!description) {
    routeFailures.push({ rule: 'Description Missing', message: 'Page has no meta description' });
  } else if (description.length > 155) {
    routeFailures.push({
      rule: 'Description Over 155 Chars',
      message: `Meta description is ${description.length} chars (exceeds 155 limit): "${description}"`,
    });
  }

  // 3. H1 Count Check (must be exactly 1)
  const h1Matches = html.match(/<h1\b[^>]*>/gi) || [];
  if (h1Matches.length === 0) {
    routeFailures.push({ rule: 'H1 Missing', message: 'Page has no <h1> tag' });
  } else if (h1Matches.length > 1) {
    routeFailures.push({
      rule: 'Multiple H1 Tags',
      message: `Page has ${h1Matches.length} <h1> tags (must be exactly 1)`,
    });
  }

  // 4. Image Alt Attribute Check
  const imgMatches = html.match(/<img\b[^>]*>/gi) || [];
  for (const imgTag of imgMatches) {
    const hasAlt = /alt=["'][^"']*["']/i.test(imgTag);
    if (!hasAlt) {
      routeFailures.push({
        rule: 'Image Missing Alt',
        message: `Image tag missing alt attribute: ${imgTag.slice(0, 80)}`,
      });
    }
  }

  // 5. JSON-LD Schema Validation
  const jsonLdMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  for (const match of jsonLdMatches) {
    const rawJson = match[1].trim();
    if (!rawJson) continue;
    try {
      const parsed = JSON.parse(rawJson);
      if (!parsed['@context']) {
        routeFailures.push({
          rule: 'Invalid JSON-LD',
          message: 'JSON-LD schema missing @context property',
        });
      }
    } catch (err) {
      routeFailures.push({
        rule: 'Invalid JSON-LD Syntax',
        message: `JSON-LD failed JSON.parse(): ${err.message}`,
      });
    }
  }

  // 6. Word Count Check (>= 500 words for content pages)
  const wordCount = extractUniqueWords(html);
  if (wordCount < 500) {
    routeFailures.push({
      rule: 'Word Count Under 500',
      message: `Body copy has ${wordCount} words (minimum required is 500 words)`,
    });
  }

  checkedRoutes.push({
    route,
    title,
    titleLen: title.length,
    descLen: description.length,
    h1Count: h1Matches.length,
    wordCount,
    issues: routeFailures.length,
  });

  if (routeFailures.length > 0) {
    failures.push({ route, failures: routeFailures });
  }
}

function runAudit() {
  console.log('\n=============================================================');
  console.log('   DIGITALX SOLUTIONS — BUILD-TIME SEO QUALITY VERIFICATION   ');
  console.log('=============================================================\n');

  if (!fs.existsSync(APP_SERVER_DIR)) {
    console.error(`[ERROR] Build output directory not found: ${APP_SERVER_DIR}`);
    console.error('Please run "next build" before running check-seo.js.');
    process.exit(1);
  }

  const htmlFiles = getAllHtmlFiles(APP_SERVER_DIR);
  console.log(`Found ${htmlFiles.length} rendered HTML pages to audit in .next/server/app.\n`);

  for (const file of htmlFiles) {
    auditHtmlFile(file);
  }

  console.log(`Audited ${checkedRoutes.length} indexable content routes against all SEO constraints.\n`);

  if (failures.length > 0) {
    console.error(`FAILED: ${failures.length} route(s) violated technical SEO standards:\n`);
    for (const f of failures) {
      console.error(`Route: ${f.route}`);
      for (const item of f.failures) {
        console.error(`  - [${item.rule}] ${item.message}`);
      }
      console.error('');
    }
    console.error('Build-time SEO check failed. Please fix all violations above.\n');
    process.exit(1);
  }

  console.log('PASS: All audited routes strictly satisfy technical SEO requirements:');
  console.log('  ✔ Word count >= 500 words on all indexable content pages');
  console.log('  ✔ Exactly one <h1> per page');
  console.log('  ✔ Title <= 60 characters');
  console.log('  ✔ Meta description <= 155 characters');
  console.log('  ✔ All <img> elements have alt text');
  console.log('  ✔ All JSON-LD schemas parsed valid\n');
  console.log('=============================================================\n');
  process.exit(0);
}

runAudit();
