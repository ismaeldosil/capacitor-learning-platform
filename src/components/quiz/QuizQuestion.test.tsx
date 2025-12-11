import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizQuestion } from './QuizQuestion'
import type { QuizQuestion as QuizQuestionType } from '../../data/types'

const mockQuestion: QuizQuestionType = {
  id: 'q1',
  text: 'What is Capacitor?',
  options: ['A framework', 'A runtime', 'A database', 'A language'],
  correctIndex: 1,
  explanation: 'Capacitor is a native runtime.',
}

describe('QuizQuestion', () => {
  const defaultProps = {
    question: mockQuestion,
    questionNumber: 1,
    totalQuestions: 10,
    selectedAnswer: null,
    onSelectAnswer: vi.fn(),
    onNext: vi.fn(),
  }

  describe('rendering', () => {
    it('should render question text', () => {
      render(<QuizQuestion {...defaultProps} />)
      expect(screen.getByText('What is Capacitor?')).toBeInTheDocument()
    })

    it('should render all options', () => {
      render(<QuizQuestion {...defaultProps} />)
      expect(screen.getByText('A framework')).toBeInTheDocument()
      expect(screen.getByText('A runtime')).toBeInTheDocument()
      expect(screen.getByText('A database')).toBeInTheDocument()
      expect(screen.getByText('A language')).toBeInTheDocument()
    })

    it('should show question number', () => {
      render(<QuizQuestion {...defaultProps} questionNumber={5} />)
      expect(screen.getByText('Pregunta 5 de 10')).toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('should call onSelectAnswer when option is clicked', () => {
      const onSelectAnswer = vi.fn()
      render(<QuizQuestion {...defaultProps} onSelectAnswer={onSelectAnswer} />)
      fireEvent.click(screen.getByText('A runtime'))
      expect(onSelectAnswer).toHaveBeenCalledWith(1)
    })

    it('should disable verify button when no answer selected', () => {
      render(<QuizQuestion {...defaultProps} selectedAnswer={null} />)
      expect(screen.getByRole('button', { name: /verificar/i })).toBeDisabled()
    })

    it('should enable verify button when answer is selected', () => {
      render(<QuizQuestion {...defaultProps} selectedAnswer={1} />)
      expect(screen.getByRole('button', { name: /verificar/i })).not.toBeDisabled()
    })
  })

  describe('explanation', () => {
    it('should show explanation after verifying', () => {
      render(<QuizQuestion {...defaultProps} selectedAnswer={1} />)
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))
      expect(screen.getByText('Capacitor is a native runtime.')).toBeInTheDocument()
    })

    it('should show Correcto for correct answer', () => {
      render(<QuizQuestion {...defaultProps} selectedAnswer={1} />)
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))
      expect(screen.getByText('¡Correcto!')).toBeInTheDocument()
    })

    it('should show Respuesta incorrecta for wrong answer', () => {
      render(<QuizQuestion {...defaultProps} selectedAnswer={0} />)
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))
      expect(screen.getByText('Respuesta incorrecta')).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('should show Siguiente pregunta button after verifying', () => {
      render(<QuizQuestion {...defaultProps} selectedAnswer={1} />)
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument()
    })

    it('should show Ver resultados on last question', () => {
      render(
        <QuizQuestion
          {...defaultProps}
          selectedAnswer={1}
          questionNumber={10}
          totalQuestions={10}
        />
      )
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))
      expect(screen.getByRole('button', { name: /resultados/i })).toBeInTheDocument()
    })

    it('should call onNext when next button is clicked', () => {
      const onNext = vi.fn()
      render(<QuizQuestion {...defaultProps} selectedAnswer={1} onNext={onNext} />)
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))
      fireEvent.click(screen.getByRole('button', { name: /siguiente/i }))
      expect(onNext).toHaveBeenCalled()
    })
  })
})
