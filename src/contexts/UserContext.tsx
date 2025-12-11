import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS, XP_REWARDS, LEVELS, MODULES, BADGES } from '../data/constants'
import type { User } from '../data/types'

// Badge checking utility
function checkAndAwardBadges(user: User): string[] {
  const newBadges: string[] = []

  for (const badge of BADGES) {
    // Skip if already has badge
    if (user.badges.includes(badge.id)) continue

    const { condition } = badge
    let shouldAward = false

    switch (condition.type) {
      case 'first_lesson':
        shouldAward = user.completedLessons.length >= 1
        break

      case 'perfect_quiz': {
        const perfectCount = user.completedQuizzes.filter((q) =>
          q.endsWith('-perfect')
        ).length
        shouldAward = perfectCount >= (condition.count || 1)
        break
      }

      case 'streak':
        shouldAward = user.streak >= (condition.days || 3)
        break

      case 'complete_module': {
        const module = MODULES.find((m) => m.id === condition.moduleId)
        if (module) {
          const allLessons = module.lessons.every((l) =>
            user.completedLessons.includes(l)
          )
          const quizDone = user.completedQuizzes.some((q) =>
            q.startsWith(module.quizId)
          )
          const gameDone = user.completedGames.includes(module.gameId)
          shouldAward = allLessons && quizDone && gameDone
        }
        break
      }

      case 'complete_all_modules': {
        shouldAward = MODULES.every((module) => {
          const allLessons = module.lessons.every((l) =>
            user.completedLessons.includes(l)
          )
          const quizDone = user.completedQuizzes.some((q) =>
            q.startsWith(module.quizId)
          )
          const gameDone = user.completedGames.includes(module.gameId)
          return allLessons && quizDone && gameDone
        })
        break
      }

      case 'complete_all_games':
        shouldAward = MODULES.every((m) =>
          user.completedGames.includes(m.gameId)
        )
        break

      // speed_run would require tracking module start times - skip for now
      case 'speed_run':
        break
    }

    if (shouldAward) {
      newBadges.push(badge.id)
    }
  }

  return newBadges
}

// Initial user state
const createInitialUser = (): User => ({
  id: crypto.randomUUID(),
  name: 'Developer',
  xp: 0,
  level: 1,
  streak: 0,
  lastActivityDate: null,
  completedLessons: [],
  completedQuizzes: [],
  completedGames: [],
  badges: [],
  createdAt: new Date().toISOString(),
})

// Context types
interface UserContextType {
  user: User
  // XP & Level
  addXP: (amount: number) => void
  currentLevel: typeof LEVELS[number]
  nextLevel: typeof LEVELS[number] | null
  xpProgress: number
  // Progress
  completeLesson: (lessonId: string) => void
  completeQuiz: (quizId: string, score: number, total: number) => void
  completeGame: (gameId: string) => void
  isLessonCompleted: (lessonId: string) => boolean
  isQuizCompleted: (quizId: string) => boolean
  isGameCompleted: (gameId: string) => boolean
  // Badges
  unlockBadge: (badgeId: string) => void
  hasBadge: (badgeId: string) => boolean
  syncBadges: () => void
  // Streak
  updateStreak: () => number
  // Reset
  resetProgress: () => void
}

const UserContext = createContext<UserContextType | null>(null)

// Provider
interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useLocalStorage<User>(
    STORAGE_KEYS.USER,
    createInitialUser()
  )

  // Calculate level from XP
  const calculateLevel = useCallback((xp: number) => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      const level = LEVELS[i]
      if (level && xp >= level.minXP) {
        return level
      }
    }
    return LEVELS[0]!
  }, [])

  const currentLevel = useMemo(
    () => calculateLevel(user.xp),
    [user.xp, calculateLevel]
  )

  const nextLevel = useMemo(() => {
    const nextIndex = LEVELS.findIndex((l) => l.level === currentLevel.level) + 1
    return nextIndex < LEVELS.length ? LEVELS[nextIndex]! : null
  }, [currentLevel])

  const xpProgress = useMemo(() => {
    if (!nextLevel) return 100
    const levelRange = nextLevel.minXP - currentLevel.minXP
    const progress = user.xp - currentLevel.minXP
    return Math.min(100, Math.round((progress / levelRange) * 100))
  }, [user.xp, currentLevel, nextLevel])

  // Add XP
  const addXP = useCallback(
    (amount: number) => {
      setUser((prev) => {
        const newXP = prev.xp + amount
        const newLevel = calculateLevel(newXP)
        return {
          ...prev,
          xp: newXP,
          level: newLevel.level,
        }
      })
    },
    [setUser, calculateLevel]
  )

  // Complete lesson
  const completeLesson = useCallback(
    (lessonId: string) => {
      setUser((prev) => {
        if (prev.completedLessons.includes(lessonId)) {
          return prev
        }

        const newXP = prev.xp + XP_REWARDS.LESSON_COMPLETE
        const newLevel = calculateLevel(newXP)

        const updatedUser = {
          ...prev,
          xp: newXP,
          level: newLevel.level,
          completedLessons: [...prev.completedLessons, lessonId],
          lastActivityDate: new Date().toISOString().split('T')[0]!,
        }

        // Check and award badges
        const newBadges = checkAndAwardBadges(updatedUser)
        if (newBadges.length > 0) {
          updatedUser.badges = [...updatedUser.badges, ...newBadges]
        }

        return updatedUser
      })
    },
    [setUser, calculateLevel]
  )

  // Complete quiz
  const completeQuiz = useCallback(
    (quizId: string, score: number, total: number) => {
      setUser((prev) => {
        if (prev.completedQuizzes.includes(quizId)) {
          return prev
        }

        const percentage = (score / total) * 100
        const isPerfect = percentage === 100
        const xpEarned = isPerfect ? XP_REWARDS.QUIZ_PERFECT : XP_REWARDS.QUIZ_PASSED

        const newXP = prev.xp + xpEarned
        const newLevel = calculateLevel(newXP)

        const quizRecord = isPerfect ? `${quizId}-perfect` : quizId

        const updatedUser = {
          ...prev,
          xp: newXP,
          level: newLevel.level,
          completedQuizzes: [...prev.completedQuizzes, quizRecord],
          lastActivityDate: new Date().toISOString().split('T')[0]!,
        }

        // Check and award badges
        const newBadges = checkAndAwardBadges(updatedUser)
        if (newBadges.length > 0) {
          updatedUser.badges = [...updatedUser.badges, ...newBadges]
        }

        return updatedUser
      })
    },
    [setUser, calculateLevel]
  )

  // Complete game
  const completeGame = useCallback(
    (gameId: string) => {
      setUser((prev) => {
        if (prev.completedGames.includes(gameId)) {
          return prev
        }

        const newXP = prev.xp + XP_REWARDS.GAME_COMPLETE
        const newLevel = calculateLevel(newXP)

        const updatedUser = {
          ...prev,
          xp: newXP,
          level: newLevel.level,
          completedGames: [...prev.completedGames, gameId],
          lastActivityDate: new Date().toISOString().split('T')[0]!,
        }

        // Check and award badges
        const newBadges = checkAndAwardBadges(updatedUser)
        if (newBadges.length > 0) {
          updatedUser.badges = [...updatedUser.badges, ...newBadges]
        }

        return updatedUser
      })
    },
    [setUser, calculateLevel]
  )

  // Check completion status
  const isLessonCompleted = useCallback(
    (lessonId: string) => user.completedLessons.includes(lessonId),
    [user.completedLessons]
  )

  const isQuizCompleted = useCallback(
    (quizId: string) =>
      user.completedQuizzes.some((q) => q.startsWith(quizId)),
    [user.completedQuizzes]
  )

  const isGameCompleted = useCallback(
    (gameId: string) => user.completedGames.includes(gameId),
    [user.completedGames]
  )

  // Unlock badge
  const unlockBadge = useCallback(
    (badgeId: string) => {
      setUser((prev) => {
        if (prev.badges.includes(badgeId)) {
          return prev
        }
        return {
          ...prev,
          badges: [...prev.badges, badgeId],
        }
      })
    },
    [setUser]
  )

  const hasBadge = useCallback(
    (badgeId: string) => user.badges.includes(badgeId),
    [user.badges]
  )

  // Update streak
  const updateStreak = useCallback((): number => {
    const today = new Date().toISOString().split('T')[0]!

    if (user.lastActivityDate === today) {
      return user.streak
    }

    let newStreak: number
    let bonusXP = 0

    if (!user.lastActivityDate) {
      newStreak = 1
    } else {
      const lastDate = new Date(user.lastActivityDate)
      const todayDate = new Date(today)
      const diffDays = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (diffDays === 1) {
        newStreak = user.streak + 1
        if (newStreak >= 7) {
          bonusXP = XP_REWARDS.STREAK_BONUS * 2
        } else if (newStreak >= 3) {
          bonusXP = XP_REWARDS.STREAK_BONUS
        }
      } else {
        newStreak = 1
      }
    }

    setUser((prev) => {
      const updatedUser = {
        ...prev,
        streak: newStreak,
        xp: prev.xp + bonusXP,
        lastActivityDate: today,
      }

      // Check and award badges (including streak badges)
      const newBadges = checkAndAwardBadges(updatedUser)
      if (newBadges.length > 0) {
        updatedUser.badges = [...updatedUser.badges, ...newBadges]
      }

      return updatedUser
    })

    return newStreak
  }, [user.lastActivityDate, user.streak, setUser])

  // Reset progress
  const resetProgress = useCallback(() => {
    setUser(createInitialUser())
  }, [setUser])

  // Sync badges - retroactively award any earned badges
  const syncBadges = useCallback(() => {
    setUser((prev) => {
      const newBadges = checkAndAwardBadges(prev)
      if (newBadges.length > 0) {
        return {
          ...prev,
          badges: [...prev.badges, ...newBadges],
        }
      }
      return prev
    })
  }, [setUser])

  // Sync badges on mount (retroactive award for existing users)
  const hasSyncedRef = useRef(false)
  useEffect(() => {
    if (!hasSyncedRef.current) {
      hasSyncedRef.current = true
      syncBadges()
    }
  }, [syncBadges])

  const value = useMemo(
    () => ({
      user,
      addXP,
      currentLevel,
      nextLevel,
      xpProgress,
      completeLesson,
      completeQuiz,
      completeGame,
      isLessonCompleted,
      isQuizCompleted,
      isGameCompleted,
      unlockBadge,
      hasBadge,
      syncBadges,
      updateStreak,
      resetProgress,
    }),
    [
      user,
      addXP,
      currentLevel,
      nextLevel,
      xpProgress,
      completeLesson,
      completeQuiz,
      completeGame,
      isLessonCompleted,
      isQuizCompleted,
      isGameCompleted,
      unlockBadge,
      hasBadge,
      syncBadges,
      updateStreak,
      resetProgress,
    ]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Hook
export function useUser(): UserContextType {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
