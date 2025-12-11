import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export type AdFormat = 'auto' | 'horizontal' | 'vertical' | 'rectangle'
export type AdSlotType = 'dashboard-footer' | 'lesson-sidebar' | 'module-inline' | 'results-bottom'

interface AdBannerProps {
  /** AdSense ad slot ID */
  slot: string
  /** Ad format - defaults to 'auto' for responsive ads */
  format?: AdFormat
  /** Optional CSS class name */
  className?: string
  /** Test mode - shows placeholder instead of real ads */
  testMode?: boolean
}

/**
 * Google AdSense banner component
 *
 * Renders a responsive ad unit that respects user preferences
 * and only loads when the AdSense client ID is configured.
 */
export function AdBanner({
  slot,
  format = 'auto',
  className = '',
  testMode = false
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isInitialized = useRef(false)

  const clientId = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined

  useEffect(() => {
    // Skip if no client ID configured or already initialized
    if (!clientId || isInitialized.current) return

    // Skip in test mode
    if (testMode) return

    try {
      // Push ad to adsbygoogle queue
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
        isInitialized.current = true
      }
    } catch (error) {
      console.error('AdSense initialization error:', error)
    }
  }, [clientId, testMode])

  // Show placeholder in test mode
  if (testMode) {
    return (
      <div
        className={`bg-gray-800/50 border border-dashed border-gray-600 rounded-lg p-4 text-center ${className}`}
        role="complementary"
        aria-label="Espacio publicitario"
      >
        <p className="text-xs text-gray-500 uppercase tracking-wide">Publicidad</p>
        <p className="text-sm text-gray-400 mt-1">Ad Slot: {slot}</p>
      </div>
    )
  }

  // Don't render if no client ID
  if (!clientId) {
    return null
  }

  return (
    <div className={className} role="complementary" aria-label="Publicidad">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
