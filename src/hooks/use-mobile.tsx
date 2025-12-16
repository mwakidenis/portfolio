
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Check if we're on the client-side
    if (typeof window === 'undefined') return;
    
    // Initial check
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Create media query
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Define handler
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Modern event listener
    if (mql.addEventListener) {
      mql.addEventListener('change', handleResize)
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', handleResize)
    }
    
    // Cleanup
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleResize)
      } else {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return isMobile
}

// Export a hook to get the current viewport dimensions
export function useViewportSize() {
  const [size, setSize] = React.useState({ width: 0, height: 0 })
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    // Initial size
    updateSize()
    
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  return size
}
