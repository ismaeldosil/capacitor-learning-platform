import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRoute } from '../test/test-utils'
import { Game } from './Game'

describe('Game', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('without completed quiz', () => {
    it('should not render game content when quiz not completed', () => {
      renderWithRoute(<Game />, {
        route: '/game/module-1',
        path: '/game/:moduleId',
      })
      // Navigate redirect doesn't actually navigate in tests
      expect(screen.queryByText(/juego.*desarrollo/i)).not.toBeInTheDocument()
    })
  })

  describe('invalid module', () => {
    it('should not render game content for non-existent module', () => {
      renderWithRoute(<Game />, {
        route: '/game/invalid-module',
        path: '/game/:moduleId',
      })
      expect(screen.queryByText(/command builder/i)).not.toBeInTheDocument()
    })
  })
})
