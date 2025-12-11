import { describe, it, expect } from 'vitest'
import {
  getModuleStatus,
  getModuleProgress,
  getCompletedLessonsCount,
  getLessonTitle,
  getGameTitle,
} from './module-utils'

describe('module-utils', () => {
  describe('getModuleStatus', () => {
    it('should return locked when user has insufficient XP', () => {
      const status = getModuleStatus('module-2', 50, [], [])
      expect(status).toBe('locked')
    })

    it('should return available when user has enough XP but no progress', () => {
      const status = getModuleStatus('module-1', 0, [], [])
      expect(status).toBe('available')
    })

    it('should return in_progress when some lessons are completed', () => {
      const status = getModuleStatus('module-1', 0, ['what-is-capacitor'], [])
      expect(status).toBe('in_progress')
    })

    it('should return in_progress when quiz is completed but not all lessons', () => {
      const status = getModuleStatus('module-1', 0, ['what-is-capacitor'], ['quiz-module-1'])
      expect(status).toBe('in_progress')
    })

    it('should return completed when all lessons and quiz are done', () => {
      const allLessons = [
        'what-is-capacitor',
        'architecture',
        'project-structure',
        'commands',
        'live-reload',
      ]
      const status = getModuleStatus('module-1', 0, allLessons, ['quiz-module-1'])
      expect(status).toBe('completed')
    })

    it('should return locked for non-existent module', () => {
      const status = getModuleStatus('non-existent', 1000, [], [])
      expect(status).toBe('locked')
    })
  })

  describe('getModuleProgress', () => {
    it('should return 0 for no completed lessons', () => {
      const progress = getModuleProgress('module-1', [])
      expect(progress).toBe(0)
    })

    it('should return correct percentage for partial completion', () => {
      // Module 1 has 5 lessons, so 2/5 = 40%
      const progress = getModuleProgress('module-1', ['what-is-capacitor', 'architecture'])
      expect(progress).toBe(40)
    })

    it('should return 100 for all lessons completed', () => {
      const allLessons = [
        'what-is-capacitor',
        'architecture',
        'project-structure',
        'commands',
        'live-reload',
      ]
      const progress = getModuleProgress('module-1', allLessons)
      expect(progress).toBe(100)
    })

    it('should return 0 for non-existent module', () => {
      const progress = getModuleProgress('non-existent', ['some-lesson'])
      expect(progress).toBe(0)
    })
  })

  describe('getCompletedLessonsCount', () => {
    it('should return 0 for no completed lessons', () => {
      const count = getCompletedLessonsCount('module-1', [])
      expect(count).toBe(0)
    })

    it('should return correct count for partial completion', () => {
      const count = getCompletedLessonsCount('module-1', ['what-is-capacitor', 'architecture'])
      expect(count).toBe(2)
    })

    it('should only count lessons that belong to the module', () => {
      // Only architecture belongs to module-1
      const count = getCompletedLessonsCount('module-1', ['architecture', 'app-plugin'])
      expect(count).toBe(1)
    })

    it('should return 0 for non-existent module', () => {
      const count = getCompletedLessonsCount('non-existent', ['some-lesson'])
      expect(count).toBe(0)
    })
  })

  describe('getLessonTitle', () => {
    it('should return correct title for known lesson', () => {
      expect(getLessonTitle('what-is-capacitor')).toBe('¿Qué es Capacitor?')
      expect(getLessonTitle('architecture')).toBe('Arquitectura')
      expect(getLessonTitle('app-plugin')).toBe('App Plugin')
      expect(getLessonTitle('testing-strategy')).toBe('Estrategia de Testing')
    })

    it('should return the ID for unknown lesson', () => {
      expect(getLessonTitle('unknown-lesson')).toBe('unknown-lesson')
    })
  })

  describe('getGameTitle', () => {
    it('should return correct title for known game', () => {
      expect(getGameTitle('command-builder')).toBe('Constructor de Comandos')
      expect(getGameTitle('plugin-matcher')).toBe('Plugin Matcher')
      expect(getGameTitle('build-pipeline')).toBe('Build Pipeline')
      expect(getGameTitle('store-reviewer')).toBe('Store Reviewer')
    })

    it('should return the ID for unknown game', () => {
      expect(getGameTitle('unknown-game')).toBe('unknown-game')
    })
  })
})
