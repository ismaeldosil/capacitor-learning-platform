// User & Progress Types
export interface User {
  id: string
  name: string
  xp: number
  level: number
  streak: number
  lastActivityDate: string | null
  completedLessons: string[]
  completedQuizzes: string[]
  completedGames: string[]
  badges: string[]
  createdAt: string
}

export interface UserProgress {
  lessonId: string
  moduleId: string
  completedAt: string
  xpEarned: number
}

// Module & Lesson Types
export interface Module {
  id: string
  title: string
  description: string
  icon: string
  requiredXP: number
  lessons: string[]
  quizId: string
  gameId: string
  estimatedTime: string
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  description: string
  content: string
  xpReward: number
  estimatedTime: string
  order: number
}

// Quiz Types
export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Quiz {
  id: string
  moduleId: string
  questions: QuizQuestion[]
  passingScore: number
  xpReward: number
}

export interface QuizResult {
  quizId: string
  score: number
  totalQuestions: number
  passed: boolean
  xpEarned: number
  completedAt: string
}

// Game Types
export type GameType = 'command-builder' | 'plugin-matcher' | 'build-pipeline' | 'store-reviewer' | 'architecture-planner'

export interface GameResult {
  gameId: string
  gameType: GameType
  score: number
  xpEarned: number
  completedAt: string
}

// Badge Types
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  condition: BadgeCondition
  xpBonus: number
}

export type BadgeCondition =
  | { type: 'first_lesson' }
  | { type: 'complete_module'; moduleId: string }
  | { type: 'perfect_quiz'; count: number }
  | { type: 'streak'; days: number }
  | { type: 'complete_all_modules' }
  | { type: 'complete_all_games' }
  | { type: 'speed_run'; moduleId: string; maxMinutes: number }
  | { type: 'xp_threshold'; xp: number }

// Level Types
export interface Level {
  level: number
  name: string
  minXP: number
  maxXP: number
  icon: string
  color: string
}

// Toast Types
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

// Module Status
export type ModuleStatus = 'locked' | 'available' | 'in_progress' | 'completed'

export interface ModuleWithStatus extends Module {
  status: ModuleStatus
  progress: number
  lessonsCompleted: number
}
