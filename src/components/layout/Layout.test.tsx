import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { Layout } from './Layout'

// Mock window.scrollTo
vi.stubGlobal('scrollTo', vi.fn())

describe('Layout', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('rendering', () => {
    it('should render Navbar', () => {
      render(<Layout />)
      expect(screen.getByText('Capacitor Learning')).toBeInTheDocument()
    })

    it('should render Sidebar', () => {
      render(<Layout />)
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })

    it('should render main content area', () => {
      render(<Layout />)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  describe('scroll behavior', () => {
    it('should scroll to top on mount', () => {
      render(<Layout />)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
  })
})
