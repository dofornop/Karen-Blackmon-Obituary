import fs from "node:fs";
import path from "node:path";

const GALLERY_DIR = path.join(process.cwd(), "public/images/gallery");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function captionFromFilename(filename) {
  return path
    .parse(filename)
    .name.replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getPhotos() {
  let files;
  try {
    files = fs.readdirSync(GALLERY_DIR);
  } catch {
    return [];
  }

  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      src: `/images/gallery/${file}`,
      caption: captionFromFilename(file),
    }));
}
