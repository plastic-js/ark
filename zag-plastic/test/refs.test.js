import assert from 'node:assert/strict'
import { test } from './_register.js'
import { createRefs } from '../refs.js'

test('get() returns the ref object stored for a key', () => {
    const menuRef = { current: null }
    const refs = createRefs({ menuRef })
    assert.equal(refs.get('menuRef'), menuRef)
})

test('set() updates the value stored for a key', () => {
    const refs = createRefs({ menuRef: { current: null } })
    const next = { current: 'el' }
    refs.set('menuRef', next)
    assert.equal(refs.get('menuRef'), next)
})

test('get() on an unknown key returns undefined', () => {
    const refs = createRefs({ menuRef: { current: null } })
    assert.equal(refs.get('nope'), undefined)
})

test('mutating a returned ref object reflects on subsequent get()', () => {
    const refs = createRefs({ menuRef: { current: null } })
    refs.get('menuRef').current = 'el'
    assert.equal(refs.get('menuRef').current, 'el')
})
