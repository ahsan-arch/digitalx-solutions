import os
import re
import json

base_dir = os.path.join('.next', 'server', 'app')
routes = []

def extract_types(obj):
    types = []
    if isinstance(obj, list):
        for item in obj:
            types.extend(extract_types(item))
    elif isinstance(obj, dict):
        t = obj.get('@type')
        if isinstance(t, list):
            types.extend([str(x) for x in t])
        elif isinstance(t, str):
            types.append(t)
        if '@graph' in obj:
            types.extend(extract_types(obj['@graph']))
    return types

def strip_tag(html, tag):
    start_tag = '<' + tag
    end_tag = '</' + tag + '>'
    while True:
        s = html.find(start_tag)
        if s == -1:
            break
        e = html.find(end_tag, s)
        if e == -1:
            html = html[:s]
            break
        html = html[:s] + ' ' + html[e + len(end_tag):]
    return html

for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith('.html') and not f.startswith('_'):
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, base_dir).replace('\\', '/')
            if rel_path == 'index.html':
                route = '/'
            else:
                route = '/' + rel_path[:-5]
            
            with open(full_path, 'r', encoding='utf-8') as fp:
                html = fp.read()
            
            # Title
            title_match = re.search(r'<title>(.*?)</title>', html, re.DOTALL)
            title = title_match.group(1).strip() if title_match else ''
            
            # Description
            desc_match = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', html, re.DOTALL)
            if not desc_match:
                desc_match = re.search(r'<meta[^>]*content=["\'](.*?)["\'][^>]*name=["\']description["\']', html, re.DOTALL)
            description = desc_match.group(1).strip() if desc_match else ''
            
            # H1
            raw_h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
            h1s = [re.sub(r'<[^>]+>', '', h).strip() for h in raw_h1s]
            
            # Schemas
            schema_blocks = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.DOTALL)
            schema_types = []
            for sb in schema_blocks:
                try:
                    data = json.loads(sb)
                    schema_types.extend(extract_types(data))
                except:
                    pass
            unique_schemas = sorted(list(set(schema_types)))
            
            # Body word count: exclude nav, header, footer, scripts, styles, svgs
            clean_html = html
            for tag in ['script', 'style', 'svg', 'header', 'nav', 'footer', 'noscript']:
                clean_html = strip_tag(clean_html, tag)
            clean_text = re.sub(r'<[^>]+>', ' ', clean_html)
            clean_text = re.sub(r'&[a-zA-Z0-9#]+;', ' ', clean_text)
            words = len(clean_text.split())
            
            routes.append({
                'route': route,
                'word_count': words,
                'title': title,
                'title_len': len(title),
                'description': description,
                'desc_len': len(description),
                'h1': h1s,
                'schemas': unique_schemas
            })

routes.sort(key=lambda x: x['route'])
print(f"Total routes audited: {len(routes)}")

# Generate docs/audit.md
md_lines = []
md_lines.append("# DigitalX Solutions — Comprehensive Route Audit")
md_lines.append(f"**Date**: October 2026 | **Total Audited Routes**: {len(routes)}\n")
md_lines.append("## Executive Summary\n")

under_500 = [r for r in routes if r['word_count'] < 500]
missing_h1 = [r for r in routes if len(r['h1']) == 0]
multi_h1 = [r for r in routes if len(r['h1']) > 1]
title_over_60 = [r for r in routes if r['title_len'] > 60]
desc_over_155 = [r for r in routes if r['desc_len'] > 155]
desc_under_120 = [r for r in routes if r['desc_len'] < 120]

md_lines.append(f"- **Total Routes**: {len(routes)}")
md_lines.append(f"- **Thin Content Risk (Under 500 words)**: {len(under_500)} routes (Specifically programmatic `/industries/*`, `/development/*`, and `/legal/*` routes)")
md_lines.append(f"- **Missing H1**: {len(missing_h1)} routes")
md_lines.append(f"- **Multiple H1s**: {len(multi_h1)} routes")
md_lines.append(f"- **Title > 60 Chars**: {len(title_over_60)} routes")
md_lines.append(f"- **Meta Description > 155 Chars**: {len(desc_over_155)} routes")
md_lines.append(f"- **Meta Description < 120 Chars**: {len(desc_under_120)} routes\n")

md_lines.append("## Complete Route Inventory\n")
md_lines.append("| Route | Word Count | Status | H1 | Title (Len) | Meta Description (Len) | Schema Types |")
md_lines.append("| :--- | :---: | :---: | :--- | :--- | :--- | :--- |")

for r in routes:
    status_flags = []
    if r['word_count'] < 500 and not r['route'].startswith('/legal'):
        status_flags.append(f"Thin ({r['word_count']}w)")
    if len(r['h1']) == 0:
        status_flags.append("Missing H1")
    elif len(r['h1']) > 1:
        status_flags.append(f"Multi-H1 ({len(r['h1'])})")
    if r['title_len'] > 60:
        status_flags.append(f"Title ({r['title_len']}ch)")
    if r['desc_len'] > 155:
        status_flags.append(f"Desc ({r['desc_len']}ch)")
    
    status_str = "<br>".join(status_flags) if status_flags else "Compliant"
    
    h1_text = r['h1'][0] if r['h1'] else "*None*"
    h1_safe = h1_text.replace("|", "\\|")
    title_safe = r['title'].replace("|", "\\|")
    desc_safe = r['description'].replace("|", "\\|")
    schema_str = ", ".join(r['schemas']) if r['schemas'] else "*None*"
    
    md_lines.append(f"| `{r['route']}` | {r['word_count']} | {status_str} | {h1_safe} | {title_safe} ({r['title_len']}) | {desc_safe} ({r['desc_len']}) | {schema_str} |")

os.makedirs('docs', exist_ok=True)
with open(os.path.join('docs', 'audit.md'), 'w', encoding='utf-8') as f:
    f.write("\n".join(md_lines))

print(f"Generated docs/audit.md successfully.")
