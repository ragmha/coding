import { describe, expect, test } from 'vitest'
import { pipe } from './composition'

describe('Composition', () => {
  test('should generate new functions', () => {
    const times = (y: number) => (x: number) => x * y
    const plus = (y: number) => (x: number) => x + y
    const subtract = (y: number) => (x: number) => x - y
    const divide = (y: number) => (x: number) => x / y

    expect(pipe([])(1)).toBe(1)
    expect(pipe([times(2)])(1)).toBe(2)
    expect(pipe([times(2), times(3)])(2)).toBe(12)
    expect(pipe([times(2), times(3), plus(4)])(2)).toBe(16)
    expect(pipe([times(2), subtract(3), divide(4)])(2)).toBe(0.25)
  })
})
