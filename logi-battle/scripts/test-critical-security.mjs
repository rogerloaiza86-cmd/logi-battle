import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(scriptDir, '..', '..')
const appRoot = resolve(repoRoot, 'logi-battle')

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

assert(!existsSync(resolve(repoRoot, '.env')), 'Root .env must not be committed')
assert(!existsSync(resolve(appRoot, '.env')), 'App .env must not be committed')

const rootGitignore = readFileSync(resolve(repoRoot, '.gitignore'), 'utf8')
const appGitignore = readFileSync(resolve(appRoot, '.gitignore'), 'utf8')
assert(rootGitignore.includes('!.env.example'), 'Root .gitignore must keep .env.example trackable')
assert(appGitignore.includes('.env'), 'App .gitignore must ignore .env')
assert(appGitignore.includes('!.env.example'), 'App .gitignore must keep .env.example trackable')

const schema = readFileSync(resolve(appRoot, 'supabase_schema.sql'), 'utf8')
assert(!/FOR\s+ALL/i.test(schema), 'Supabase schema must not grant FOR ALL policies')
assert(!/ON\s+public\.questions\s+FOR\s+(SELECT|ALL|UPDATE|DELETE|INSERT)/i.test(schema), 'Questions table must not expose public policies')
assert(!/ON\s+public\.games\s+FOR\s+(UPDATE|DELETE|ALL)/i.test(schema), 'Games table must not expose anonymous UPDATE/DELETE')

const gameBoard = readFileSync(resolve(appRoot, 'src/components/GameBoard.jsx'), 'utf8')
assert(gameBoard.includes('sanitizeQuestionForPlayer'), 'Host must sanitize questions before broadcast')
assert(!/questionData:\s*newQuestion/.test(gameBoard), 'Broadcast payload must not include full question objects')
assert(!/payload\.isCorrect/.test(gameBoard), 'Host must not trust client-side correctness')

const playerGame = readFileSync(resolve(appRoot, 'src/components/PlayerGame.jsx'), 'utf8')
assert(!/payload\.questionData\.correctAnswer/.test(playerGame), 'Player must not read correctAnswer from new_question payload')
assert(/payload:\s*\{\s*team,\s*userAnswer/.test(playerGame), 'Player must send raw userAnswer to host')

console.log('Critical security regression checks passed.')
