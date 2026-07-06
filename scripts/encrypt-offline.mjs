/**
 * Protege con contraseña el HTML offline autocontenido.
 *
 * Toma el archivo generado por `npm run build:offline` (dist/index.html) y
 * produce `dist/Visados-La-Rioja.html`: un HTML que NO contiene la app en claro,
 * solo un bloque cifrado con AES-256-GCM (clave derivada de la contraseña con
 * PBKDF2-SHA256). Al abrirlo, pide la contraseña y descifra la app en el propio
 * navegador. Sin la contraseña correcta no hay contenido legible ni en «Ver
 * código fuente». Funciona 100 % offline desde file://.
 *
 * Uso:  node scripts/encrypt-offline.mjs "<contraseña>" [entrada] [salida]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const password = process.argv[2];
if (!password) {
  console.error('Falta la contraseña.\n  Uso: node scripts/encrypt-offline.mjs "<contraseña>" [entrada] [salida]');
  process.exit(1);
}
const inFile = resolve(root, process.argv[3] || 'dist/index.html');
const outFile = resolve(root, process.argv[4] || 'dist/Visados-La-Rioja.html');

const ITERATIONS = 250000;
let plaintext = readFileSync(inFile, 'utf8');

// El bundle de la app se inlinea como <script type="module"> (diferido) en el
// <head>. Al descifrar reinyectamos el HTML con document.write(), y los scripts
// de módulo no se re-ejecutan de forma fiable en ese flujo. El build offline ya
// emite un IIFE (sin import/export), así que lo convertimos en script clásico y
// lo movemos al final de <body> para que se ejecute cuando #root ya existe.
{
  const m = plaintext.match(/<script\s+type="module"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) {
    console.error('No se encontró el <script type="module"> del bundle. ¿Se ejecutó `npm run build:offline`?');
    process.exit(1);
  }
  const bundle = m[1];
  plaintext = plaintext.replace(m[0], '');
  plaintext = plaintext.replace('</body>', `    <script>${bundle}</script>\n  </body>`);
}

const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const enc = new TextEncoder();

const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
  keyMaterial,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt']
);
const cipherBuf = new Uint8Array(
  await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext))
);

const b64 = (bytes) => Buffer.from(bytes).toString('base64');

const page = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Visados La Rioja · Acceso protegido</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%238a2b3d'/%3E%3Cpath d='M16 6l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V9z' fill='none' stroke='%23fff' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E" />
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    display: grid; place-items: center; padding: 24px;
    background: #f4f1ee; color: #1c1917;
  }
  @media (prefers-color-scheme: dark) { body { background: #17140f; color: #f2ede6; } }
  .box {
    width: 100%; max-width: 380px; text-align: center;
    background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 16px;
    padding: 32px 28px; box-shadow: 0 18px 48px rgba(0,0,0,.12);
  }
  @media (prefers-color-scheme: dark) { .box { background: #221d16; border-color: rgba(255,255,255,.09); } }
  .shield { width: 46px; height: 46px; margin: 0 auto 14px; display: block; color: #8a2b3d; }
  @media (prefers-color-scheme: dark) { .shield { color: #d98b9b; } }
  h1 { font-size: 18px; margin: 0 0 4px; }
  p.sub { margin: 0 0 20px; font-size: 13px; opacity: .7; }
  form { display: flex; flex-direction: column; gap: 10px; }
  input {
    width: 100%; padding: 12px 14px; font-size: 15px; border-radius: 10px;
    border: 1px solid rgba(0,0,0,.18); background: #fbfaf9; color: inherit;
  }
  @media (prefers-color-scheme: dark) { input { background: #1a1611; border-color: rgba(255,255,255,.15); } }
  input:focus { outline: 2px solid #8a2b3d; outline-offset: 1px; border-color: transparent; }
  button {
    padding: 12px 14px; font-size: 15px; font-weight: 600; cursor: pointer;
    border: none; border-radius: 10px; background: #8a2b3d; color: #fff;
  }
  button:hover { background: #74212f; }
  button:disabled { opacity: .6; cursor: progress; }
  .err { min-height: 18px; font-size: 13px; color: #c0392b; margin: 2px 0 0; }
  @media (prefers-color-scheme: dark) { .err { color: #ff8a80; } }
</style>
</head>
<body>
  <div class="box">
    <svg class="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
      <path d="M12 3l7 2.5V11c0 4.5-3 7.6-7 9.5-4-1.9-7-5-7-9.5V5.5z" />
      <path d="M9.5 12.2l1.8 1.8 3.4-3.6" stroke-linecap="round" />
    </svg>
    <h1>Visados La Rioja</h1>
    <p class="sub">Introduce la contraseña para acceder.</p>
    <form id="f">
      <input id="pw" type="password" autocomplete="current-password" autofocus placeholder="Contraseña" />
      <button id="b" type="submit">Acceder</button>
      <p class="err" id="e"></p>
    </form>
  </div>
<script>
(function () {
  var SALT = "${b64(salt)}", IV = "${b64(iv)}", DATA = "${b64(cipherBuf)}", ITER = ${ITERATIONS};
  function b2a(b64) { var s = atob(b64), a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i); return a; }
  var f = document.getElementById('f'), pw = document.getElementById('pw'), btn = document.getElementById('b'), err = document.getElementById('e');
  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    err.textContent = ''; btn.disabled = true;
    (async function () {
      try {
        var enc = new TextEncoder();
        var km = await crypto.subtle.importKey('raw', enc.encode(pw.value), 'PBKDF2', false, ['deriveKey']);
        var key = await crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt: b2a(SALT), iterations: ITER, hash: 'SHA-256' },
          km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
        var buf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b2a(IV) }, key, b2a(DATA));
        var html = new TextDecoder().decode(buf);
        document.open(); document.write(html); document.close();
      } catch (e) {
        btn.disabled = false;
        err.textContent = 'Contraseña incorrecta.';
        pw.select();
      }
    })();
  });
})();
</script>
</body>
</html>
`;

writeFileSync(outFile, page, 'utf8');
const kb = (Buffer.byteLength(page) / 1024).toFixed(0);
console.log('Archivo protegido escrito en:', outFile, '(' + kb + ' KB)');
