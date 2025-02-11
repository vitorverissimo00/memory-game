import React from 'react'

/**
 * useWindowSize hook
 * @returns { width: number; height: number }
 */
export function useWindowSize(): { width: number; height: number } {
  const [size, setSize] = React.useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  React.useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
