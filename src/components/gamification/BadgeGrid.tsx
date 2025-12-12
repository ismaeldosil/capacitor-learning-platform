import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BADGES } from '../../data/constants'
import type { Badge } from '../../data/types'
import { BadgeCard } from './BadgeCard'
import { Modal } from '../common/Modal'
import { Icon } from '../common/Icon'
import { CheckCircle, Lock, Lightbulb, Gift } from 'lucide-react'

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
  const { t } = useTranslation('gamification')

  const unlockedCount = userBadges.length
  const totalCount = BADGES.length
  const progressPercent = Math.round((unlockedCount / totalCount) * 100)

  const gridColsClass = {
    4: 'grid-cols-4',
    6: 'grid-cols-3 sm:grid-cols-6',
    8: 'grid-cols-4 sm:grid-cols-8',
  }

  const isSelectedUnlocked = selectedBadge ? userBadges.includes(selectedBadge.id) : false

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
        title={selectedBadge ? t(`badges.${selectedBadge.id}.name`) : ''}
        size="sm"
      >
        {selectedBadge && (
          <div className="space-y-6">
            {/* Badge Icon */}
            <div className="text-center">
              <div
                className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-xl border-2 transition-all ${
                  isSelectedUnlocked
                    ? 'bg-gradient-to-br from-primary-500/20 to-accent-500/20 border-primary-500/50'
                    : 'bg-gray-800 border-gray-700 grayscale opacity-60'
                }`}
              >
                <Icon
                  name={selectedBadge.icon}
                  className={`h-12 w-12 ${isSelectedUnlocked ? 'text-primary-400' : 'text-gray-500'}`}
                />
              </div>

              <p className="text-gray-300">{t(`badges.${selectedBadge.id}.description`)}</p>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center">
              {isSelectedUnlocked ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t('badgeDialog.unlocked')}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-700 px-4 py-2 text-gray-400">
                  <Lock className="h-4 w-4" />
                  <span>{t('badgeDialog.locked')}</span>
                </div>
              )}
            </div>

            {/* How to Unlock Section - Always visible */}
            <div className={`rounded-lg border p-4 ${
              isSelectedUnlocked
                ? 'border-gray-600 bg-gray-800/50'
                : 'border-amber-500/30 bg-amber-500/10'
            }`}>
              <div className="flex items-start gap-3">
                <Lightbulb className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                  isSelectedUnlocked ? 'text-gray-400' : 'text-amber-400'
                }`} />
                <div>
                  <h4 className={`mb-1 font-semibold ${
                    isSelectedUnlocked ? 'text-gray-300' : 'text-amber-400'
                  }`}>
                    {t('badgeDialog.howToUnlock')}
                  </h4>
                  <p className={`text-sm ${
                    isSelectedUnlocked ? 'text-gray-400' : 'text-amber-200/80'
                  }`}>
                    {t(`badges.${selectedBadge.id}.howToUnlock`)}
                  </p>
                </div>
              </div>
            </div>

            {/* XP Reward */}
            {selectedBadge.xpBonus > 0 && (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-yellow-500/10 py-3 text-yellow-400">
                <Gift className="h-5 w-5" />
                <span className="font-semibold">
                  {t('badgeDialog.xpReward', { xp: selectedBadge.xpBonus })}
                </span>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
