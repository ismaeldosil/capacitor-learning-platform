import { useCallback } from 'react'
import { BADGES } from '../data/constants'
import type { Badge, User } from '../data/types'

interface UseBadgesReturn {
  unlockedBadges: Badge[]
  lockedBadges: Badge[]
  checkForNewBadges: (user: User) => Badge[]
  isBadgeUnlocked: (badgeId: string) => boolean
}

export function useBadges(
  userBadges: string[],
  onBadgeUnlock: (badgeId: string) => void
): UseBadgesReturn {
  const unlockedBadges = BADGES.filter((badge) =>
    userBadges.includes(badge.id)
  )

  const lockedBadges = BADGES.filter(
    (badge) => !userBadges.includes(badge.id)
  )

  const isBadgeUnlocked = useCallback(
    (badgeId: string): boolean => {
      return userBadges.includes(badgeId)
    },
    [userBadges]
  )

  const checkForNewBadges = useCallback(
    (user: User): Badge[] => {
      const newBadges: Badge[] = []

      for (const badge of BADGES) {
        if (userBadges.includes(badge.id)) continue

        let shouldUnlock = false
        const condition = badge.condition

        switch (condition.type) {
          case 'first_lesson':
            shouldUnlock = user.completedLessons.length >= 1
            break

          case 'complete_module': {
            const moduleId = condition.moduleId
            const moduleLessons = getModuleLessons(moduleId)
            shouldUnlock = moduleLessons.every((lessonId) =>
              user.completedLessons.includes(lessonId)
            )
            break
          }

          case 'perfect_quiz':
            shouldUnlock =
              user.completedQuizzes.filter((q) => q.includes('perfect')).length >=
              condition.count
            break

          case 'streak':
            shouldUnlock = user.streak >= condition.days
            break

          case 'complete_all_modules':
            shouldUnlock = user.completedQuizzes.length >= 4
            break

          case 'complete_all_games':
            shouldUnlock = user.completedGames.length >= 4
            break

          case 'xp_threshold':
            shouldUnlock = user.xp >= condition.xp
            break
        }

        if (shouldUnlock) {
          newBadges.push(badge)
          onBadgeUnlock(badge.id)
        }
      }

      return newBadges
    },
    [userBadges, onBadgeUnlock]
  )

  return {
    unlockedBadges,
    lockedBadges,
    checkForNewBadges,
    isBadgeUnlocked,
  }
}

function getModuleLessons(moduleId: string): string[] {
  const moduleLessonsMap: Record<string, string[]> = {
    'module-1': [
      'what-is-capacitor',
      'architecture',
      'project-structure',
      'commands',
      'live-reload',
    ],
    'module-2': [
      'app-plugin',
      'push-notifications',
      'splash-statusbar',
      'keyboard-browser',
      'preferences',
      'biometric',
    ],
    'module-3': [
      'web-integration',
      'native-features',
      'android-build',
      'ios-build',
      'automation',
    ],
    'module-4': [
      'testing-strategy',
      'play-store',
      'app-store',
      'fintech-compliance',
    ],
  }

  return moduleLessonsMap[moduleId] || []
}
