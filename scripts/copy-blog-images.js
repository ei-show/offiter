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

const files = fs.readdirSync(SOURCE_DIR)
let copied = 0

for (const file of files) {
  const ext = path.extname(file).toLowerCase()
  if (!IMAGE_EXTENSIONS.has(ext)) continue
  const src = path.join(SOURCE_DIR, file)
  const dest = path.join(DEST_DIR, file)
  fs.copyFileSync(src, dest)
  copied++
}

console.warn(`Copied ${copied} blog image(s) to public/blog/`)
