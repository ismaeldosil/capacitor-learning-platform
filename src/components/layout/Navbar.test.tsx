import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('rendering', () => {
    it('should render logo', () => {
      render(<Navbar />)
      expect(screen.getByText('Capacitor Learning')).toBeInTheDocument()
    })

    it('should render user streak', () => {
      render(<Navbar />)
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('should render user XP', () => {
      render(<Navbar />)
      expect(screen.getByText('0 XP')).toBeInTheDocument()
    })

    it('should render level badge', () => {
      render(<Navbar />)
      expect(screen.getByText('Lvl 1')).toBeInTheDocument()
    })
  })
})
