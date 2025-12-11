import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStreak } from './useStreak'

describe('useStreak', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('shouldUpdateStreak', () => {
    it('should return true when no last activity date', () => {
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(0, null, onStreakChange))

      expect(result.current.shouldUpdateStreak).toBe(true)
    })

    it('should return false when already active today', () => {
      const today = new Date().toISOString().split('T')[0]!
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(1, today, onStreakChange))

      expect(result.current.shouldUpdateStreak).toBe(false)
    })

    it('should return true for yesterday activity', () => {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]!
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(1, yesterday, onStreakChange))

      expect(result.current.shouldUpdateStreak).toBe(true)
    })
  })

  describe('isStreakAtRisk', () => {
    it('should return false when no streak', () => {
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(0, null, onStreakChange))

      expect(result.current.isStreakAtRisk).toBe(false)
    })

    it('should return true when streak is 1 day old', () => {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]!
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(3, yesterday, onStreakChange))

      expect(result.current.isStreakAtRisk).toBe(true)
    })
  })

  describe('streakBonus', () => {
    it('should return 0 for streak < 3', () => {
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(2, null, onStreakChange))

      expect(result.current.streakBonus).toBe(0)
    })

    it('should return 20 for streak >= 3', () => {
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(3, null, onStreakChange))

      expect(result.current.streakBonus).toBe(20)
    })

    it('should return 40 for streak >= 7', () => {
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(7, null, onStreakChange))

      expect(result.current.streakBonus).toBe(40)
    })
  })

  describe('updateStreak', () => {
    it('should start new streak from null', () => {
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(0, null, onStreakChange))

      act(() => {
        const { newStreak } = result.current.updateStreak()
        expect(newStreak).toBe(1)
      })

      expect(onStreakChange).toHaveBeenCalled()
    })

    it('should increment streak for consecutive days', () => {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]!
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(2, yesterday, onStreakChange))

      act(() => {
        const { newStreak, bonusXP } = result.current.updateStreak()
        expect(newStreak).toBe(3)
        expect(bonusXP).toBe(20) // Streak bonus for 3 days
      })
    })

    it('should reset streak if more than 1 day gap', () => {
      const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split('T')[0]!
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(5, twoDaysAgo, onStreakChange))

      act(() => {
        const { newStreak } = result.current.updateStreak()
        expect(newStreak).toBe(1)
      })
    })

    it('should not update if already active today', () => {
      const today = new Date().toISOString().split('T')[0]!
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(3, today, onStreakChange))

      act(() => {
        const { newStreak, bonusXP } = result.current.updateStreak()
        expect(newStreak).toBe(3)
        expect(bonusXP).toBe(0)
      })

      expect(onStreakChange).not.toHaveBeenCalled()
    })
  })

  describe('resetStreak', () => {
    it('should reset streak to 0', () => {
      const onStreakChange = vi.fn()
      const { result } = renderHook(() => useStreak(5, null, onStreakChange))

      act(() => {
        result.current.resetStreak()
      })

      expect(onStreakChange).toHaveBeenCalledWith(0, expect.any(String))
    })
  })
})
