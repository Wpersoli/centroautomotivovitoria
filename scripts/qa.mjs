import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const privacy = readFileSync(new URL('../privacidade.html', import.meta.url), 'utf8');
const notFound = readFileSync(new URL('../404.html', import.meta.url), 'utf8');
const favicon = readFileSync(new URL('../favicon.svg', import.meta.url), 'utf8');
const robots = readFileSync(new URL('../robots.txt', import.meta.url), 'utf8');
const sitemap = readFileSync(new URL('../sitemap.xml', import.meta.url), 'utf8');

const ids = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(match => match[1]);
const idCounts = new Map();
for (const id of ids) idCounts.set(id, (idCounts.get(id) || 0) + 1);
const duplicateIds = [...idCounts].filter(([, count]) => count > 1).map(([id]) => id);
assert.deepEqual(duplicateIds, [], `Duplicate HTML IDs: ${duplicateIds.join(', ')}`);

const idSet = new Set(ids);
const anchors = [...html.matchAll(/\bhref\s*=\s*["']#([^"']+)["']/gi)].map(match => match[1]).filter(Boolean);
const missingAnchors = [...new Set(anchors.filter(anchor => !idSet.has(anchor)))];
assert.deepEqual(missingAnchors, [], `Broken in-page links: ${missingAnchors.join(', ')}`);

const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(match => !/\btype\s*=\s*["']application\/ld\+json["']/i.test(match[1]))
  .map(match => match[2])
  .filter(script => script.trim());
assert.ok(scripts.length > 0, 'Expected inline JavaScript');
scripts.forEach((source, index) => new vm.Script(source, { filename: `inline-script-${index + 1}.js` }));

const externalNewTabLinks = [...html.matchAll(/<a\b[^>]*target\s*=\s*["']_blank["'][^>]*>/gi)].map(match => match[0]);
const unsafeNewTabLinks = externalNewTabLinks.filter(tag => !/\brel\s*=\s*["'][^"']*(?:noopener|noreferrer)[^"']*["']/i.test(tag));
assert.deepEqual(unsafeNewTabLinks, [], 'Every new-tab link must include rel=noopener or rel=noreferrer');

for (const required of ['lang="pt-BR"', 'name="description"', 'name="robots"', 'rel="canonical"', 'property="og:title"', 'id="quoteForm"', 'id="routeButton"', 'id="chatLauncher"', 'id="shareSite"']) {
  assert.ok(html.includes(required), `Missing required homepage feature/metadata: ${required}`);
}
assert.ok(html.includes('prefers-reduced-motion'), 'Motion preferences should be respected');
assert.ok(html.includes('aria-live'), 'Dynamic status should be accessible');

const labels = new Set([...html.matchAll(/<label\b[^>]*for\s*=\s*["']([^"']+)["'][^>]*>/gi)].map(match => match[1]));
const fields = [...html.matchAll(/<(input|select|textarea)\b[^>]*>/gi)].map(match => match[0]);
const unlabeledFields = fields.filter(tag => {
  const id = tag.match(/\bid\s*=\s*["']([^"']+)["']/i)?.[1];
  return id && !labels.has(id) && !/\baria-label\s*=/.test(tag);
});
assert.deepEqual(unlabeledFields, [], 'Every form field with an ID must have a matching label or aria-label');

const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
const imagesWithoutAlt = images.filter(tag => !/\balt\s*=/.test(tag));
assert.deepEqual(imagesWithoutAlt, [], 'Every image must have an alt attribute');

const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)];
const unnamedButtons = buttons.filter(match => {
  const accessibleText = match[2].replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').trim();
  return !accessibleText && !/\baria-label\s*=/.test(match[1]);
});
assert.deepEqual(unnamedButtons, [], 'Every button must have visible text or aria-label');
assert.ok(privacy.includes('privacidade') || privacy.includes('Privacidade'), 'Privacy page should have a privacy heading');
assert.ok(notFound.includes('href="/"') && notFound.includes('wa.me/5511995543736'), '404 page should offer home and WhatsApp recovery links');
assert.ok(favicon.includes('<svg') && favicon.includes('</svg>'), 'SVG favicon should be valid at a basic structural level');
assert.ok(robots.includes('Allow: /'), 'Crawler policy should be explicit');
assert.ok(sitemap.includes('<urlset') && sitemap.includes('</urlset>'), 'Sitemap should be well-formed at a basic structural level');
assert.ok(/name="robots" content="noindex,nofollow,noarchive"/.test(html), 'Pre-sale demo should remain excluded from indexing');
assert.ok(!/newsletter|subscribe/i.test(html), 'Do not present unconfigured newsletter signup as working');

console.log('Static QA passed: unique IDs, in-page links, JavaScript syntax, new-tab link safety, essential metadata, accessibility hooks, privacy, 404, favicon, robots and sitemap.');
