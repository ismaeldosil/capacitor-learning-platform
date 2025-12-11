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

    it('should render all module links', () => {
      render(<Sidebar />)
      expect(screen.getByText('Setup + Fundamentos Capacitor')).toBeInTheDocument()
      expect(screen.getByText('Plugins Core + Web-to-Native Bridge')).toBeInTheDocument()
      expect(screen.getByText('Desarrollo + Build Processes')).toBeInTheDocument()
      expect(screen.getByText('Testing + App Store Preparation')).toBeInTheDocument()
    })

    it('should render version footer', () => {
      render(<Sidebar />)
      expect(screen.getByText('v0.1.0')).toBeInTheDocument()
    })
  })

  describe('module status', () => {
    it('should show first module as available', () => {
      render(<Sidebar />)
      const firstModuleLink = screen.getByText('Setup + Fundamentos Capacitor').closest('a')
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
