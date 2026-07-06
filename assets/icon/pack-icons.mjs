import { readFileSync, writeFileSync } from 'node:fs';
const DIR = '/home/user/Visados/scratchpad';
const png = (s) => readFileSync(`${DIR}/icon-${s}.png`);

// ---------- .ico (Windows) : PNG embebido, multi-tamaño ----------
{
  const sizes = [16, 32, 64, 128, 256];
  const imgs = sizes.map((s) => ({ s, buf: png(s) }));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(imgs.length, 4);
  const dir = Buffer.alloc(16 * imgs.length);
  let offset = 6 + 16 * imgs.length;
  imgs.forEach((im, i) => {
    const o = i * 16;
    dir.writeUInt8(im.s >= 256 ? 0 : im.s, o);       // width (0 = 256)
    dir.writeUInt8(im.s >= 256 ? 0 : im.s, o + 1);   // height
    dir.writeUInt8(0, o + 2); dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4); dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(im.buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += im.buf.length;
  });
  writeFileSync(`${DIR}/Visados-icono.ico`, Buffer.concat([header, dir, ...imgs.map((i) => i.buf)]));
  console.log('ico ok');
}

// ---------- .icns (macOS) : chunks PNG ic07..ic10 ----------
{
  const chunks = [
    ['ic07', png(128)],  // 128x128
    ['ic08', png(256)],  // 256x256
    ['ic09', png(512)],  // 512x512
    ['ic10', png(1024)], // 1024x1024 (512@2x)
    ['ic11', png(32)],   // 16@2x
    ['ic12', png(64)],   // 32@2x
    ['ic13', png(256)],  // 128@2x
    ['ic14', png(512)],  // 256@2x
  ];
  const parts = chunks.map(([type, buf]) => {
    const head = Buffer.alloc(8);
    head.write(type, 0, 'ascii');
    head.writeUInt32BE(buf.length + 8, 4);
    return Buffer.concat([head, buf]);
  });
  const body = Buffer.concat(parts);
  const file = Buffer.alloc(8);
  file.write('icns', 0, 'ascii');
  file.writeUInt32BE(body.length + 8, 4);
  writeFileSync(`${DIR}/Visados-icono.icns`, Buffer.concat([file, body]));
  console.log('icns ok');
}
