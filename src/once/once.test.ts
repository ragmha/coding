import { describe, it, expect, vi } from 'vitest'
import { once } from './once'

describe('once', () => {
    it('should call the function only once and cache the result', () => {
        const add = (a: number, b: number) => a + b
        const addOnce = once(add)

        expect(addOnce(1, 2)).toBe(3)
        expect(addOnce(1, 2)).toBe(3)
        expect(addOnce(1, 2)).toBe(3)
    })

    it('should work with functions that take no arguments', () => {
        const getRandom = () => Math.random()
        const getRandomOnce = once(getRandom)
        
        const firstResult = getRandomOnce()
        expect(getRandomOnce()).toBe(firstResult)
        expect(getRandomOnce()).toBe(firstResult)
    })

    it('should work with functions that return void', () => {
        const mockFn = vi.fn()
        const mockFnOnce = once(mockFn)
        
        mockFnOnce()
        mockFnOnce()
        mockFnOnce()
        
        expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should work with functions that return objects', () => {
        const createObj = () => ({ id: 1, name: 'test' })
        const createObjOnce = once(createObj)
        
        const firstResult = createObjOnce()
        const secondResult = createObjOnce()
        
        expect(secondResult).toBe(firstResult)
        expect(secondResult).toEqual({ id: 1, name: 'test' })
    })

    it('should work with async functions', async () => {
        const asyncAdd = async (a: number, b: number) => a + b
        const asyncAddOnce = once(asyncAdd)
        
        const result1 = await asyncAddOnce(1, 2)
        const result2 = await asyncAddOnce(1, 2)
        
        expect(result1).toBe(3)
        expect(result2).toBe(3)
    })

    it('should preserve this context', () => {
        class Counter {
            private count = 0
            increment() {
                return ++this.count
            }
        }
        
        const counter = new Counter()
        const incrementOnce = once(counter.increment.bind(counter))
        
        expect(incrementOnce()).toBe(1)
        expect(incrementOnce()).toBe(1)
    })

    it('should handle functions with rest parameters', () => {
        const sum = (...numbers: number[]) => numbers.reduce((a, b) => a + b, 0)
        const sumOnce = once(sum)
        
        expect(sumOnce(1, 2, 3)).toBe(6)
        expect(sumOnce(4, 5, 6)).toBe(6) 
    })
})