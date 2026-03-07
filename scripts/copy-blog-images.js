const fs = require('fs')
const path = require('path')

const SOURCE_DIR = path.join(__dirname, '../content/managed-life/blog')
const DEST_DIR = path.join(__dirname, '../public/blog')
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif'])

if (!fs.existsSync(SOURCE_DIR)) {
  console.warn('Warning: content/managed-life/blog not found. Skipping image copy (submodule not initialized?).')
  process.exit(0)
}

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true })
}

const blogDirs = fs.readdirSync(SOURCE_DIR, { withFileTypes: true }).filter((entry) => entry.isDirectory())

let copied = 0

for (const dir of blogDirs) {
  const blogId = dir.name
  const srcDir = path.join(SOURCE_DIR, blogId)
  const destDir = path.join(DEST_DIR, blogId)

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  for (const file of fs.readdirSync(srcDir)) {
    const ext = path.extname(file).toLowerCase()
    if (!IMAGE_EXTENSIONS.has(ext)) continue
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file))
    copied++
  }
}

console.warn(`Copied ${copied} blog image(s) to public/blog/`)
