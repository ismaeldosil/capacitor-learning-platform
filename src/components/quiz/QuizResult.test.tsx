import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizResult } from './QuizResult'
import type { QuizQuestion } from '../../data/types'

const mockQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'Question 1',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 1,
    explanation: 'Explanation 1',
  },
  {
    id: 'q2',
    text: 'Question 2',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 2,
    explanation: 'Explanation 2',
  },
]

describe('QuizResult', () => {
  const defaultProps = {
    score: 1,
    totalQuestions: 2,
    passed: true,
    xpEarned: 25,
    isPerfect: false,
    questions: mockQuestions,
    answers: [1, 0],
    onRetry: vi.fn(),
    onContinue: vi.fn(),
  }

  describe('passed state', () => {
    it('should show Quiz Aprobado', () => {
      render(<QuizResult {...defaultProps} passed={true} />)
      expect(screen.getByText('¡Quiz Aprobado!')).toBeInTheDocument()
    })

    it('should show XP earned', () => {
      render(<QuizResult {...defaultProps} xpEarned={25} />)
      expect(screen.getByText('+25')).toBeInTheDocument()
    })

    it('should show score percentage', () => {
      render(<QuizResult {...defaultProps} score={1} totalQuestions={2} />)
      expect(screen.getByText('50%')).toBeInTheDocument()
    })

    it('should show correct count', () => {
      render(<QuizResult {...defaultProps} score={1} totalQuestions={2} />)
      expect(screen.getByText('1/2')).toBeInTheDocument()
    })
  })

  describe('failed state', () => {
    it('should show Quiz No Aprobado', () => {
      render(<QuizResult {...defaultProps} passed={false} />)
      expect(screen.getByText('Quiz No Aprobado')).toBeInTheDocument()
    })

    it('should show retry button', () => {
      render(<QuizResult {...defaultProps} passed={false} />)
      expect(screen.getByRole('button', { name: /intentar/i })).toBeInTheDocument()
    })
  })

  describe('perfect score', () => {
    it('should show Puntuación Perfecta', () => {
      render(
        <QuizResult
          {...defaultProps}
          isPerfect={true}
          score={2}
          totalQuestions={2}
        />
      )
      expect(screen.getByText('¡Puntuación Perfecta!')).toBeInTheDocument()
    })
  })

  describe('question summary', () => {
    it('should show question summary', () => {
      render(<QuizResult {...defaultProps} />)
      expect(screen.getByText('Resumen de respuestas')).toBeInTheDocument()
    })

    it('should show all questions', () => {
      render(<QuizResult {...defaultProps} />)
      expect(screen.getByText(/Question 1/)).toBeInTheDocument()
      expect(screen.getByText(/Question 2/)).toBeInTheDocument()
    })

    it('should show correct answer for wrong questions', () => {
      render(<QuizResult {...defaultProps} answers={[0, 0]} />)
      expect(screen.getByText(/Respuesta correcta: B/)).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('should call onRetry when retry button is clicked', () => {
      const onRetry = vi.fn()
      render(<QuizResult {...defaultProps} passed={false} onRetry={onRetry} />)
      fireEvent.click(screen.getByRole('button', { name: /intentar/i }))
      expect(onRetry).toHaveBeenCalled()
    })

    it('should call onContinue when continue button is clicked', () => {
      const onContinue = vi.fn()
      render(<QuizResult {...defaultProps} onContinue={onContinue} />)
      fireEvent.click(screen.getByRole('button', { name: /continuar/i }))
      expect(onContinue).toHaveBeenCalled()
    })
  })
})
