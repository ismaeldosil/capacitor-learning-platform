import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QuizProgress } from './QuizProgress'

describe('QuizProgress', () => {
  const defaultProps = {
    currentQuestion: 0,
    totalQuestions: 10,
    answers: [],
  }

  describe('progress bar', () => {
    it('should show current question number', () => {
      render(<QuizProgress {...defaultProps} currentQuestion={2} />)
      expect(screen.getByText('Pregunta 3 de 10')).toBeInTheDocument()
    })

    it('should show correct percentage', () => {
      render(<QuizProgress {...defaultProps} currentQuestion={4} />)
      expect(screen.getByText('50%')).toBeInTheDocument()
    })
  })

  describe('question indicators', () => {
    it('should render all question indicators', () => {
      render(<QuizProgress {...defaultProps} totalQuestions={5} />)
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should mark answered questions', () => {
      render(
        <QuizProgress
          {...defaultProps}
          totalQuestions={3}
          answers={[1, 2]}
        />
      )
      // Answered questions show a circle instead of number
      expect(screen.queryByText('1')).not.toBeInTheDocument()
      expect(screen.queryByText('2')).not.toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  describe('results mode', () => {
    it('should show correct/incorrect indicators when showResults is true', () => {
      render(
        <QuizProgress
          {...defaultProps}
          totalQuestions={3}
          answers={[1, 2, 0]}
          showResults={true}
          correctAnswers={[true, false, true]}
        />
      )
      // Check for X indicator for incorrect
      expect(screen.getByText('X')).toBeInTheDocument()
    })
  })
})
