import { useState } from 'react'
import { BADGES } from '../../data/constants'
import type { Badge } from '../../data/types'
import { BadgeCard } from './BadgeCard'
import { Modal } from '../common/Modal'

interface BadgeGridProps {
  userBadges: string[]
  columns?: 4 | 6 | 8
  size?: 'sm' | 'md' | 'lg'
  showProgress?: boolean
}

export function BadgeGrid({
  userBadges,
  columns = 4,
  size = 'md',
  showProgress = true,
}: BadgeGridProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)

  const unlockedCount = userBadges.length
  const totalCount = BADGES.length
  const progressPercent = Math.round((unlockedCount / totalCount) * 100)

  const gridColsClass = {
    4: 'grid-cols-4',
    6: 'grid-cols-3 sm:grid-cols-6',
    8: 'grid-cols-4 sm:grid-cols-8',
  }

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      {showProgress && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Logros ({unlockedCount}/{totalCount})
          </h3>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-700">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm text-gray-400">{progressPercent}%</span>
          </div>
        </div>
      )}

      {/* Badge Grid */}
      <div className={`grid ${gridColsClass[columns]} gap-2`}>
        {BADGES.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            isUnlocked={userBadges.includes(badge.id)}
            size={size}
            onClick={() => setSelectedBadge(badge)}
          />
        ))}
      </div>

      {/* Badge Detail Modal */}
      <Modal
        isOpen={selectedBadge !== null}
        onClose={() => setSelectedBadge(null)}
        title={selectedBadge?.name}
        size="sm"
      >
        {selectedBadge && (
          <div className="text-center">
            <div
              className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-xl ${
                userBadges.includes(selectedBadge.id)
                  ? 'bg-gradient-to-br from-primary-500/20 to-accent-500/20'
                  : 'bg-gray-800 grayscale opacity-50'
              }`}
            >
              <span className="text-5xl">{selectedBadge.icon}</span>
            </div>

            <p className="mb-4 text-gray-300">{selectedBadge.description}</p>

            {userBadges.includes(selectedBadge.id) ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-green-400">
                <span>✓</span>
                <span>Desbloqueado</span>
                {selectedBadge.xpBonus > 0 && (
                  <span className="font-bold">+{selectedBadge.xpBonus} XP</span>
                )}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-700 px-4 py-2 text-gray-400">
                <span>🔒</span>
                <span>Bloqueado</span>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
