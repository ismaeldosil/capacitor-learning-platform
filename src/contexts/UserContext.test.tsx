import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { UserProvider, useUser } from './UserContext'
import { ReactNode } from 'react'

function wrapper({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>
}

describe('UserContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('should provide initial user state', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      expect(result.current.user).toBeDefined()
      expect(result.current.user.xp).toBe(0)
      expect(result.current.user.level).toBe(1)
      expect(result.current.user.streak).toBe(0)
      expect(result.current.user.completedLessons).toEqual([])
      expect(result.current.user.badges).toEqual([])
    })

    it('should calculate initial level correctly', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      expect(result.current.currentLevel.level).toBe(1)
      expect(result.current.currentLevel.name).toBe('Capacitor Rookie')
    })
  })

  describe('addXP', () => {
    it('should add XP to user', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      act(() => {
        result.current.addXP(50)
      })

      expect(result.current.user.xp).toBe(50)
    })

    it('should level up when XP threshold is reached', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      act(() => {
        result.current.addXP(150) // Level 2 starts at 101
      })

      expect(result.current.user.level).toBe(2)
      expect(result.current.currentLevel.name).toBe('Plugin Explorer')
    })
  })

  describe('completeLesson', () => {
    it('should mark lesson as completed and add XP', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      act(() => {
        result.current.completeLesson('what-is-capacitor')
      })

      expect(result.current.user.completedLessons).toContain('what-is-capacitor')
      expect(result.current.user.xp).toBe(10) // LESSON_COMPLETE XP
    })

    it('should not add XP if lesson already completed', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      act(() => {
        result.current.completeLesson('what-is-capacitor')
        result.current.completeLesson('what-is-capacitor')
      })

      expect(result.current.user.xp).toBe(10) // Only once
      expect(result.current.user.completedLessons.length).toBe(1)
    })
  })

  describe('completeQuiz', () => {
    it('should mark quiz as completed with passed XP', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      act(() => {
        result.current.completeQuiz('quiz-module-1', 8, 10) // 80%
      })

      expect(result.current.user.completedQuizzes).toContain('quiz-module-1')
      expect(result.current.user.xp).toBe(25) // QUIZ_PASSED XP
    })

    it('should give perfect XP for 100% score', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      act(() => {
        result.current.completeQuiz('quiz-module-1', 10, 10) // 100%
      })

      expect(result.current.user.completedQuizzes).toContain('quiz-module-1-perfect')
      expect(result.current.user.xp).toBe(50) // QUIZ_PERFECT XP
    })
  })

  describe('completeGame', () => {
    it('should mark game as completed and add XP', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      act(() => {
        result.current.completeGame('command-builder')
      })

      expect(result.current.user.completedGames).toContain('command-builder')
      expect(result.current.user.xp).toBe(100) // GAME_COMPLETE XP
    })
  })

  describe('isCompleted checks', () => {
    it('should check lesson completion', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      expect(result.current.isLessonCompleted('what-is-capacitor')).toBe(false)

      act(() => {
        result.current.completeLesson('what-is-capacitor')
      })

      expect(result.current.isLessonCompleted('what-is-capacitor')).toBe(true)
    })

    it('should check quiz completion', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      expect(result.current.isQuizCompleted('quiz-module-1')).toBe(false)

      act(() => {
        result.current.completeQuiz('quiz-module-1', 8, 10)
      })

      expect(result.current.isQuizCompleted('quiz-module-1')).toBe(true)
    })

    it('should check game completion', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      expect(result.current.isGameCompleted('command-builder')).toBe(false)

      act(() => {
        result.current.completeGame('command-builder')
      })

      expect(result.current.isGameCompleted('command-builder')).toBe(true)
    })
  })

  describe('badges', () => {
    it('should unlock badge', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      act(() => {
        result.current.unlockBadge('first-launch')
      })

      expect(result.current.user.badges).toContain('first-launch')
      expect(result.current.hasBadge('first-launch')).toBe(true)
    })

    it('should not duplicate badges', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      act(() => {
        result.current.unlockBadge('first-launch')
        result.current.unlockBadge('first-launch')
      })

      expect(result.current.user.badges.length).toBe(1)
    })
  })

  describe('resetProgress', () => {
    it('should reset all progress', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      act(() => {
        result.current.addXP(500)
      })

      act(() => {
        result.current.completeLesson('what-is-capacitor')
      })

      act(() => {
        result.current.unlockBadge('first-launch')
      })

      expect(result.current.user.xp).toBe(510)
      expect(result.current.user.completedLessons).toContain('what-is-capacitor')
      expect(result.current.user.badges).toContain('first-launch')

      act(() => {
        result.current.resetProgress()
      })

      expect(result.current.user.xp).toBe(0)
      expect(result.current.user.completedLessons).toEqual([])
      expect(result.current.user.badges).toEqual([])
    })
  })

  describe('xpProgress', () => {
    it('should calculate XP progress percentage', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      // Level 1: 0-100 XP
      act(() => {
        result.current.addXP(50)
      })

      expect(result.current.xpProgress).toBe(50)
    })

    it('should return 100 at max level', () => {
      const { result } = renderHook(() => useUser(), { wrapper })

      act(() => {
        result.current.addXP(1500) // Level 5 (max)
      })

      expect(result.current.xpProgress).toBe(100)
      expect(result.current.nextLevel).toBeNull()
    })
  })
})

describe('useUser outside provider', () => {
  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useUser())
    }).toThrow('useUser must be used within a UserProvider')
  })
})
