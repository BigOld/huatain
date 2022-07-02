type FN = (...args : any[]) => any

export function debounce<T extends FN>(fn: T, limit: number = 300) 
: (...args : Parameters<T>) => ReturnType<T>
{
  let timer: any, lastReault: any
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      lastReault = fn(...args)
    }, limit)
    return lastReault
  }
}
