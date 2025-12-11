import { useCallback, useMemo } from 'react'
import { XP_REWARDS } from '../data/constants'

interface UseStreakReturn {
  currentStreak: number
  shouldUpdateStreak: boolean
  streakBonus: number
  isStreakAtRisk: boolean
  updateStreak: () => { newStreak: number; bonusXP: number }
  resetStreak: () => void
}

function getDateString(date: Date): string {
  return date.toISOString().split('T')[0]!
}

function getDaysDifference(date1: string, date2: string): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

export function useStreak(
  currentStreak: number,
  lastActivityDate: string | null,
  onStreakChange: (streak: number, lastActivity: string) => void
): UseStreakReturn {
  const today = getDateString(new Date())

  const shouldUpdateStreak = useMemo(() => {
    if (!lastActivityDate) return true
    return lastActivityDate !== today
  }, [lastActivityDate, today])

  const isStreakAtRisk = useMemo(() => {
    if (!lastActivityDate) return false
    const daysDiff = getDaysDifference(lastActivityDate, today)
    return daysDiff === 1 && currentStreak > 0
  }, [lastActivityDate, today, currentStreak])

  const streakBonus = useMemo(() => {
    if (currentStreak >= 7) return XP_REWARDS.STREAK_BONUS * 2
    if (currentStreak >= 3) return XP_REWARDS.STREAK_BONUS
    return 0
  }, [currentStreak])

  const updateStreak = useCallback((): { newStreak: number; bonusXP: number } => {
    if (!shouldUpdateStreak) {
      return { newStreak: currentStreak, bonusXP: 0 }
    }

    let newStreak: number
    let bonusXP = 0

    if (!lastActivityDate) {
      newStreak = 1
    } else {
      const daysDiff = getDaysDifference(lastActivityDate, today)

      if (daysDiff === 0) {
        return { newStreak: currentStreak, bonusXP: 0 }
      } else if (daysDiff === 1) {
        newStreak = currentStreak + 1
        if (newStreak >= 7) {
          bonusXP = XP_REWARDS.STREAK_BONUS * 2
        } else if (newStreak >= 3) {
          bonusXP = XP_REWARDS.STREAK_BONUS
        }
      } else {
        newStreak = 1
      }
    }

    onStreakChange(newStreak, today)
    return { newStreak, bonusXP }
  }, [currentStreak, lastActivityDate, today, shouldUpdateStreak, onStreakChange])

  const resetStreak = useCallback(() => {
    onStreakChange(0, today)
  }, [onStreakChange, today])

  return {
    currentStreak,
    shouldUpdateStreak,
    streakBonus,
    isStreakAtRisk,
    updateStreak,
    resetStreak,
  }
}
