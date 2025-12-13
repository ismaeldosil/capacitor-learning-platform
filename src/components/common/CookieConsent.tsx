import { useState, useEffect } from 'react'
import { Cookie, X, BarChart3 } from 'lucide-react'
import { getConsentStatus, setAnalyticsConsent } from '../../utils/analytics'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Only show banner if consent hasn't been given or denied
    const consentStatus = getConsentStatus()
    if (consentStatus === null) {
      // Small delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    setAnalyticsConsent(true)
    setShowBanner(false)
  }

  const handleDecline = () => {
    setAnalyticsConsent(false)
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg flex-shrink-0">
            <Cookie className="w-6 h-6 text-blue-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h2
                id="cookie-consent-title"
                className="text-lg font-semibold text-white flex items-center gap-2"
              >
                <Cookie className="w-5 h-5 sm:hidden text-blue-400" />
                Cookies y Analytics
              </h2>
              <button
                onClick={handleDecline}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                aria-label="Cerrar sin aceptar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p
              id="cookie-consent-description"
              className="text-sm text-gray-300 mb-4"
            >
              Usamos Google Analytics para mejorar tu experiencia de aprendizaje.
              Esto nos ayuda a entender cómo usas la plataforma y qué contenido es
              más útil. No compartimos tus datos con terceros.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Aceptar Analytics
              </button>
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-lg transition-colors"
              >
                No, gracias
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Puedes cambiar tu preferencia en cualquier momento desde la configuración.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
