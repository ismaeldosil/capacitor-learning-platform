import { MODULES } from '../data/constants'
import type { ModuleStatus } from '../data/types'

/**
 * Determines the status of a module based on user progress
 * @param moduleId - The module ID to check
 * @param userXP - User's current XP
 * @param completedLessons - Array of completed lesson IDs
 * @param completedQuizzes - Array of completed quiz IDs
 * @returns ModuleStatus - 'locked' | 'available' | 'in_progress' | 'completed'
 */
export function getModuleStatus(
  moduleId: string,
  userXP: number,
  completedLessons: string[],
  completedQuizzes: string[]
): ModuleStatus {
  const module = MODULES.find((m) => m.id === moduleId)
  if (!module) return 'locked'

  if (userXP < module.requiredXP) return 'locked'

  const allLessonsCompleted = module.lessons.every((lessonId) =>
    completedLessons.includes(lessonId)
  )
  const quizCompleted = completedQuizzes.some((q) => q.startsWith(module.quizId))

  if (allLessonsCompleted && quizCompleted) return 'completed'

  const anyProgress =
    module.lessons.some((lessonId) => completedLessons.includes(lessonId)) ||
    quizCompleted

  if (anyProgress) return 'in_progress'

  return 'available'
}

/**
 * Calculates the progress percentage for a module
 * @param moduleId - The module ID
 * @param completedLessons - Array of completed lesson IDs
 * @returns Progress percentage (0-100)
 */
export function getModuleProgress(
  moduleId: string,
  completedLessons: string[]
): number {
  const module = MODULES.find((m) => m.id === moduleId)
  if (!module) return 0

  const lessonsCompleted = module.lessons.filter((l) =>
    completedLessons.includes(l)
  ).length

  return Math.round((lessonsCompleted / module.lessons.length) * 100)
}

/**
 * Gets the number of completed lessons for a module
 * @param moduleId - The module ID
 * @param completedLessons - Array of completed lesson IDs
 * @returns Number of completed lessons
 */
export function getCompletedLessonsCount(
  moduleId: string,
  completedLessons: string[]
): number {
  const module = MODULES.find((m) => m.id === moduleId)
  if (!module) return 0

  return module.lessons.filter((l) => completedLessons.includes(l)).length
}

// Lesson title mappings
const LESSON_TITLES: Record<string, string> = {
  // Module 1
  'what-is-capacitor': '¿Qué es Capacitor?',
  'architecture': 'Arquitectura',
  'project-structure': 'Estructura del Proyecto',
  'commands': 'Comandos CLI',
  'live-reload': 'Live Reload',
  // Module 2
  'app-plugin': 'App Plugin',
  'push-notifications': 'Push Notifications',
  'splash-statusbar': 'Splash & Status Bar',
  'keyboard-browser': 'Keyboard & Browser',
  'preferences': 'Preferences',
  'biometric': 'Autenticación Biométrica',
  // Module 3
  'web-integration': 'Integración Web',
  'native-features': 'Features Nativos',
  'android-build': 'Build Android',
  'ios-build': 'Build iOS',
  'automation': 'Automatización CI/CD',
  // Module 4
  'testing-strategy': 'Estrategia de Testing',
  'play-store': 'Google Play Store',
  'app-store': 'App Store',
  'fintech-compliance': 'Compliance Fintech',
}

/**
 * Gets the display title for a lesson
 * @param lessonId - The lesson ID
 * @returns Human-readable lesson title
 */
export function getLessonTitle(lessonId: string): string {
  return LESSON_TITLES[lessonId] || lessonId
}

// Game title mappings
const GAME_TITLES: Record<string, string> = {
  'command-builder': 'Constructor de Comandos',
  'plugin-matcher': 'Plugin Matcher',
  'build-pipeline': 'Build Pipeline',
  'store-reviewer': 'Store Reviewer',
}

/**
 * Gets the display title for a game
 * @param gameId - The game ID
 * @returns Human-readable game title
 */
export function getGameTitle(gameId: string): string {
  return GAME_TITLES[gameId] || gameId
}
