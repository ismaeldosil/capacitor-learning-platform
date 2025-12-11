import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Sparkles } from 'lucide-react'
import type { Badge } from '../../data/types'

interface AchievementPopupProps {
  badge: Badge | null
  onClose: () => void
  autoCloseDelay?: number
}

export function AchievementPopup({
  badge,
  onClose,
  autoCloseDelay = 5000,
}: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (badge) {
      // Animate in
      requestAnimationFrame(() => {
        setIsVisible(true)
      })

      // Auto close
      if (autoCloseDelay > 0) {
        const timer = setTimeout(() => {
          setIsLeaving(true)
          setTimeout(() => {
            setIsVisible(false)
            setIsLeaving(false)
            onClose()
          }, 300)
        }, autoCloseDelay)
        return () => clearTimeout(timer)
      }
    }
  }, [badge, autoCloseDelay, onClose])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsLeaving(false)
      onClose()
    }, 300)
  }

  if (!badge) return null

  return createPortal(
    <div
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
      `}
    >
      <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-1 shadow-2xl shadow-yellow-500/20">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent animate-pulse" />

        <div className="relative flex items-center gap-4 rounded-xl bg-gray-900/90 px-6 py-4">
          {/* Sparkle decorations */}
          <div className="absolute -top-2 -left-2">
            <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse delay-150" />
          </div>

          {/* Badge Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 ring-2 ring-yellow-500/50">
            <span className="text-4xl animate-bounce-subtle">{badge.icon}</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-sm font-medium text-yellow-400">
              ¡Logro Desbloqueado!
            </p>
            <h3 className="text-xl font-bold text-white">{badge.name}</h3>
            <p className="text-sm text-gray-400">{badge.description}</p>
            {badge.xpBonus > 0 && (
              <p className="mt-1 text-sm font-bold text-yellow-500">
                +{badge.xpBonus} XP
              </p>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 rounded-full p-1 text-gray-500 hover:bg-gray-700 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
