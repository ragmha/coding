/**
 * Implement a function to be called only once, later calls only returns the result of first call.
 * @param func The function to be called only once
 * @returns A function that will only execute the input function once and cache its result
 */
export function once<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => ReturnType<T> {
    let called = false;
    let result: ReturnType<T>;

    return function (...args: Parameters<T>): ReturnType<T> {
        if (!called) {
            called = true;
            result = func(...args);
        }
        return result;
    }
}