/**
 * Debounce - a function ensures that it doesn't get called too frequently
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number = 0
): {
  (...args: Parameters<T>): void
  cancel: () => void
  flush: () => void
} {
  let timeoutID: ReturnType<typeof setTimeout> | null = null

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    clearTimeout(timeoutID || undefined)

    timeoutID = setTimeout(() => {
      timeoutID = null
      func.call(this, ...args)
    }, wait)
  }

  debounced.cancel = () => {
    clearTimeout(timeoutID || undefined)
    timeoutID = null
  }

  // Flush: Executes the debounced function immediately if pending

  debounced.flush = () => {
    if (timeoutID) {
      clearTimeout(timeoutID)
      timeoutID = null
      func()
    }
  }

  return debounced
}
