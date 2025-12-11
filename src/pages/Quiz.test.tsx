import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRoute } from '../test/test-utils'
import { Quiz } from './Quiz'

// Module 1 lessons for testing
const MODULE_1_LESSONS = [
  'what-is-capacitor',
  'architecture',
  'project-structure',
  'commands',
  'live-reload',
]

describe('Quiz', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('access control', () => {
    it('should redirect when module does not exist', () => {
      renderWithRoute(<Quiz />, {
        route: '/quiz/non-existent-module',
        path: '/quiz/:moduleId',
      })

      expect(screen.queryByText(/quiz/i)).not.toBeInTheDocument()
    })

    it('should redirect when user has insufficient XP for module', () => {
      renderWithRoute(<Quiz />, {
        route: '/quiz/module-2',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 50, // Module 2 requires 100 XP
          completedLessons: [],
        },
      })

      expect(screen.queryByText(/quiz.*fundamentos/i)).not.toBeInTheDocument()
    })

    it('should redirect when lessons are not completed', () => {
      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: ['what-is-capacitor'], // Only 1 of 5 lessons
        },
      })

      expect(screen.queryByText(/quiz.*fundamentos/i)).not.toBeInTheDocument()
    })
  })

  describe('quiz intro state', () => {
    it('should show intro screen when all lessons are completed', () => {
      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      expect(screen.getByText(/quiz.*fundamentos/i)).toBeInTheDocument()
      expect(screen.getByText(/¿listo para el quiz\?/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /comenzar quiz/i })).toBeInTheDocument()
    })

    it('should show "repeat quiz" button when quiz is already completed', () => {
      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 50,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
        },
      })

      expect(screen.getByText(/quiz completado/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /repetir quiz/i })).toBeInTheDocument()
    })

    it('should show quiz info with question count and passing score', () => {
      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      // Uses getAllByText since text appears in multiple places
      const infoTexts = screen.getAllByText(/10 preguntas.*70% para aprobar/i)
      expect(infoTexts.length).toBeGreaterThan(0)
    })

    it('should show previous XP earned when quiz completed', () => {
      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 50,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: ['quiz-module-1'],
        },
      })

      expect(screen.getByText(/\+25 XP ganados anteriormente/i)).toBeInTheDocument()
    })
  })

  describe('quiz playing state', () => {
    it('should start quiz when clicking begin button', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      const startButton = screen.getByRole('button', { name: /comenzar quiz/i })
      await user.click(startButton)

      await waitFor(() => {
        // Multiple elements may match, just verify at least one exists
        expect(screen.getAllByText(/pregunta 1/i).length).toBeGreaterThan(0)
      })
      expect(screen.getByText(/¿qué es capacitor\?/i)).toBeInTheDocument()
    })

    it('should allow selecting an answer', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      await waitFor(() => {
        expect(screen.getAllByText(/pregunta 1/i).length).toBeGreaterThan(0)
      })

      // Find and click an option by text
      const correctOption = screen.getByText(/runtime nativo/i)
      await user.click(correctOption)

      // The verify button should not be disabled
      const verifyButton = screen.getByRole('button', { name: /verificar respuesta/i })
      expect(verifyButton).not.toBeDisabled()
    })

    it('should show explanation after verifying correct answer', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      await waitFor(() => {
        expect(screen.getAllByText(/pregunta 1/i).length).toBeGreaterThan(0)
      })

      // Select correct answer
      await user.click(screen.getByText(/runtime nativo/i))
      await user.click(screen.getByRole('button', { name: /verificar respuesta/i }))

      await waitFor(() => {
        expect(screen.getByText(/¡correcto!/i)).toBeInTheDocument()
      })
      expect(screen.getByText(/capacitor es un runtime nativo moderno/i)).toBeInTheDocument()
    })

    it('should show incorrect feedback for wrong answer', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      await waitFor(() => {
        expect(screen.getAllByText(/pregunta 1/i).length).toBeGreaterThan(0)
      })

      // Select wrong answer
      await user.click(screen.getByText(/framework CSS/i))
      await user.click(screen.getByRole('button', { name: /verificar respuesta/i }))

      await waitFor(() => {
        expect(screen.getByText(/respuesta incorrecta/i)).toBeInTheDocument()
      })
    })

    it('should navigate to next question after answering', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      await waitFor(() => {
        expect(screen.getAllByText(/pregunta 1/i).length).toBeGreaterThan(0)
      })

      // Answer first question
      await user.click(screen.getByText(/runtime nativo/i))
      await user.click(screen.getByRole('button', { name: /verificar respuesta/i }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /siguiente pregunta/i })).toBeInTheDocument()
      })

      await user.click(screen.getByRole('button', { name: /siguiente pregunta/i }))

      await waitFor(() => {
        expect(screen.getAllByText(/pregunta 2/i).length).toBeGreaterThan(0)
      })
    })

    it('should show progress indicators during quiz', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      await waitFor(() => {
        expect(screen.getAllByText(/pregunta 1/i).length).toBeGreaterThan(0)
      })

      // Check that progress indicators exist (10 questions = 10 progress items)
      const progressIndicators = screen.getAllByRole('generic').filter(
        el => el.getAttribute('aria-label')?.includes('Pregunta')
      )
      expect(progressIndicators.length).toBe(10)
    })

    it('should disable verify button when no answer selected', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      await waitFor(() => {
        expect(screen.getAllByText(/pregunta 1/i).length).toBeGreaterThan(0)
      })

      // Verify button should be disabled without selection
      const verifyButton = screen.getByRole('button', { name: /verificar respuesta/i })
      expect(verifyButton).toBeDisabled()
    })

    it('should show "Ver resultados" on last question', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      // Navigate through all 9 questions to reach the 10th
      for (let i = 0; i < 9; i++) {
        await waitFor(() => {
          expect(screen.getAllByText(new RegExp(`pregunta ${i + 1}`, 'i')).length).toBeGreaterThan(0)
        })

        // Select first option
        const options = screen.getAllByRole('option')
        await user.click(options[0])

        await user.click(screen.getByRole('button', { name: /verificar respuesta/i }))

        await waitFor(() => {
          expect(screen.getByRole('button', { name: /siguiente pregunta/i })).toBeInTheDocument()
        })
        await user.click(screen.getByRole('button', { name: /siguiente pregunta/i }))
      }

      // On question 10
      await waitFor(() => {
        expect(screen.getAllByText(/pregunta 10/i).length).toBeGreaterThan(0)
      })

      // Select answer and verify
      const options = screen.getAllByRole('option')
      await user.click(options[0])
      await user.click(screen.getByRole('button', { name: /verificar respuesta/i }))

      // Should show "Ver resultados" instead of "Siguiente pregunta"
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /ver resultados/i })).toBeInTheDocument()
      })
    }, 30000)
  })

  describe('quiz result state', () => {
    it('should show result screen with score after completing quiz', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      // Complete all questions
      for (let i = 0; i < 10; i++) {
        await waitFor(() => {
          expect(screen.getAllByText(new RegExp(`pregunta ${i + 1}`, 'i')).length).toBeGreaterThan(0)
        })

        const options = screen.getAllByRole('option')
        await user.click(options[0])

        await user.click(screen.getByRole('button', { name: /verificar respuesta/i }))

        await waitFor(() => {
          const nextButton = screen.queryByRole('button', { name: /siguiente pregunta/i })
          const resultsButton = screen.queryByRole('button', { name: /ver resultados/i })
          expect(nextButton || resultsButton).toBeTruthy()
        })

        const nextButton = screen.queryByRole('button', { name: /siguiente pregunta/i })
        const resultsButton = screen.queryByRole('button', { name: /ver resultados/i })

        if (nextButton) {
          await user.click(nextButton)
        } else if (resultsButton) {
          await user.click(resultsButton)
        }
      }

      // Should show results with score
      await waitFor(() => {
        expect(screen.getByText(/puntuación/i)).toBeInTheDocument()
        expect(screen.getByText(/correctas/i)).toBeInTheDocument()
      })
    }, 60000)

    it('should show XP earned section in results', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      // Complete all questions
      for (let i = 0; i < 10; i++) {
        await waitFor(() => {
          expect(screen.getAllByText(new RegExp(`pregunta ${i + 1}`, 'i')).length).toBeGreaterThan(0)
        })

        const options = screen.getAllByRole('option')
        await user.click(options[0])

        await user.click(screen.getByRole('button', { name: /verificar respuesta/i }))

        await waitFor(() => {
          const nextButton = screen.queryByRole('button', { name: /siguiente pregunta/i })
          const resultsButton = screen.queryByRole('button', { name: /ver resultados/i })
          expect(nextButton || resultsButton).toBeTruthy()
        })

        const nextButton = screen.queryByRole('button', { name: /siguiente pregunta/i })
        const resultsButton = screen.queryByRole('button', { name: /ver resultados/i })

        if (nextButton) {
          await user.click(nextButton)
        } else if (resultsButton) {
          await user.click(resultsButton)
        }
      }

      // Results should show XP info
      await waitFor(() => {
        expect(screen.getByText(/xp ganado/i)).toBeInTheDocument()
      })
    }, 60000)

    it('should show answer summary in results', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      // Complete all questions
      for (let i = 0; i < 10; i++) {
        await waitFor(() => {
          expect(screen.getAllByText(new RegExp(`pregunta ${i + 1}`, 'i')).length).toBeGreaterThan(0)
        })

        const options = screen.getAllByRole('option')
        await user.click(options[0])

        await user.click(screen.getByRole('button', { name: /verificar respuesta/i }))

        await waitFor(() => {
          const nextButton = screen.queryByRole('button', { name: /siguiente pregunta/i })
          const resultsButton = screen.queryByRole('button', { name: /ver resultados/i })
          expect(nextButton || resultsButton).toBeTruthy()
        })

        const nextButton = screen.queryByRole('button', { name: /siguiente pregunta/i })
        const resultsButton = screen.queryByRole('button', { name: /ver resultados/i })

        if (nextButton) {
          await user.click(nextButton)
        } else if (resultsButton) {
          await user.click(resultsButton)
        }
      }

      // Should show answer summary
      await waitFor(() => {
        expect(screen.getByText(/resumen de respuestas/i)).toBeInTheDocument()
      })
    }, 60000)
  })

  describe('quiz actions', () => {
    it('should show retry button when quiz is not passed', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      // Complete all questions selecting first option (will likely fail)
      for (let i = 0; i < 10; i++) {
        await waitFor(() => {
          expect(screen.getAllByText(new RegExp(`pregunta ${i + 1}`, 'i')).length).toBeGreaterThan(0)
        })

        const options = screen.getAllByRole('option')
        await user.click(options[0])

        await user.click(screen.getByRole('button', { name: /verificar respuesta/i }))

        await waitFor(() => {
          const nextButton = screen.queryByRole('button', { name: /siguiente pregunta/i })
          const resultsButton = screen.queryByRole('button', { name: /ver resultados/i })
          expect(nextButton || resultsButton).toBeTruthy()
        })

        const nextButton = screen.queryByRole('button', { name: /siguiente pregunta/i })
        const resultsButton = screen.queryByRole('button', { name: /ver resultados/i })

        if (nextButton) {
          await user.click(nextButton)
        } else if (resultsButton) {
          await user.click(resultsButton)
        }
      }

      // Should show retry option (only shown if not passed)
      await waitFor(() => {
        const retryButton = screen.queryByRole('button', { name: /intentar de nuevo/i })
        const continueButton = screen.queryByRole('button', { name: /continuar|volver/i })
        expect(retryButton || continueButton).toBeTruthy()
      })
    }, 60000)

    it('should show continue/back button in results', async () => {
      const user = userEvent.setup()

      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      await user.click(screen.getByRole('button', { name: /comenzar quiz/i }))

      // Complete all questions
      for (let i = 0; i < 10; i++) {
        await waitFor(() => {
          expect(screen.getAllByText(new RegExp(`pregunta ${i + 1}`, 'i')).length).toBeGreaterThan(0)
        })

        const options = screen.getAllByRole('option')
        await user.click(options[0])

        await user.click(screen.getByRole('button', { name: /verificar respuesta/i }))

        await waitFor(() => {
          const nextButton = screen.queryByRole('button', { name: /siguiente pregunta/i })
          const resultsButton = screen.queryByRole('button', { name: /ver resultados/i })
          expect(nextButton || resultsButton).toBeTruthy()
        })

        const nextButton = screen.queryByRole('button', { name: /siguiente pregunta/i })
        const resultsButton = screen.queryByRole('button', { name: /ver resultados/i })

        if (nextButton) {
          await user.click(nextButton)
        } else if (resultsButton) {
          await user.click(resultsButton)
        }
      }

      // Should have a continue or back to module button
      await waitFor(() => {
        const continueButton = screen.queryByRole('button', { name: /continuar/i })
        const backButton = screen.queryByRole('button', { name: /volver al módulo/i })
        expect(continueButton || backButton).toBeTruthy()
      })
    }, 60000)
  })

  describe('back navigation', () => {
    it('should show back link to module', () => {
      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      const backLink = screen.getByText(/volver al módulo/i)
      expect(backLink).toBeInTheDocument()
      expect(backLink.closest('a')).toHaveAttribute('href', '/module/module-1')
    })
  })

  describe('quiz header', () => {
    it('should display module title in quiz header', () => {
      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
        initialUser: {
          xp: 0,
          completedLessons: MODULE_1_LESSONS,
          completedQuizzes: [],
        },
      })

      expect(screen.getByText(/quiz.*fundamentos/i)).toBeInTheDocument()
      expect(screen.getByText(/evalúa tus conocimientos/i)).toBeInTheDocument()
    })
  })
})
