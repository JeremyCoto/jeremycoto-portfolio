// Favicon desde ~/Documents/Jeremy_IMG/IMG_2322.heic (original intacto): cara centrada en círculo.
// Genera src/app/favicon.ico (16/32/48), src/app/icon.png (512) y src/app/apple-icon.png (180, cuadrado).
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const SOURCE = join(homedir(), "Documents", "Jeremy_IMG", "IMG_2322.heic");
const APP = join(process.cwd(), "src", "app");
// Recorte más cerrado que el avatar: a 16–32 px la cara debe ocupar casi todo el círculo.
const FACE_BOX = { left: 1188, top: 1340, width: 1040, height: 1040 };

const jpeg = join(mkdtempSync(join(tmpdir(), "jc-favicon-")), "face.jpg");
execFileSync("sips", ["-s", "format", "jpeg", SOURCE, "--out", jpeg], { stdio: "ignore" });
const face = await sharp(jpeg).rotate().extract(FACE_BOX).toBuffer();

async function round(size) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`,
  );
  return sharp(face)
    .resize(size, size)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

// ICO con PNG incrustados (formato admitido por todos los navegadores actuales).
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

const sizes = [16, 32, 48];
writeFileSync(
  join(APP, "favicon.ico"),
  ico(await Promise.all(sizes.map(async (size) => ({ size, data: await round(size) })))),
);
writeFileSync(join(APP, "icon.png"), await round(512));
await sharp(face).resize(180, 180).png().toFile(join(APP, "apple-icon.png"));
console.error("ok favicon.ico, icon.png, apple-icon.png");
