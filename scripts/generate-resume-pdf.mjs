import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const sourcePath = resolve(rootDir, 'public/resume.html')
const outputPath = resolve(rootDir, 'public/resume.pdf')

if (!existsSync(sourcePath)) {
  throw new Error(`Resume source not found: ${sourcePath}`)
}

await mkdir(dirname(outputPath), { recursive: true })

const browser = await chromium.launch({ headless: true })

try {
  const page = await browser.newPage()
  await page.goto(pathToFileURL(sourcePath).href, { waitUntil: 'networkidle' })
  await page.emulateMedia({ media: 'print' })
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  })
  console.log(`Generated ${outputPath}`)
} finally {
  await browser.close()
}
