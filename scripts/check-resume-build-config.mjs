import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const vercelJson = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))

assert.ok(existsSync(new URL('./generate-resume-pdf.mjs', import.meta.url)), 'scripts/generate-resume-pdf.mjs should exist')
assert.equal(packageJson.scripts['generate:resume'], 'node scripts/generate-resume-pdf.mjs')
assert.equal(packageJson.scripts.build, 'vue-tsc -b && vite build')
assert.equal(vercelJson.buildCommand, 'npm run build')
assert.ok(existsSync(new URL('../public/resume.pdf', import.meta.url)), 'public/resume.pdf must exist (generate locally before push)')

console.log('resume build config ok')
