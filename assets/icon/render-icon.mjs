import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const DIR = '/home/user/Visados/scratchpad';
const svg = readFileSync(`${DIR}/icon.svg`, 'utf8');
const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });

const sizes = [1024, 512, 256, 128, 64, 32, 16];
for (const s of sizes) {
  const ctx = await browser.newContext({ viewport: { width: s, height: s }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const html = `<!doctype html><meta charset=utf8><style>*{margin:0;padding:0}html,body{width:${s}px;height:${s}px;overflow:hidden}svg{display:block;width:${s}px;height:${s}px}</style>${svg}`;
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${DIR}/icon-${s}.png`, omitBackground: true, clip: { x: 0, y: 0, width: s, height: s } });
  await ctx.close();
  console.log('render', s);
}

// Hoja de presentación: icono grande + tamaños pequeños, en claro y oscuro
const sheet = `<!doctype html><meta charset=utf8>
<style>
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
  .wrap{display:grid;grid-template-columns:1fr 1fr}
  .pane{padding:56px 48px;display:flex;flex-direction:column;align-items:center;gap:30px}
  .light{background:#f5f3f1;color:#241f22}
  .dark{background:#171416;color:#f1ebe9}
  .big{width:220px;height:220px;border-radius:0}
  .big img{width:100%;height:100%;display:block;filter:drop-shadow(0 14px 30px rgba(58,15,24,.35))}
  .row{display:flex;align-items:flex-end;gap:22px}
  .chip{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:12px;opacity:.75}
  .chip img{image-rendering:auto}
  h3{margin:0;font-size:13px;letter-spacing:.06em;text-transform:uppercase;opacity:.6;font-weight:700}
</style>
<div class="wrap">
  <div class="pane light">
    <h3>Claro</h3>
    <div class="big"><img src="icon-1024.png"></div>
    <div class="row">
      <div class="chip"><img src="icon-128.png" width="128" height="128">128</div>
      <div class="chip"><img src="icon-64.png" width="64" height="64">64</div>
      <div class="chip"><img src="icon-32.png" width="32" height="32">32</div>
      <div class="chip"><img src="icon-16.png" width="16" height="16">16</div>
    </div>
  </div>
  <div class="pane dark">
    <h3>Oscuro</h3>
    <div class="big"><img src="icon-1024.png"></div>
    <div class="row">
      <div class="chip"><img src="icon-128.png" width="128" height="128">128</div>
      <div class="chip"><img src="icon-64.png" width="64" height="64">64</div>
      <div class="chip"><img src="icon-32.png" width="32" height="32">32</div>
      <div class="chip"><img src="icon-16.png" width="16" height="16">16</div>
    </div>
  </div>
</div>`;
{
  const ctx = await browser.newContext({ viewport: { width: 1120, height: 520 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`file://${DIR}/sheet.html`).catch(() => {});
  const { writeFileSync } = await import('node:fs');
  writeFileSync(`${DIR}/sheet.html`, sheet);
  await page.goto(`file://${DIR}/sheet.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${DIR}/icon-sheet.png` });
  await ctx.close();
  console.log('sheet done');
}

await browser.close();
