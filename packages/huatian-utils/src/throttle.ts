type FN = (...args: any[]) => any

export function throttle<T extends FN>(fn : T, limit: number = 300) 
:(...args : Parameters<T>) => ReturnType<T>
{
  let lastReault: any
  let inThrottle: boolean = false
  return (...args) => {
    if(!inThrottle) {
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
      lastReault = fn(...args)
    }
    return lastReault
  }
}