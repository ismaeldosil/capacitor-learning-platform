import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { XPBar } from './XPBar'
import type { Level } from '../../data/types'

const mockCurrentLevel: Level = {
  level: 2,
  name: 'Plugin Explorer',
  minXP: 101,
  maxXP: 300,
  icon: 'plug',
  color: 'text-blue-500',
}

const mockNextLevel: Level = {
  level: 3,
  name: 'Build Master',
  minXP: 301,
  maxXP: 600,
  icon: 'hammer',
  color: 'text-purple-500',
}

describe('XPBar', () => {
  describe('rendering', () => {
    it('should render current XP', () => {
      render(
        <XPBar
          currentXP={150}
          currentLevel={mockCurrentLevel}
          nextLevel={mockNextLevel}
          xpProgress={25}
        />
      )
      expect(screen.getByText('150 XP')).toBeInTheDocument()
    })

    it('should render current level name', () => {
      render(
        <XPBar
          currentXP={150}
          currentLevel={mockCurrentLevel}
          nextLevel={mockNextLevel}
          xpProgress={25}
        />
      )
      expect(screen.getByText('Plugin Explorer')).toBeInTheDocument()
    })

    it('should render level number', () => {
      render(
        <XPBar
          currentXP={150}
          currentLevel={mockCurrentLevel}
          nextLevel={mockNextLevel}
          xpProgress={25}
        />
      )
      expect(screen.getByText('Nivel 2')).toBeInTheDocument()
    })

    it('should show XP needed for next level', () => {
      render(
        <XPBar
          currentXP={150}
          currentLevel={mockCurrentLevel}
          nextLevel={mockNextLevel}
          xpProgress={25}
        />
      )
      expect(screen.getByText('151 XP para Build Master')).toBeInTheDocument()
    })
  })

  describe('max level', () => {
    it('should show max level message when nextLevel is null', () => {
      render(
        <XPBar
          currentXP={1500}
          currentLevel={mockCurrentLevel}
          nextLevel={null}
          xpProgress={100}
        />
      )
      expect(screen.getByText(/nivel maximo alcanzado/i)).toBeInTheDocument()
    })
  })

  describe('details visibility', () => {
    it('should hide details when showDetails is false', () => {
      render(
        <XPBar
          currentXP={150}
          currentLevel={mockCurrentLevel}
          nextLevel={mockNextLevel}
          xpProgress={25}
          showDetails={false}
        />
      )
      expect(screen.queryByText('Plugin Explorer')).not.toBeInTheDocument()
      expect(screen.queryByText('150 XP')).not.toBeInTheDocument()
    })
  })

  describe('sizes', () => {
    it('should render sm size', () => {
      render(
        <XPBar
          currentXP={150}
          currentLevel={mockCurrentLevel}
          nextLevel={mockNextLevel}
          xpProgress={25}
          size="sm"
        />
      )
      expect(screen.getByText('150 XP')).toBeInTheDocument()
    })

    it('should render lg size', () => {
      render(
        <XPBar
          currentXP={150}
          currentLevel={mockCurrentLevel}
          nextLevel={mockNextLevel}
          xpProgress={25}
          size="lg"
        />
      )
      expect(screen.getByText('150 XP')).toBeInTheDocument()
    })
  })
})
