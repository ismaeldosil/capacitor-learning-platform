import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useProgress } from './useProgress'

describe('useProgress', () => {
  describe('getModuleProgress', () => {
    it('should return 0 for no completed lessons', () => {
      const { result } = renderHook(() => useProgress())

      const progress = result.current.getModuleProgress('module-1', [])
      expect(progress).toBe(0)
    })

    it('should calculate progress correctly', () => {
      const { result } = renderHook(() => useProgress())

      // Module 1 has 5 lessons
      const progress = result.current.getModuleProgress('module-1', [
        'what-is-capacitor',
        'architecture',
      ])
      expect(progress).toBe(40) // 2/5 = 40%
    })

    it('should return 100 for all lessons completed', () => {
      const { result } = renderHook(() => useProgress())

      const progress = result.current.getModuleProgress('module-1', [
        'what-is-capacitor',
        'architecture',
        'project-structure',
        'commands',
        'live-reload',
      ])
      expect(progress).toBe(100)
    })

    it('should return 0 for unknown module', () => {
      const { result } = renderHook(() => useProgress())

      const progress = result.current.getModuleProgress('unknown-module', [])
      expect(progress).toBe(0)
    })
  })

  describe('getModulesWithStatus', () => {
    it('should return all modules with status', () => {
      const { result } = renderHook(() => useProgress())

      const modules = result.current.getModulesWithStatus(0, [], [], [])

      expect(modules.length).toBe(5)
      expect(modules[0]?.status).toBe('available')
      expect(modules[1]?.status).toBe('locked') // Requires 100 XP
    })

    it('should mark module as in_progress when lessons started', () => {
      const { result } = renderHook(() => useProgress())

      const modules = result.current.getModulesWithStatus(
        0,
        ['what-is-capacitor'],
        [],
        []
      )

      expect(modules[0]?.status).toBe('in_progress')
    })

    it('should mark module as completed when all done', () => {
      const { result } = renderHook(() => useProgress())

      const modules = result.current.getModulesWithStatus(
        0,
        ['what-is-capacitor', 'architecture', 'project-structure', 'commands', 'live-reload'],
        ['quiz-module-1'],
        ['command-builder']
      )

      expect(modules[0]?.status).toBe('completed')
    })

    it('should unlock modules based on XP', () => {
      const { result } = renderHook(() => useProgress())

      const modules = result.current.getModulesWithStatus(150, [], [], [])

      expect(modules[0]?.status).toBe('available')
      expect(modules[1]?.status).toBe('available') // Module 2 requires 100 XP
      expect(modules[2]?.status).toBe('locked') // Module 3 requires 300 XP
    })
  })

  describe('isLessonCompleted', () => {
    it('should return true for completed lessons', () => {
      const { result } = renderHook(() => useProgress())

      expect(
        result.current.isLessonCompleted('what-is-capacitor', ['what-is-capacitor'])
      ).toBe(true)
    })

    it('should return false for incomplete lessons', () => {
      const { result } = renderHook(() => useProgress())

      expect(result.current.isLessonCompleted('what-is-capacitor', [])).toBe(false)
    })
  })

  describe('isQuizCompleted', () => {
    it('should return true for completed quizzes', () => {
      const { result } = renderHook(() => useProgress())

      expect(
        result.current.isQuizCompleted('quiz-module-1', ['quiz-module-1'])
      ).toBe(true)
    })

    it('should return false for incomplete quizzes', () => {
      const { result } = renderHook(() => useProgress())

      expect(result.current.isQuizCompleted('quiz-module-1', [])).toBe(false)
    })
  })

  describe('isGameCompleted', () => {
    it('should return true for completed games', () => {
      const { result } = renderHook(() => useProgress())

      expect(
        result.current.isGameCompleted('command-builder', ['command-builder'])
      ).toBe(true)
    })

    it('should return false for incomplete games', () => {
      const { result } = renderHook(() => useProgress())

      expect(result.current.isGameCompleted('command-builder', [])).toBe(false)
    })
  })

  describe('getTotalProgress', () => {
    it('should return 0 for no completed lessons', () => {
      const { result } = renderHook(() => useProgress())

      expect(result.current.getTotalProgress([])).toBe(0)
    })

    it('should calculate total progress correctly', () => {
      const { result } = renderHook(() => useProgress())

      // Total lessons: 5 + 6 + 5 + 4 + 6 = 26
      const progress = result.current.getTotalProgress([
        'what-is-capacitor',
        'architecture',
      ])
      expect(progress).toBe(8) // 2/26 ≈ 8%
    })
  })
})
