import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRoute } from '../test/test-utils'
import { Quiz } from './Quiz'

describe('Quiz', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('without completed lessons', () => {
    it('should not render quiz content when lessons not completed', () => {
      renderWithRoute(<Quiz />, {
        route: '/quiz/module-1',
        path: '/quiz/:moduleId',
      })
      // Navigate redirect doesn't actually navigate in tests, but the component returns null
      expect(screen.queryByText(/quiz.*module/i)).not.toBeInTheDocument()
    })
  })

  describe('invalid module', () => {
    it('should not render quiz content for non-existent module', () => {
      renderWithRoute(<Quiz />, {
        route: '/quiz/invalid-module',
        path: '/quiz/:moduleId',
      })
      expect(screen.queryByText(/quiz.*module/i)).not.toBeInTheDocument()
    })
  })
})
