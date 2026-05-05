import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

assert.ok(existsSync(new URL('./generate-resume-pdf.mjs', import.meta.url)), 'scripts/generate-resume-pdf.mjs should exist')
assert.equal(packageJson.scripts['generate:resume'], 'node scripts/generate-resume-pdf.mjs')
assert.ok(packageJson.scripts.build.startsWith('npm run generate:resume && '), 'build should regenerate resume before Vite build')

console.log('resume build config ok')
