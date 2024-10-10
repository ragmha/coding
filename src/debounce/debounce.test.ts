import { describe, expect, test } from 'vitest'
import { debounce } from './debounce'

describe('Debounce', () => {
  test('can be initialized', () => {
    const increment = debounce(() => {
      console.log('increment')
    }, 50)

    expect(increment).toBeTruthy()
  })

  test('executes after duration', (done: () => void) => {
    let count = 0
    const increment = debounce(() => {
      count++
    }, 10)

    expect(count).toBe(0)
    increment()
    expect(count).toBe(0)

    setTimeout(() => {
      expect(count).toBe(1)
      done()
    }, 20)
  })

  test('cancels delayed invocation', (done: () => void) => {
    let count = 0
    const increment = debounce(() => {
      count++
    }, 10)

    expect(count).toBe(0)
    increment()

    increment.cancel()

    setTimeout(() => {
      expect(count).toBe(0)
      done()
    }, 20)
  })

  test('executes function immediately on flush', (done: () => void) => {
    let count = 0

    const increment = debounce(() => {
      count++
    }, 100)

    expect(count).toBe(0)

    increment()

    increment.flush()

    expect(count).toBe(1)

    setTimeout(() => {
      expect(count).toBe(1)
      done()
    }, 200)
  })
})
