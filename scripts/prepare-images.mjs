// Genera las fotos del sitio a partir de ~/Documents/Jeremy_IMG sin modificar los originales.
// Uso: npm run images  (macOS: usa `sips` para leer HEIC y `sharp` para recortar).
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const SOURCE = join(homedir(), "Documents", "Jeremy_IMG");
const OUT = join(process.cwd(), "src", "images", "photos");
const tmp = mkdtempSync(join(tmpdir(), "jc-photos-"));
mkdirSync(OUT, { recursive: true });

// left/top/width/height en píxeles de la imagen ya orientada (EXIF aplicado con rotate()).
const CROPS = [
  { src: "6B0B37FC-08FE-4B1F-83AC-F11BD04A343A.heic", out: "downtown.jpg", box: [0, 126, 3024, 3780] },
  { src: "19445B8C-8BA7-4840-AE46-EE9FA79CEA8F.heic", out: "walk.jpg", box: [500, 1900, 2560, 3200] },
  { src: "AFF247F4-881D-4C3B-AAC1-81DAF5B79D72.heic", out: "street.jpg", box: [0, 126, 3024, 3780] },
  { src: "B3D5FBE6-108D-4804-878F-B1E9C336F438.heic", out: "drive.jpg", box: [0, 252, 3024, 3780] },
  { src: "IMG_2736.heic", out: "sunset.jpg", box: [0, 252, 3024, 3780] },
  { src: "19445B8C-8BA7-4840-AE46-EE9FA79CEA8F.heic", out: "me.jpg", box: [760, 2250, 2080, 2600] },
  // Foto principal del círculo (IMG_2322): cara centrada con hombros, como el avatar de la referencia.
  { src: "IMG_2322.heic", out: "avatar.jpg", box: [1108, 1285, 1232, 1232] },
];

for (const { src, out, box } of CROPS) {
  const jpeg = join(tmp, src.replace(/\.heic$/i, ".jpg"));
  execFileSync("sips", ["-s", "format", "jpeg", join(SOURCE, src), "--out", jpeg], { stdio: "ignore" });
  const [left, top, width, height] = box;
  // Sin ampliar: los recortes de origen miden más de 2000 px de ancho.
  const target = out === "avatar.jpg" ? 512 : 2000;
  await sharp(jpeg)
    .rotate()
    .extract({ left, top, width, height })
    .resize({ width: target })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(join(OUT, out));
  console.error(`ok ${out}`);
}
