import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatsPanel, CompactStats } from './StatsPanel'

const defaultProps = {
  xp: 450,
  level: 3,
  levelName: 'Build Master',
  streak: 7,
  completedLessons: 15,
  totalLessons: 30,
  completedQuizzes: 5,
  badges: 8,
  totalBadges: 20,
}

describe('StatsPanel', () => {
  describe('rendering', () => {
    it('should render XP total', () => {
      render(<StatsPanel {...defaultProps} />)
      expect(screen.getByText('450')).toBeInTheDocument()
      expect(screen.getByText('XP Total')).toBeInTheDocument()
    })

    it('should render level', () => {
      render(<StatsPanel {...defaultProps} />)
      expect(screen.getByText('Lvl 3')).toBeInTheDocument()
      expect(screen.getByText('Nivel')).toBeInTheDocument()
    })

    it('should render level name as subvalue', () => {
      render(<StatsPanel {...defaultProps} />)
      expect(screen.getByText('Build Master')).toBeInTheDocument()
    })

    it('should render streak', () => {
      render(<StatsPanel {...defaultProps} />)
      expect(screen.getByText('7 días')).toBeInTheDocument()
      expect(screen.getByText('Racha')).toBeInTheDocument()
    })

    it('should render progress percentage', () => {
      render(<StatsPanel {...defaultProps} />)
      expect(screen.getByText('50%')).toBeInTheDocument()
      expect(screen.getByText('Progreso')).toBeInTheDocument()
    })

    it('should render lessons count as subvalue', () => {
      render(<StatsPanel {...defaultProps} />)
      expect(screen.getByText('15/30 lecciones')).toBeInTheDocument()
    })

    it('should render quizzes completed', () => {
      render(<StatsPanel {...defaultProps} />)
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('Quizzes')).toBeInTheDocument()
    })

    it('should render badges count', () => {
      render(<StatsPanel {...defaultProps} />)
      expect(screen.getByText('8/20')).toBeInTheDocument()
      expect(screen.getByText('Logros')).toBeInTheDocument()
    })
  })

  describe('layout', () => {
    it('should render with grid layout by default', () => {
      render(<StatsPanel {...defaultProps} />)
      expect(screen.getByText('XP Total')).toBeInTheDocument()
    })

    it('should render with row layout when specified', () => {
      render(<StatsPanel {...defaultProps} layout="row" />)
      expect(screen.getByText('XP Total')).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('should handle zero streak', () => {
      render(<StatsPanel {...defaultProps} streak={0} />)
      expect(screen.getByText('0 días')).toBeInTheDocument()
    })

    it('should format large XP numbers', () => {
      render(<StatsPanel {...defaultProps} xp={1500} />)
      expect(screen.getByText('1,500')).toBeInTheDocument()
    })
  })
})

describe('CompactStats', () => {
  it('should render XP', () => {
    render(<CompactStats xp={500} streak={3} progress={75} />)
    expect(screen.getByText('500')).toBeInTheDocument()
  })

  it('should render streak', () => {
    render(<CompactStats xp={500} streak={3} progress={75} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should render progress percentage', () => {
    render(<CompactStats xp={500} streak={3} progress={75} />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })
})
