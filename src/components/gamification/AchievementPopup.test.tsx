import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { AchievementPopup } from './AchievementPopup'
import type { Badge } from '../../data/types'

const mockBadge: Badge = {
  id: 'test-badge',
  name: 'Test Achievement',
  description: 'You earned this test badge',
  icon: '🏆',
  xpBonus: 50,
  condition: { type: 'first_lesson' },
}

describe('AchievementPopup', () => {
  describe('rendering', () => {
    it('should render badge name', () => {
      render(<AchievementPopup badge={mockBadge} onClose={vi.fn()} autoCloseDelay={0} />)
      expect(screen.getByText('Test Achievement')).toBeInTheDocument()
    })

    it('should render badge description', () => {
      render(<AchievementPopup badge={mockBadge} onClose={vi.fn()} autoCloseDelay={0} />)
      expect(screen.getByText('You earned this test badge')).toBeInTheDocument()
    })

    it('should render badge icon', () => {
      render(<AchievementPopup badge={mockBadge} onClose={vi.fn()} autoCloseDelay={0} />)
      expect(screen.getByText('🏆')).toBeInTheDocument()
    })

    it('should render XP bonus', () => {
      render(<AchievementPopup badge={mockBadge} onClose={vi.fn()} autoCloseDelay={0} />)
      expect(screen.getByText('+50 XP')).toBeInTheDocument()
    })

    it('should render achievement unlocked text', () => {
      render(<AchievementPopup badge={mockBadge} onClose={vi.fn()} autoCloseDelay={0} />)
      expect(screen.getByText('¡Logro Desbloqueado!')).toBeInTheDocument()
    })

    it('should not render when badge is null', () => {
      const { container } = render(<AchievementPopup badge={null} onClose={vi.fn()} />)
      expect(container.firstChild).toBeNull()
    })

    it('should not render XP bonus when xpBonus is 0', () => {
      const badgeNoXP = { ...mockBadge, xpBonus: 0 }
      render(<AchievementPopup badge={badgeNoXP} onClose={vi.fn()} autoCloseDelay={0} />)
      expect(screen.queryByText(/\+.*XP/)).not.toBeInTheDocument()
    })
  })

  describe('close behavior', () => {
    it('should have close button', () => {
      render(<AchievementPopup badge={mockBadge} onClose={vi.fn()} autoCloseDelay={0} />)
      const closeButton = screen.getByRole('button', { name: 'Cerrar' })
      expect(closeButton).toBeInTheDocument()
    })

    it('should call onClose when close button is clicked', async () => {
      vi.useFakeTimers()
      const onClose = vi.fn()
      render(<AchievementPopup badge={mockBadge} onClose={onClose} autoCloseDelay={0} />)

      const closeButton = screen.getByRole('button', { name: 'Cerrar' })
      fireEvent.click(closeButton)

      await act(async () => {
        vi.advanceTimersByTime(300)
      })

      expect(onClose).toHaveBeenCalledTimes(1)
      vi.useRealTimers()
    })

    it('should not auto close when autoCloseDelay is 0', () => {
      const onClose = vi.fn()
      render(<AchievementPopup badge={mockBadge} onClose={onClose} autoCloseDelay={0} />)
      expect(onClose).not.toHaveBeenCalled()
    })
  })
})
