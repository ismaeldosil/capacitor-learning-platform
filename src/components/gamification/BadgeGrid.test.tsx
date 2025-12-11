import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BadgeGrid } from './BadgeGrid'
import { BADGES } from '../../data/constants'

describe('BadgeGrid', () => {
  describe('rendering', () => {
    it('should render all badges', () => {
      render(<BadgeGrid userBadges={[]} />)
      // Each badge should be rendered
      expect(screen.getAllByRole('button').length).toBe(BADGES.length)
    })

    it('should show progress header', () => {
      render(<BadgeGrid userBadges={['first-launch']} showProgress={true} />)
      expect(screen.getByText(/Logros/)).toBeInTheDocument()
    })

    it('should hide progress header when showProgress is false', () => {
      render(<BadgeGrid userBadges={[]} showProgress={false} />)
      expect(screen.queryByText(/Logros/)).not.toBeInTheDocument()
    })
  })

  describe('progress calculation', () => {
    it('should show correct count', () => {
      render(<BadgeGrid userBadges={['first-launch', 'on-fire']} />)
      expect(screen.getByText(`Logros (2/${BADGES.length})`)).toBeInTheDocument()
    })
  })

  describe('modal', () => {
    it('should open modal when badge is clicked', () => {
      render(<BadgeGrid userBadges={['first-launch']} />)

      const firstBadgeButton = screen.getAllByRole('button')[0]
      fireEvent.click(firstBadgeButton!)

      // Modal should show the badge description
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('columns', () => {
    it('should render with 4 columns by default', () => {
      render(<BadgeGrid userBadges={[]} columns={4} />)
      expect(screen.getAllByRole('button').length).toBe(BADGES.length)
    })

    it('should render with 8 columns', () => {
      render(<BadgeGrid userBadges={[]} columns={8} />)
      expect(screen.getAllByRole('button').length).toBe(BADGES.length)
    })
  })
})
