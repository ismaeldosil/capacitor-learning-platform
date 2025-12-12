import type { Level, Badge, Module } from './types'

// XP Rewards
export const XP_REWARDS = {
  LESSON_COMPLETE: 10,
  QUIZ_PASSED: 25,
  QUIZ_PERFECT: 50,
  GAME_COMPLETE: 100,
  STREAK_BONUS: 20,
} as const

// Level Thresholds
export const LEVELS: Level[] = [
  {
    level: 1,
    name: 'Capacitor Rookie',
    minXP: 0,
    maxXP: 100,
    icon: 'sprout',
    color: 'text-green-400',
  },
  {
    level: 2,
    name: 'Plugin Explorer',
    minXP: 101,
    maxXP: 300,
    icon: 'plug',
    color: 'text-blue-400',
  },
  {
    level: 3,
    name: 'Build Master',
    minXP: 301,
    maxXP: 600,
    icon: 'hammer',
    color: 'text-purple-400',
  },
  {
    level: 4,
    name: 'Store Publisher',
    minXP: 601,
    maxXP: 1000,
    icon: 'rocket',
    color: 'text-orange-400',
  },
  {
    level: 5,
    name: 'Capacitor Expert',
    minXP: 1001,
    maxXP: Infinity,
    icon: 'crown',
    color: 'text-yellow-400',
  },
]

// Badges
export const BADGES: Badge[] = [
  {
    id: 'first-launch',
    name: 'First Launch',
    description: 'Completar tu primera lección',
    icon: 'target',
    condition: { type: 'first_lesson' },
    xpBonus: 10,
  },
  {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Completar un módulo en menos de 1 hora',
    icon: 'zap',
    condition: { type: 'speed_run', moduleId: 'module-1', maxMinutes: 60 },
    xpBonus: 25,
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Obtener 100% en un quiz',
    icon: 'award',
    condition: { type: 'perfect_quiz', count: 1 },
    xpBonus: 15,
  },
  {
    id: 'on-fire',
    name: 'On Fire',
    description: 'Mantener una racha de 3 días',
    icon: 'flame',
    condition: { type: 'streak', days: 3 },
    xpBonus: 20,
  },
  {
    id: 'module-master',
    name: 'Module Master',
    description: 'Completar el primer módulo',
    icon: 'graduation-cap',
    condition: { type: 'complete_module', moduleId: 'module-1' },
    xpBonus: 30,
  },
  {
    id: 'capacitor-king',
    name: 'Capacitor King',
    description: 'Completar todos los módulos',
    icon: 'crown',
    condition: { type: 'complete_all_modules' },
    xpBonus: 100,
  },
  {
    id: 'quiz-genius',
    name: 'Quiz Genius',
    description: 'Obtener 100% en 5 quizzes',
    icon: 'brain',
    condition: { type: 'perfect_quiz', count: 5 },
    xpBonus: 50,
  },
  {
    id: 'gamer',
    name: 'Gamer',
    description: 'Completar todos los mini-juegos',
    icon: 'gamepad',
    condition: { type: 'complete_all_games' },
    xpBonus: 75,
  },
]

// Modules
export const MODULES: Module[] = [
  {
    id: 'module-1',
    title: 'Setup + Fundamentos Capacitor',
    description: 'Configurar el environment y entender la arquitectura',
    icon: 'rocket',
    requiredXP: 0,
    lessons: [
      'what-is-capacitor',
      'architecture',
      'project-structure',
      'commands',
      'live-reload',
    ],
    quizId: 'quiz-module-1',
    gameId: 'command-builder',
    estimatedTime: '2 horas',
  },
  {
    id: 'module-2',
    title: 'Plugins Core + Web-to-Native Bridge',
    description: 'Dominar los plugins principales de Capacitor',
    icon: 'plug',
    requiredXP: 100,
    lessons: [
      'app-plugin',
      'push-notifications',
      'splash-statusbar',
      'keyboard-browser',
      'preferences',
      'biometric',
    ],
    quizId: 'quiz-module-2',
    gameId: 'plugin-matcher',
    estimatedTime: '3 horas',
  },
  {
    id: 'module-3',
    title: 'Desarrollo + Build Processes',
    description: 'Compilar y desplegar para Android e iOS',
    icon: 'hammer',
    requiredXP: 300,
    lessons: [
      'web-integration',
      'native-features',
      'android-build',
      'ios-build',
      'automation',
    ],
    quizId: 'quiz-module-3',
    gameId: 'build-pipeline',
    estimatedTime: '3 horas',
  },
  {
    id: 'module-4',
    title: 'Testing + App Store Preparation',
    description: 'Preparar y publicar en las tiendas de apps',
    icon: 'store',
    requiredXP: 450,
    lessons: [
      'testing-strategy',
      'play-store',
      'app-store',
      'fintech-compliance',
    ],
    quizId: 'quiz-module-4',
    gameId: 'store-reviewer',
    estimatedTime: '2.5 horas',
  },
  {
    id: 'module-5',
    title: 'Arquitectura Avanzada',
    description: 'Patrones de arquitectura escalable para apps Capacitor empresariales',
    icon: 'layers',
    requiredXP: 600,
    lessons: [
      'monorepos-turborepo',
      'feature-based-architecture',
      'tanstack-query',
      'zustand',
      'native-bridge-patterns',
      'performance-optimization',
    ],
    quizId: 'quiz-module-5',
    gameId: 'architecture-planner',
    estimatedTime: '3 horas',
  },
  {
    id: 'module-6',
    title: 'Seguridad en Apps Móviles',
    description: 'Implementar autenticación segura, almacenamiento protegido y cumplimiento OWASP',
    icon: 'shield',
    requiredXP: 800,
    lessons: [
      'biometric-authentication',
      'oauth-pkce',
      'secure-storage',
      'ssl-pinning',
      'app-hardening',
      'owasp-compliance',
    ],
    quizId: 'quiz-module-6',
    gameId: 'security-audit',
    estimatedTime: '3 horas',
  },
]

// Quiz Config
export const QUIZ_CONFIG = {
  PASSING_SCORE: 70,
  TIME_LIMIT_SECONDS: 0, // 0 = no limit
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'capacitor-learning-user',
  PROGRESS: 'capacitor-learning-progress',
  THEME: 'capacitor-learning-theme',
} as const
