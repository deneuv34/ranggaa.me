import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const vercelJson = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))

assert.ok(existsSync(new URL('./generate-resume-pdf.mjs', import.meta.url)), 'scripts/generate-resume-pdf.mjs should exist')
assert.equal(packageJson.scripts['generate:resume'], 'node scripts/generate-resume-pdf.mjs')
assert.equal(packageJson.scripts['prepare:playwright'], 'playwright install chromium')
assert.equal(packageJson.scripts['vercel-build'], 'npm run prepare:playwright && npm run build')
assert.ok(packageJson.scripts.build.startsWith('npm run generate:resume && '), 'build should regenerate resume before Vite build')
assert.equal(vercelJson.buildCommand, 'npm run vercel-build')

console.log('resume build config ok')
