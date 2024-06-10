import { describe, it, expect } from 'vitest'
import { undefinedToNull } from './undefined-to-null'

describe('undefinedToNull', () => {
  it('should convert undefined to null', () => {
    expect(undefinedToNull(undefined)).toBe(null)
    expect(undefinedToNull({ a: undefined, b: 'hello-world' })).toEqual({
      a: null,
      b: 'hello-world',
    })
  })
  it('should not convert null to null', () => {
    expect(undefinedToNull(null)).toBe(null)
  })
})
