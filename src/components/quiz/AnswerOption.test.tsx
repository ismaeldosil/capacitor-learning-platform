import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AnswerOption } from './AnswerOption'

describe('AnswerOption', () => {
  const defaultProps = {
    text: 'Option text',
    index: 0,
    isSelected: false,
    showResult: false,
    disabled: false,
    onSelect: vi.fn(),
  }

  describe('rendering', () => {
    it('should render option text', () => {
      render(<AnswerOption {...defaultProps} />)
      expect(screen.getByText('Option text')).toBeInTheDocument()
    })

    it('should render option label (A, B, C, D)', () => {
      render(<AnswerOption {...defaultProps} index={0} />)
      expect(screen.getByText('A')).toBeInTheDocument()
    })

    it('should render B for index 1', () => {
      render(<AnswerOption {...defaultProps} index={1} />)
      expect(screen.getByText('B')).toBeInTheDocument()
    })
  })

  describe('selection', () => {
    it('should call onSelect when clicked', () => {
      const onSelect = vi.fn()
      render(<AnswerOption {...defaultProps} onSelect={onSelect} />)
      fireEvent.click(screen.getByRole('option'))
      expect(onSelect).toHaveBeenCalled()
    })

    it('should not call onSelect when disabled', () => {
      const onSelect = vi.fn()
      render(<AnswerOption {...defaultProps} onSelect={onSelect} disabled={true} />)
      fireEvent.click(screen.getByRole('option'))
      expect(onSelect).not.toHaveBeenCalled()
    })

    it('should have aria-selected when selected', () => {
      render(<AnswerOption {...defaultProps} isSelected={true} />)
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('result display', () => {
    it('should show Correcto for correct answer', () => {
      render(
        <AnswerOption
          {...defaultProps}
          isSelected={true}
          isCorrect={true}
          showResult={true}
        />
      )
      expect(screen.getByText('Correcto')).toBeInTheDocument()
    })

    it('should show Incorrecto for wrong answer', () => {
      render(
        <AnswerOption
          {...defaultProps}
          isSelected={true}
          isCorrect={false}
          showResult={true}
        />
      )
      expect(screen.getByText('Incorrecto')).toBeInTheDocument()
    })

    it('should show check icon for correct', () => {
      render(
        <AnswerOption
          {...defaultProps}
          isCorrect={true}
          showResult={true}
        />
      )
      // Check icon replaces the label
      expect(screen.queryByText('A')).not.toBeInTheDocument()
    })
  })
})
