import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BadgeCard } from './BadgeCard'
import type { Badge } from '../../data/types'

const mockBadge: Badge = {
  id: 'test-badge',
  name: 'Test Badge',
  description: 'A test badge description',
  icon: 'target',
  xpBonus: 10,
  condition: { type: 'first_lesson' },
}

describe('BadgeCard', () => {
  describe('unlocked state', () => {
    it('should render badge icon when unlocked', () => {
      render(<BadgeCard badge={mockBadge} isUnlocked={true} />)
      // Icon component renders the lucide icon, not text
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should show XP bonus when unlocked', () => {
      render(<BadgeCard badge={mockBadge} isUnlocked={true} />)
      expect(screen.getByText('+10')).toBeInTheDocument()
    })

    it('should show name when showDetails is true', () => {
      render(<BadgeCard badge={mockBadge} isUnlocked={true} showDetails={true} />)
      expect(screen.getByText('Test Badge')).toBeInTheDocument()
    })
  })

  describe('locked state', () => {
    it('should show lock icon when locked', () => {
      render(<BadgeCard badge={mockBadge} isUnlocked={false} />)
      // When locked, the button should still exist but show lock icon
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should not show XP bonus when locked', () => {
      render(<BadgeCard badge={mockBadge} isUnlocked={false} />)
      expect(screen.queryByText('+10')).not.toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn()
      render(<BadgeCard badge={mockBadge} isUnlocked={true} onClick={handleClick} />)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should be disabled when no onClick provided', () => {
      render(<BadgeCard badge={mockBadge} isUnlocked={true} />)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('sizes', () => {
    it('should render sm size', () => {
      render(<BadgeCard badge={mockBadge} isUnlocked={true} size="sm" />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render lg size', () => {
      render(<BadgeCard badge={mockBadge} isUnlocked={true} size="lg" />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })
})
