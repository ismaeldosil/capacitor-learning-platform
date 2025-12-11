import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRoute } from '../test/test-utils'
import { Game } from './Game'

// Module 1 lessons for testing
const MODULE_1_LESSONS = [
  'what-is-capacitor',
  'architecture',
  'project-structure',
  'commands',
  'live-reload',
]

describe('Game', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('access control', () => {
    it('should redirect when module does not exist', () => {
      renderWithRoute(<Game />, {
        route: '/game/non-existent-module',
        path: '/game/:moduleId',
      })

      expect(screen.queryByText(/command builder/i)).not.toBeInTheDocument()
    })

    it('should redirect when user has insufficient XP for module', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-2',
        path: '/game/:moduleId',
        initialUser: {
          xp: 50, // Module 2 requires 100 XP
          completedLessons: [],
        },
      })

      expect(screen.queryByText(/plugin matcher/i)).not.toBeInTheDocument()
    })

    it('should redirect when quiz is not completed', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [], // Quiz not completed
        },
      })

      expect(screen.queryByText(/command builder/i)).not.toBeInTheDocument()
    })
  })

  describe('game intro state', () => {
    it('should show intro screen when quiz is completed', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
          completedGames: [],
        },
      })

      expect(screen.getByText(/command builder/i)).toBeInTheDocument()
      expect(screen.getByText(/¿listo para jugar\?/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /comenzar juego/i })).toBeInTheDocument()
    })

    it('should show "play again" button when game is already completed', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
        initialUser: {
          xp: 100,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
          completedGames: ['command-builder'],
        },
      })

      // Multiple elements may match "juego completado"
      expect(screen.getAllByText(/juego completado/i).length).toBeGreaterThan(0)
      expect(screen.getByRole('button', { name: /jugar de nuevo/i })).toBeInTheDocument()
    })

    it('should show XP reward info', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
          completedGames: [],
        },
      })

      expect(screen.getByText(/\+100 XP al completar/i)).toBeInTheDocument()
    })

    it('should show game instructions', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
          completedGames: [],
        },
      })

      expect(screen.getByText(/arrastra y suelta/i)).toBeInTheDocument()
    })
  })

  describe('game playing state', () => {
    it('should start game when clicking begin button', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
          completedGames: [],
        },
      })

      const startButton = screen.getByRole('button', { name: /comenzar juego/i })
      await user.click(startButton)

      // Should now show the game content (CommandBuilder)
      await waitFor(() => {
        // Look for game-specific elements
        expect(screen.queryByText(/¿listo para jugar\?/i)).not.toBeInTheDocument()
      })
    })

    it('should start game again when clicking play again', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
        initialUser: {
          xp: 100,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
          completedGames: ['command-builder'],
        },
      })

      const playAgainButton = screen.getByRole('button', { name: /jugar de nuevo/i })
      await user.click(playAgainButton)

      await waitFor(() => {
        // The intro state should no longer be visible (¿Listo?)
        expect(screen.queryByText(/¿listo para jugar\?/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('module 2 game (PluginMatcher)', () => {
    const MODULE_2_LESSONS = [
      'app-plugin',
      'push-notifications',
      'splash-statusbar',
      'keyboard-browser',
      'preferences',
      'biometric',
    ]

    it('should show Plugin Matcher for module 2', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-2',
        path: '/game/:moduleId',
        initialUser: {
          xp: 100,
          completedLessons: [...MODULE_1_LESSONS, ...MODULE_2_LESSONS],
          completedQuizzes: ['quiz-module-1', 'quiz-module-2'],
          completedGames: [],
        },
      })

      expect(screen.getByText(/plugin matcher/i)).toBeInTheDocument()
    })
  })

  describe('module 3 game (BuildPipeline)', () => {
    const MODULE_2_LESSONS = [
      'app-plugin',
      'push-notifications',
      'splash-statusbar',
      'keyboard-browser',
      'preferences',
      'biometric',
    ]

    const MODULE_3_LESSONS = [
      'web-integration',
      'native-features',
      'android-build',
      'ios-build',
      'automation',
    ]

    it('should show Build Pipeline for module 3', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-3',
        path: '/game/:moduleId',
        initialUser: {
          xp: 300,
          completedLessons: [...MODULE_1_LESSONS, ...MODULE_2_LESSONS, ...MODULE_3_LESSONS],
          completedQuizzes: ['quiz-module-1', 'quiz-module-2', 'quiz-module-3'],
          completedGames: [],
        },
      })

      expect(screen.getByText(/build pipeline/i)).toBeInTheDocument()
    })
  })

  describe('module 4 game (StoreReviewer)', () => {
    const MODULE_2_LESSONS = [
      'app-plugin',
      'push-notifications',
      'splash-statusbar',
      'keyboard-browser',
      'preferences',
      'biometric',
    ]

    const MODULE_3_LESSONS = [
      'web-integration',
      'native-features',
      'android-build',
      'ios-build',
      'automation',
    ]

    const MODULE_4_LESSONS = [
      'testing-strategy',
      'play-store',
      'app-store',
      'fintech-compliance',
    ]

    it('should show Store Reviewer for module 4', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-4',
        path: '/game/:moduleId',
        initialUser: {
          xp: 600,
          completedLessons: [...MODULE_1_LESSONS, ...MODULE_2_LESSONS, ...MODULE_3_LESSONS, ...MODULE_4_LESSONS],
          completedQuizzes: ['quiz-module-1', 'quiz-module-2', 'quiz-module-3', 'quiz-module-4'],
          completedGames: [],
        },
      })

      expect(screen.getByText(/store reviewer/i)).toBeInTheDocument()
    })
  })

  describe('back navigation', () => {
    it('should show back link to module', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
          completedGames: [],
        },
      })

      const backLink = screen.getByText(/volver al módulo/i)
      expect(backLink).toBeInTheDocument()
      expect(backLink.closest('a')).toHaveAttribute('href', '/module/module-1')
    })
  })

  describe('game header', () => {
    it('should display game title and description', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
          completedGames: [],
        },
      })

      expect(screen.getByText(/command builder/i)).toBeInTheDocument()
      expect(screen.getByText(/construye comandos de capacitor cli/i)).toBeInTheDocument()
    })

    it('should show game completed status when game is done', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
        initialUser: {
          xp: 100,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
          completedGames: ['command-builder'],
        },
      })

      // Multiple elements may match "juego completado"
      expect(screen.getAllByText(/juego completado/i).length).toBeGreaterThan(0)
    })
  })

  describe('game icons', () => {
    it('should display game icon in header', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
          completedGames: [],
        },
      })

      // Game icon appears in multiple places
      expect(screen.getAllByText('🔧').length).toBeGreaterThan(0)
    })
  })
})
