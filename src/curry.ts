/**
 * A techniqu of translating a function that takes multiple arguments into a sequence of families of
 * functions, each taking a single argument
 * Currying doesn’t call a function. It just transforms it.
 * @see @link https://en.wikipedia.org/wiki/Currying
 *
 *
 *  @example
 *  const add = (a, b) => a + b;
 *  const curriedAdd = curry(add);
 *  curriedAdd(1)(2); // => 3
 */

type AnyFn = (...args: any[]) => any

type CurryReturn<F extends AnyFn> = <T extends any[]>(
  ...args: T
) => T['length'] extends Parameters<F>['length']
  ? ReturnType<F>
  : CurryReturn<F>

export function curry<F extends AnyFn>(fn: F): CurryReturn<F> {
  return function curried(...args: any[]) {
    if (args.length >= fn.length) return fn(...args)
    return (...args2: any[]) => curried(...args, ...args2)
  }
}
