import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../test/test-utils'
import { Dashboard } from './Dashboard'

describe('Dashboard', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('welcome section', () => {
    it('should render welcome message', () => {
      render(<Dashboard />)
      expect(screen.getByRole('heading', { name: /bienvenido/i })).toBeInTheDocument()
    })

    it('should render user name', () => {
      render(<Dashboard />)
      expect(screen.getByText(/developer/i)).toBeInTheDocument()
    })
  })

  describe('stats section', () => {
    it('should render XP stat card', () => {
      render(<Dashboard />)
      expect(screen.getByText('XP Total')).toBeInTheDocument()
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('should render level stat card', () => {
      render(<Dashboard />)
      expect(screen.getByText('Nivel')).toBeInTheDocument()
      expect(screen.getByText('Capacitor Rookie')).toBeInTheDocument()
    })

    it('should render streak stat card', () => {
      render(<Dashboard />)
      expect(screen.getByText('Racha')).toBeInTheDocument()
      expect(screen.getByText('0 días')).toBeInTheDocument()
    })

    it('should render progress stat card', () => {
      render(<Dashboard />)
      expect(screen.getByText('Progreso')).toBeInTheDocument()
      // There are multiple 0% texts (stat card and module progress bars), so use getAllByText
      const percentElements = screen.getAllByText('0%')
      expect(percentElements.length).toBeGreaterThan(0)
    })
  })

  describe('progress section', () => {
    it('should render overall progress heading', () => {
      render(<Dashboard />)
      expect(screen.getByText('Progreso General')).toBeInTheDocument()
    })

    it('should render lessons completed count', () => {
      render(<Dashboard />)
      expect(screen.getByText(/0 de \d+ lecciones completadas/)).toBeInTheDocument()
    })
  })

  describe('modules section', () => {
    it('should render modules heading', () => {
      render(<Dashboard />)
      expect(screen.getByText('Módulos del Curso')).toBeInTheDocument()
    })

    it('should render all modules', () => {
      render(<Dashboard />)
      expect(screen.getByText('Setup + Fundamentos Capacitor')).toBeInTheDocument()
      expect(screen.getByText('Plugins Core + Web-to-Native Bridge')).toBeInTheDocument()
      expect(screen.getByText('Desarrollo + Build Processes')).toBeInTheDocument()
      expect(screen.getByText('Testing + App Store Preparation')).toBeInTheDocument()
    })
  })

  describe('badges section', () => {
    it('should render badges heading', () => {
      render(<Dashboard />)
      expect(screen.getByText(/logros/i)).toBeInTheDocument()
    })

    it('should render badge names', () => {
      render(<Dashboard />)
      expect(screen.getByText(/first launch/i)).toBeInTheDocument()
      expect(screen.getByText(/speed runner/i)).toBeInTheDocument()
      expect(screen.getByText(/perfect score/i)).toBeInTheDocument()
    })
  })
})
