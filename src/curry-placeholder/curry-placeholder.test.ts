import { describe, test, expect } from 'vitest'
import { curry } from './curry-placeholder'

describe('Curry Placeholder', () => {
  test('should curry with placeholder', () => {
    const join = (a: number, b: number, c: number) => {
      return `${a}_${b}_${c}`
    }

    expect(curry(join)(1)(2)(3)).toBe('1_2_3')
    expect(curry(join)(1, 2)(3)).toBe('1_2_3')
    expect(curry(join)(1, 2, 3, 4)).toBe('1_2_3')

    const curried1 = curry(join)(1, 2)
    expect(curried1(3)).toBe('1_2_3')
    expect(curried1(4)).toBe('1_2_4')
  })

  test('should have a placeholder', () => {
    expect(curry.placeholder).toBeDefined()
  })

  test('should curry with placeholder _', () => {
    const join = (a: number, b: number, c: number) => {
      return `${a}_${b}_${c}`
    }

    const curriedJoin = curry(join)
    const _: symbol = curry.placeholder

    expect(curriedJoin(_, _, 3, 4)(1, _)(2, 5)).toBe('1_2_3')

    expect(curriedJoin(_, _, _, _)(_, 2, _)(_, 3)(1)).toBe('1_2_3')
  })
})
