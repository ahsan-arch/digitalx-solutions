const fs = require('fs');
const targets = JSON.parse(fs.readFileSync('data/new-targets.json', 'utf8'));
const header = 'name,email,company,industry,city,country,website\n';
const rows = targets.map(t => [
  t.name,
  t.email,
  t.company,
  t.industry,
  t.city,
  t.country,
  t.website
].map(val => (val.includes(',') ? `"${val}"` : val)).join(','));

fs.writeFileSync('data/curated-targets.csv', header + rows.join('\n') + '\n', 'utf8');
console.log('Successfully wrote', targets.length, 'records to data/curated-targets.csv');

