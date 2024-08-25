import { useRef } from 'react'

const useDebounceCallback = (
  callback: (...args: any[]) => void,
  delay: number,
) => {
  const timeoutRef = useRef<number | undefined>(undefined)

  const debouncedCallback = (...args: any[]) => {
    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debouncedCallback
}

export default useDebounceCallback
