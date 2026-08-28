import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  CHAMPIONSHIP_STORAGE_KEY,
  LEGACY_CHAMPIONSHIP_STORAGE_KEY,
  parseChampionshipPersisted,
  championshipDateMs,
  collectChampionshipMatches,
  championshipKeysToClear,
} from './championshipStorage.js'

const persistedMatch = {
  id: 'match_1',
  challengerId: 'group_a',
  championId: 'group_b',
  winner: 'challenger',
  date: '2026-08-21T10:00:00.000Z',
  score: { teamA: 6, teamB: 4 },
}

const persistedState = {
  state: {
    classes: [
      {
        id: 'class_1',
        name: 'BTS Logistique',
        groups: [
          { id: 'group_a', name: 'Étoile' },
          { id: 'group_b', name: 'Boussole' },
        ],
        matches: [persistedMatch],
      },
    ],
    currentClass: 'class_1',
  },
  version: 1,
}

describe('parseChampionshipPersisted', () => {
  it('lit le format Zustand persist (state + version)', () => {
    const parsed = parseChampionshipPersisted(JSON.stringify(persistedState))
    assert.equal(parsed.classes.length, 1)
    assert.equal(parsed.classes[0].name, 'BTS Logistique')
    assert.equal(parsed.currentClass, 'class_1')
  })

  it('accepte un objet classes à la racine (format legacy)', () => {
    const parsed = parseChampionshipPersisted(
      JSON.stringify({ classes: [{ id: 'c', name: 'Legacy', matches: [] }] })
    )
    assert.equal(parsed.classes[0].name, 'Legacy')
  })

  it('ne plante pas sur JSON invalide ou vide', () => {
    assert.deepEqual(parseChampionshipPersisted(null).classes, [])
    assert.deepEqual(parseChampionshipPersisted('').classes, [])
    assert.deepEqual(parseChampionshipPersisted('{not-json').classes, [])
  })
})

describe('collectChampionshipMatches', () => {
  it('associe les noms et trie du plus récent au plus ancien', () => {
    const championship = parseChampionshipPersisted(JSON.stringify(persistedState))
    championship.classes[0].matches.push({
      ...persistedMatch,
      id: 'match_2',
      date: '2026-08-27T11:00:00.000Z',
      winner: 'champion',
    })

    const matches = collectChampionshipMatches(championship)
    assert.equal(matches.length, 2)
    assert.equal(matches[0].id, 'match_2')
    assert.equal(matches[0].challengerName, 'Étoile')
    assert.equal(matches[1].championName, 'Boussole')
  })
})

describe('championshipDateMs', () => {
  it('parse les ISO strings (b.date - a.date serait NaN)', () => {
    const newer = championshipDateMs('2026-08-27T11:00:00.000Z')
    const older = championshipDateMs('2026-08-21T10:00:00.000Z')
    assert.equal(newer > older, true)
    assert.equal(Number.isNaN(newer - older), false)
  })
})

describe('championshipKeysToClear', () => {
  it('inclut la clé Zustand réelle, pas seulement la clé legacy', () => {
    const keys = championshipKeysToClear()
    assert.equal(keys.includes(CHAMPIONSHIP_STORAGE_KEY), true)
    assert.equal(keys.includes(LEGACY_CHAMPIONSHIP_STORAGE_KEY), true)
    assert.equal(CHAMPIONSHIP_STORAGE_KEY, 'championship-storage')
  })
})
