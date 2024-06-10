import { describe, it, expect } from 'vitest'
import { curry } from './curry'

const add = (a: number, b: number) => a + b

const concat = (a: string, b: string, c: string) => a + b + c

const multiply = (a: number, b: number, c: number) => a * b * c

describe('Curry', () => {
  it('correct curries a function that adds two numbers', () => {
    const curriedAdd = curry(add)
    expect(curriedAdd(1)(2)).toBe(3)
  })

  it('correct curries a function that concatenates three strings', () => {
    const curriedConcat = curry(concat)
    expect(curriedConcat('Hello, ')('world')('!')).toBe('Hello, world!')
  })

  it('supports partial application for a function that multiplies three numbers', () => {
    const curriedMultiply = curry(multiply)
    const partialAppliedMultiplyByTwo = curriedMultiply(2)
    expect(partialAppliedMultiplyByTwo(3)(4)).toBe(24)
  })

  it('returns a function when not all arguments are provided', () => {
    const curriedAdd = curry(add)
    expect(typeof curriedAdd(1)).toBe('function')
  })
})
