import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('rendering', () => {
    it('should render dashboard link', () => {
      render(<Sidebar />)
      expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
    })

    it('should render modules section', () => {
      render(<Sidebar />)
      expect(screen.getByText('Módulos')).toBeInTheDocument()
    })

    it('should render module links', () => {
      render(<Sidebar />)
      // Check that modules are rendered (at least the first few)
      const links = screen.getAllByRole('link')
      // Dashboard + 12 modules = 13 links minimum
      expect(links.length).toBeGreaterThanOrEqual(13)
    })

    it('should render version footer', () => {
      render(<Sidebar />)
      expect(screen.getByText('v0.8.0')).toBeInTheDocument()
    })
  })

  describe('module status', () => {
    it('should show first module as available', () => {
      render(<Sidebar />)
      // First module should be available (not locked)
      const moduleLinks = screen.getAllByRole('link')
      // The second link should be module 1 (first is Dashboard)
      const firstModuleLink = moduleLinks[1]
      expect(firstModuleLink).not.toHaveClass('cursor-not-allowed')
    })

    it('should show locked modules with lock icon', () => {
      render(<Sidebar />)
      // Module 2 requires 100 XP, so it should be locked initially
      const moduleLinks = screen.getAllByRole('link')
      const lockedModules = moduleLinks.filter(
        (link) => link.className.includes('cursor-not-allowed')
      )
      expect(lockedModules.length).toBeGreaterThan(0)
    })
  })
})
