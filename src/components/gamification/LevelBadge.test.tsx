import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LevelBadge } from './LevelBadge'
import type { Level } from '../../data/types'

const mockLevel: Level = {
  level: 3,
  name: 'Build Master',
  minXP: 301,
  icon: '🏗️',
  color: 'text-purple-500',
}

describe('LevelBadge', () => {
  describe('default variant', () => {
    it('should render level icon', () => {
      render(<LevelBadge level={mockLevel} />)
      expect(screen.getByText('🏗️')).toBeInTheDocument()
    })

    it('should render level number with Lvl prefix', () => {
      render(<LevelBadge level={mockLevel} />)
      expect(screen.getByText('Lvl 3')).toBeInTheDocument()
    })

    it('should show name when showName is true', () => {
      render(<LevelBadge level={mockLevel} showName={true} />)
      expect(screen.getByText('Build Master')).toBeInTheDocument()
    })

    it('should hide name when showName is false', () => {
      render(<LevelBadge level={mockLevel} showName={false} />)
      expect(screen.queryByText('Build Master')).not.toBeInTheDocument()
    })
  })

  describe('minimal variant', () => {
    it('should render only icon and level number', () => {
      render(<LevelBadge level={mockLevel} variant="minimal" />)
      expect(screen.getByText('🏗️')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('should not show Lvl prefix in minimal variant', () => {
      render(<LevelBadge level={mockLevel} variant="minimal" />)
      expect(screen.queryByText('Lvl 3')).not.toBeInTheDocument()
    })
  })

  describe('sizes', () => {
    it('should render sm size', () => {
      render(<LevelBadge level={mockLevel} size="sm" />)
      expect(screen.getByText('🏗️')).toBeInTheDocument()
    })

    it('should render md size', () => {
      render(<LevelBadge level={mockLevel} size="md" />)
      expect(screen.getByText('🏗️')).toBeInTheDocument()
    })

    it('should render lg size', () => {
      render(<LevelBadge level={mockLevel} size="lg" />)
      expect(screen.getByText('🏗️')).toBeInTheDocument()
    })
  })
})
