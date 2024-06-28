/**
 * Implement Array.prototype.flat
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 *
 * E.g
 *
 * const arr = [1, 2, [3,  [4]]];
 *
 * flat(arr) // => [1, 2, 3 [4]]
 * flat(arr, 1) // =>  [1, 2, 3, [4]]
 * flat(arr, 2) // => [1, 2, 3, 4]
 */

export function flat<T>(arr: T[], depth = 1): T[] {
  return depth
    ? arr.reduce<T[]>((acc, val) => {
        if (Array.isArray(val)) {
          return acc.concat(flat(val, depth - 1))
        } else {
          return acc.concat(val)
        }
      }, [])
    : arr
}

export function flatR<T>(arr: T[], depth = 1): T[] {
  return depth
    ? arr.reduce<T[]>((acc, val) => {
        return [...acc, ...(Array.isArray(val) ? flat(val, depth - 1) : [val])]
      }, [])
    : arr
}

export function flatIterative<T>(arr: T[], depth = 1): T[] {
  const result: T[] = []
  const stack: (T | T[])[] = [...arr]

  while (stack.length > 0) {
    const current = stack.pop()

    if (current) {
      if (Array.isArray(current)) {
        if (depth > 0) {
          stack.push(...current.reverse())
        } else {
          result.push(...current)
        }
      } else {
        result.push(current)
      }
    }
  }

  return result
}
