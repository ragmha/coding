/**
 * Debounce - a function ensures that it doesn't get called too frequently
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number = 0
): (...args: Parameters<T>) => void {
  let timeoutID: ReturnType<typeof setTimeout> | null = null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutID || undefined)

    timeoutID = setTimeout(() => {
      timeoutID = null
      func.call(this, ...args)
    }, wait)
  }
}
