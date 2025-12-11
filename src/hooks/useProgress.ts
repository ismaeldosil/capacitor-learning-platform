import { useCallback } from 'react'
import { MODULES } from '../data/constants'
import type { ModuleStatus, ModuleWithStatus } from '../data/types'

interface UseProgressReturn {
  getModuleStatus: (moduleId: string, userXP: number) => ModuleStatus
  getModuleProgress: (moduleId: string, completedLessons: string[]) => number
  getModulesWithStatus: (
    userXP: number,
    completedLessons: string[],
    completedQuizzes: string[],
    completedGames: string[]
  ) => ModuleWithStatus[]
  isLessonCompleted: (lessonId: string, completedLessons: string[]) => boolean
  isQuizCompleted: (quizId: string, completedQuizzes: string[]) => boolean
  isGameCompleted: (gameId: string, completedGames: string[]) => boolean
  getTotalProgress: (completedLessons: string[]) => number
}

export function useProgress(): UseProgressReturn {
  const getModuleStatus = useCallback(
    (
      moduleId: string,
      userXP: number,
      completedLessons: string[] = [],
      completedQuizzes: string[] = [],
      completedGames: string[] = []
    ): ModuleStatus => {
      const module = MODULES.find((m) => m.id === moduleId)
      if (!module) return 'locked'

      if (userXP < module.requiredXP) return 'locked'

      const allLessonsCompleted = module.lessons.every((lessonId) =>
        completedLessons.includes(lessonId)
      )
      const quizCompleted = completedQuizzes.includes(module.quizId)
      const gameCompleted = completedGames.includes(module.gameId)

      if (allLessonsCompleted && quizCompleted && gameCompleted) {
        return 'completed'
      }

      const anyLessonCompleted = module.lessons.some((lessonId) =>
        completedLessons.includes(lessonId)
      )

      if (anyLessonCompleted || quizCompleted) {
        return 'in_progress'
      }

      return 'available'
    },
    []
  )

  const getModuleProgress = useCallback(
    (moduleId: string, completedLessons: string[]): number => {
      const module = MODULES.find((m) => m.id === moduleId)
      if (!module) return 0

      const completed = module.lessons.filter((lessonId) =>
        completedLessons.includes(lessonId)
      ).length

      return Math.round((completed / module.lessons.length) * 100)
    },
    []
  )

  const getModulesWithStatus = useCallback(
    (
      userXP: number,
      completedLessons: string[],
      completedQuizzes: string[],
      completedGames: string[]
    ): ModuleWithStatus[] => {
      return MODULES.map((module) => {
        const status = getModuleStatus(
          module.id,
          userXP,
          completedLessons,
          completedQuizzes,
          completedGames
        )
        const progress = getModuleProgress(module.id, completedLessons)
        const lessonsCompleted = module.lessons.filter((lessonId) =>
          completedLessons.includes(lessonId)
        ).length

        return {
          ...module,
          status,
          progress,
          lessonsCompleted,
        }
      })
    },
    [getModuleStatus, getModuleProgress]
  )

  const isLessonCompleted = useCallback(
    (lessonId: string, completedLessons: string[]): boolean => {
      return completedLessons.includes(lessonId)
    },
    []
  )

  const isQuizCompleted = useCallback(
    (quizId: string, completedQuizzes: string[]): boolean => {
      return completedQuizzes.includes(quizId)
    },
    []
  )

  const isGameCompleted = useCallback(
    (gameId: string, completedGames: string[]): boolean => {
      return completedGames.includes(gameId)
    },
    []
  )

  const getTotalProgress = useCallback(
    (completedLessons: string[]): number => {
      const totalLessons = MODULES.reduce(
        (acc, module) => acc + module.lessons.length,
        0
      )
      return Math.round((completedLessons.length / totalLessons) * 100)
    },
    []
  )

  return {
    getModuleStatus: (moduleId, userXP) =>
      getModuleStatus(moduleId, userXP, [], [], []),
    getModuleProgress,
    getModulesWithStatus,
    isLessonCompleted,
    isQuizCompleted,
    isGameCompleted,
    getTotalProgress,
  }
}
