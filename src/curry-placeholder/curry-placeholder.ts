/**
 * A techniqu of translating a function that takes multiple arguments into a sequence of families of
 * functions, each taking a single argument
 * Currying doesn’t call a function. It just transforms it.
 * @see @link https://en.wikipedia.org/wiki/Currying
 *
 *
 *  @example
 * const  join = (a, b, c) => {
 *  return `${a}_${b}_${c}`
 * }
 *
 * const curriedJoin = curry(join)
 * const _ = curry.placeholder
 *
 * curriedJoin(1, 2, 3) // '1_2_3'
 *
 * curriedJoin(_, 2)(1, 3) // '1_2_3'
 *
 * curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'
 */

type AnyFn = (...args: any[]) => any

type CurryReturn<F extends AnyFn> = <T extends any[]>(
  ...args: T
) => T['length'] extends Parameters<F>['length']
  ? ReturnType<F>
  : CurryReturn<F>

export function curry<F extends AnyFn>(fn: F): CurryReturn<F> {
  return function curried(...args: any[]) {
    const complete =
      args.length >= fn.length &&
      !args.slice(0, fn.length).includes(curry.placeholder)

    if (complete) return fn(...args)

    return function (...newArgs: any[]) {
      const res = args.map((arg) =>
        arg === curry.placeholder && newArgs.length ? newArgs.shift() : arg
      )

      return curried(...res, ...newArgs)
    }
  }
}

curry.placeholder = Symbol()
