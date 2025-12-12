import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { X, Star, ArrowUp } from 'lucide-react'
import type { Level } from '../../data/types'
import { Icon } from '../common/Icon'

interface LevelUpPopupProps {
  level: Level | null
  onClose: () => void
  autoCloseDelay?: number
}

export function LevelUpPopup({
  level,
  onClose,
  autoCloseDelay = 5000,
}: LevelUpPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const { t } = useTranslation('gamification')

  useEffect(() => {
    if (level) {
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
  }, [level, autoCloseDelay, onClose])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsLeaving(false)
      onClose()
    }, 300)
  }

  if (!level) return null

  return createPortal(
    <div
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
      `}
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary-500/30 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-1 shadow-2xl shadow-primary-500/20">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10 animate-pulse" />

        <div className="relative flex items-center gap-4 rounded-xl bg-gray-900/90 px-6 py-4">
          {/* Star decorations */}
          <div className="absolute -top-2 -left-2">
            <Star className="h-6 w-6 text-primary-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <Star className="h-5 w-5 text-accent-400 animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          {/* Level Icon */}
          <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 ring-2 ${level.color.replace('text-', 'ring-')}/50`}>
            <Icon name={level.icon} className={`h-10 w-10 ${level.color}`} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4 text-green-400" />
              <p className="text-sm font-medium text-green-400">
                {t('levelUp.title', '¡Subiste de Nivel!')}
              </p>
            </div>
            <h3 className={`text-xl font-bold ${level.color}`}>
              {t('levelUp.newLevel', 'Nivel {{level}}: {{name}}', { level: level.level, name: level.name })}
            </h3>
            <p className="text-sm text-gray-400">
              {t('levelUp.congratulations', '¡Felicidades por tu progreso!')}
            </p>
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
