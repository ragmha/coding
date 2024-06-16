/**
 * Create a util to return a copy that replaces undefined with null
 *
 * For e.g
 *
 * 1. undefinedToNull(({ a: undefined, b: 'hello-world' })) // => { a: null, b: 'hello-world' }
 *
 * 2. undefinedToNull({a: ['hello-world, undefined, 2]}) // => { a: ['hello-world, null, 2']}
 *
 */

export function undefinedToNull(arg: any): any {
  if (Array.isArray(arg)) {
    return arg.map(undefinedToNull)
  }

  if (typeof arg !== 'object' || arg === null) {
    return arg ?? null
  }

  for (let key in arg) {
    arg[key] = undefinedToNull(arg[key])
  }

  return arg
}
