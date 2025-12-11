import { useCallback, useMemo } from 'react'
import { LEVELS, XP_REWARDS } from '../data/constants'
import type { Level } from '../data/types'

interface UseXPReturn {
  currentLevel: Level
  nextLevel: Level | null
  xpForCurrentLevel: number
  xpToNextLevel: number
  progressPercent: number
  addXP: (amount: number) => number
  calculateLevel: (xp: number) => Level
}

export function useXP(
  currentXP: number,
  onXPChange: (newXP: number) => void
): UseXPReturn {
  const calculateLevel = useCallback((xp: number): Level => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      const level = LEVELS[i]
      if (level && xp >= level.minXP) {
        return level
      }
    }
    return LEVELS[0]!
  }, [])

  const currentLevel = useMemo(
    () => calculateLevel(currentXP),
    [currentXP, calculateLevel]
  )

  const nextLevel = useMemo(() => {
    const nextIndex = LEVELS.findIndex((l) => l.level === currentLevel.level) + 1
    return nextIndex < LEVELS.length ? LEVELS[nextIndex]! : null
  }, [currentLevel])

  const xpForCurrentLevel = useMemo(() => {
    return currentXP - currentLevel.minXP
  }, [currentXP, currentLevel])

  const xpToNextLevel = useMemo(() => {
    if (!nextLevel) return 0
    return nextLevel.minXP - currentXP
  }, [currentXP, nextLevel])

  const progressPercent = useMemo(() => {
    if (!nextLevel) return 100
    const levelRange = nextLevel.minXP - currentLevel.minXP
    const progress = currentXP - currentLevel.minXP
    return Math.min(100, Math.round((progress / levelRange) * 100))
  }, [currentXP, currentLevel, nextLevel])

  const addXP = useCallback(
    (amount: number): number => {
      const newXP = currentXP + amount
      onXPChange(newXP)
      return newXP
    },
    [currentXP, onXPChange]
  )

  return {
    currentLevel,
    nextLevel,
    xpForCurrentLevel,
    xpToNextLevel,
    progressPercent,
    addXP,
    calculateLevel,
  }
}

export { XP_REWARDS }
