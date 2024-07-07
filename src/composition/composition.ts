export function pipe(funcs: Function[]) {
  return (param: unknown) => {
    return funcs.reduce((acc, func) => func(acc), param)
  }
}
