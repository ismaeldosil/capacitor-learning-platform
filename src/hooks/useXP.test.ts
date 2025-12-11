import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useXP } from './useXP'

describe('useXP', () => {
  it('should calculate level 1 for 0 XP', () => {
    const onXPChange = vi.fn()
    const { result } = renderHook(() => useXP(0, onXPChange))

    expect(result.current.currentLevel.level).toBe(1)
    expect(result.current.currentLevel.name).toBe('Capacitor Rookie')
  })

  it('should calculate level 2 for 150 XP', () => {
    const onXPChange = vi.fn()
    const { result } = renderHook(() => useXP(150, onXPChange))

    expect(result.current.currentLevel.level).toBe(2)
    expect(result.current.currentLevel.name).toBe('Plugin Explorer')
  })

  it('should calculate level 5 for 1500 XP', () => {
    const onXPChange = vi.fn()
    const { result } = renderHook(() => useXP(1500, onXPChange))

    expect(result.current.currentLevel.level).toBe(5)
    expect(result.current.currentLevel.name).toBe('Capacitor Expert')
  })

  it('should return next level when not at max', () => {
    const onXPChange = vi.fn()
    const { result } = renderHook(() => useXP(50, onXPChange))

    expect(result.current.nextLevel).not.toBeNull()
    expect(result.current.nextLevel?.level).toBe(2)
  })

  it('should return null next level when at max', () => {
    const onXPChange = vi.fn()
    const { result } = renderHook(() => useXP(1500, onXPChange))

    expect(result.current.nextLevel).toBeNull()
  })

  it('should calculate correct XP to next level', () => {
    const onXPChange = vi.fn()
    const { result } = renderHook(() => useXP(50, onXPChange))

    // Level 1 max is 100, at 50 XP we need 51 more to reach level 2 (101)
    expect(result.current.xpToNextLevel).toBe(51)
  })

  it('should calculate progress percentage correctly', () => {
    const onXPChange = vi.fn()
    const { result } = renderHook(() => useXP(50, onXPChange))

    // Level 1 is 0-100, at 50 we should be at 50%
    expect(result.current.progressPercent).toBe(50)
  })

  it('should add XP and call onXPChange', () => {
    const onXPChange = vi.fn()
    const { result } = renderHook(() => useXP(100, onXPChange))

    act(() => {
      const newXP = result.current.addXP(50)
      expect(newXP).toBe(150)
    })

    expect(onXPChange).toHaveBeenCalledWith(150)
  })

  it('should calculate level correctly for any XP', () => {
    const onXPChange = vi.fn()
    const { result } = renderHook(() => useXP(0, onXPChange))

    // Test boundary values
    expect(result.current.calculateLevel(0).level).toBe(1)
    expect(result.current.calculateLevel(100).level).toBe(1)
    expect(result.current.calculateLevel(101).level).toBe(2)
    expect(result.current.calculateLevel(300).level).toBe(2)
    expect(result.current.calculateLevel(301).level).toBe(3)
    expect(result.current.calculateLevel(600).level).toBe(3)
    expect(result.current.calculateLevel(601).level).toBe(4)
    expect(result.current.calculateLevel(1000).level).toBe(4)
    expect(result.current.calculateLevel(1001).level).toBe(5)
  })
})
