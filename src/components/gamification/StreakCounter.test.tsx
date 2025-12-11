import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StreakCounter } from './StreakCounter'

describe('StreakCounter', () => {
  describe('rendering', () => {
    it('should render streak count', () => {
      render(<StreakCounter streak={5} />)
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should show days label for multiple days', () => {
      render(<StreakCounter streak={5} />)
      expect(screen.getByText('días')).toBeInTheDocument()
    })

    it('should show día label for one day', () => {
      render(<StreakCounter streak={1} />)
      expect(screen.getByText('día')).toBeInTheDocument()
    })
  })

  describe('bonus XP', () => {
    it('should show bonus when showBonus is true and bonusXP > 0', () => {
      render(<StreakCounter streak={3} showBonus={true} bonusXP={20} />)
      expect(screen.getByText('+20 XP')).toBeInTheDocument()
    })

    it('should not show bonus when bonusXP is 0', () => {
      render(<StreakCounter streak={1} showBonus={true} bonusXP={0} />)
      expect(screen.queryByText(/\+.*XP/)).not.toBeInTheDocument()
    })

    it('should not show bonus when showBonus is false', () => {
      render(<StreakCounter streak={3} showBonus={false} bonusXP={20} />)
      expect(screen.queryByText('+20 XP')).not.toBeInTheDocument()
    })
  })

  describe('risk warning', () => {
    it('should show warning when isAtRisk is true', () => {
      render(<StreakCounter streak={3} isAtRisk={true} />)
      expect(screen.getByText('¡No pierdas tu racha!')).toBeInTheDocument()
    })

    it('should not show warning when isAtRisk is false', () => {
      render(<StreakCounter streak={3} isAtRisk={false} />)
      expect(screen.queryByText('¡No pierdas tu racha!')).not.toBeInTheDocument()
    })
  })

  describe('sizes', () => {
    it('should render sm size', () => {
      render(<StreakCounter streak={5} size="sm" />)
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should render lg size', () => {
      render(<StreakCounter streak={5} size="lg" />)
      expect(screen.getByText('5')).toBeInTheDocument()
    })
  })

  describe('compact variant', () => {
    it('should render compact variant', () => {
      render(<StreakCounter streak={5} variant="compact" />)
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.queryByText('días')).not.toBeInTheDocument()
    })
  })
})
