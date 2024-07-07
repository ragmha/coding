import { test, describe, expect } from 'vitest'
import { flat } from './array-proto-flat'

describe('Array flat', () => {
  test('it should flatten the array', () => {
    expect(flat([1, [2], [3, [4]]])).toEqual([1, 2, 3, [4]])
    expect(flat([1, [2], [3, [4]]], 1)).toEqual([1, 2, 3, [4]])
    expect(flat([1, [2], [3, [4]]], 2)).toEqual([1, 2, 3, 4])
    expect(flat([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]], Infinity)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ])
  })

  test('it should handle empty arrays', () => {
    expect(flat([])).toEqual([])
  })
})
