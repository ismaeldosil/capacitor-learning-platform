import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useBadges } from './useBadges'
import type { User } from '../data/types'

const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: 'test-user',
  name: 'Test User',
  xp: 0,
  level: 1,
  streak: 0,
  lastActivityDate: null,
  completedLessons: [],
  completedQuizzes: [],
  completedGames: [],
  badges: [],
  createdAt: new Date().toISOString(),
  ...overrides,
})

describe('useBadges', () => {
  describe('unlockedBadges and lockedBadges', () => {
    it('should return all badges as locked initially', () => {
      const onBadgeUnlock = vi.fn()
      const { result } = renderHook(() => useBadges([], onBadgeUnlock))

      expect(result.current.unlockedBadges.length).toBe(0)
      expect(result.current.lockedBadges.length).toBe(8)
    })

    it('should separate unlocked and locked badges', () => {
      const onBadgeUnlock = vi.fn()
      const { result } = renderHook(() =>
        useBadges(['first-launch', 'perfect-score'], onBadgeUnlock)
      )

      expect(result.current.unlockedBadges.length).toBe(2)
      expect(result.current.lockedBadges.length).toBe(6)
    })
  })

  describe('isBadgeUnlocked', () => {
    it('should return true for unlocked badge', () => {
      const onBadgeUnlock = vi.fn()
      const { result } = renderHook(() =>
        useBadges(['first-launch'], onBadgeUnlock)
      )

      expect(result.current.isBadgeUnlocked('first-launch')).toBe(true)
    })

    it('should return false for locked badge', () => {
      const onBadgeUnlock = vi.fn()
      const { result } = renderHook(() => useBadges([], onBadgeUnlock))

      expect(result.current.isBadgeUnlocked('first-launch')).toBe(false)
    })
  })

  describe('checkForNewBadges', () => {
    it('should unlock first-launch badge after completing first lesson', () => {
      const onBadgeUnlock = vi.fn()
      const { result } = renderHook(() => useBadges([], onBadgeUnlock))

      const user = createMockUser({
        completedLessons: ['what-is-capacitor'],
      })

      act(() => {
        const newBadges = result.current.checkForNewBadges(user)
        expect(newBadges.length).toBeGreaterThanOrEqual(1)
        expect(newBadges.some((b) => b.id === 'first-launch')).toBe(true)
      })

      expect(onBadgeUnlock).toHaveBeenCalledWith('first-launch')
    })

    it('should not unlock already unlocked badges', () => {
      const onBadgeUnlock = vi.fn()
      const { result } = renderHook(() =>
        useBadges(['first-launch'], onBadgeUnlock)
      )

      const user = createMockUser({
        completedLessons: ['what-is-capacitor'],
      })

      act(() => {
        const newBadges = result.current.checkForNewBadges(user)
        expect(newBadges.some((b) => b.id === 'first-launch')).toBe(false)
      })
    })

    it('should unlock streak badge for 3 day streak', () => {
      const onBadgeUnlock = vi.fn()
      const { result } = renderHook(() => useBadges([], onBadgeUnlock))

      const user = createMockUser({
        streak: 3,
      })

      act(() => {
        const newBadges = result.current.checkForNewBadges(user)
        expect(newBadges.some((b) => b.id === 'on-fire')).toBe(true)
      })
    })

    it('should unlock all games badge', () => {
      const onBadgeUnlock = vi.fn()
      const { result } = renderHook(() => useBadges([], onBadgeUnlock))

      const user = createMockUser({
        completedGames: [
          'command-builder',
          'plugin-matcher',
          'build-pipeline',
          'store-reviewer',
        ],
      })

      act(() => {
        const newBadges = result.current.checkForNewBadges(user)
        expect(newBadges.some((b) => b.id === 'gamer')).toBe(true)
      })
    })

    it('should unlock all modules badge', () => {
      const onBadgeUnlock = vi.fn()
      const { result } = renderHook(() => useBadges([], onBadgeUnlock))

      const user = createMockUser({
        completedQuizzes: [
          'quiz-module-1',
          'quiz-module-2',
          'quiz-module-3',
          'quiz-module-4',
        ],
      })

      act(() => {
        const newBadges = result.current.checkForNewBadges(user)
        expect(newBadges.some((b) => b.id === 'capacitor-king')).toBe(true)
      })
    })
  })
})
