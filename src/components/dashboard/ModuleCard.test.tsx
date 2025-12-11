import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ModuleCard } from './ModuleCard'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

const defaultProps = {
  id: 'module-1',
  title: 'Introducción a Capacitor',
  description: 'Aprende los fundamentos de Capacitor',
  icon: '🚀',
  status: 'available' as const,
  progress: 50,
  lessonsCompleted: 3,
  totalLessons: 6,
}

describe('ModuleCard', () => {
  describe('rendering', () => {
    it('should render module title', () => {
      renderWithRouter(<ModuleCard {...defaultProps} />)
      expect(screen.getByText('Introducción a Capacitor')).toBeInTheDocument()
    })

    it('should render module description', () => {
      renderWithRouter(<ModuleCard {...defaultProps} />)
      expect(screen.getByText('Aprende los fundamentos de Capacitor')).toBeInTheDocument()
    })

    it('should render module icon', () => {
      renderWithRouter(<ModuleCard {...defaultProps} />)
      expect(screen.getByText('🚀')).toBeInTheDocument()
    })

    it('should render lesson count', () => {
      renderWithRouter(<ModuleCard {...defaultProps} />)
      expect(screen.getByText('6 lecciones')).toBeInTheDocument()
    })

    it('should render progress percentage', () => {
      renderWithRouter(<ModuleCard {...defaultProps} />)
      expect(screen.getByText('50%')).toBeInTheDocument()
    })

    it('should render completed lessons count', () => {
      renderWithRouter(<ModuleCard {...defaultProps} />)
      expect(screen.getByText('3/6 completadas')).toBeInTheDocument()
    })

    it('should render estimated time when provided', () => {
      renderWithRouter(<ModuleCard {...defaultProps} estimatedTime="2h" />)
      expect(screen.getByText('2h')).toBeInTheDocument()
    })
  })

  describe('status states', () => {
    it('should show "Comenzar" button for available status', () => {
      renderWithRouter(<ModuleCard {...defaultProps} status="available" />)
      expect(screen.getByText('Comenzar')).toBeInTheDocument()
    })

    it('should show "Continuar" button for in_progress status', () => {
      renderWithRouter(<ModuleCard {...defaultProps} status="in_progress" />)
      expect(screen.getByText('Continuar')).toBeInTheDocument()
    })

    it('should show "Revisar" button for completed status', () => {
      renderWithRouter(<ModuleCard {...defaultProps} status="completed" />)
      expect(screen.getByText('Revisar')).toBeInTheDocument()
    })

    it('should show lock message for locked status', () => {
      renderWithRouter(
        <ModuleCard
          {...defaultProps}
          status="locked"
          requiredXP={500}
          userXP={200}
        />
      )
      expect(screen.getByText('Necesitas 300 XP más para desbloquear')).toBeInTheDocument()
    })

    it('should not show action button for locked status', () => {
      renderWithRouter(<ModuleCard {...defaultProps} status="locked" />)
      expect(screen.queryByText('Comenzar')).not.toBeInTheDocument()
      expect(screen.queryByText('Continuar')).not.toBeInTheDocument()
      expect(screen.queryByText('Revisar')).not.toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('should render as link when not locked', () => {
      renderWithRouter(<ModuleCard {...defaultProps} status="available" />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/module/module-1')
    })

    it('should not render as link when locked', () => {
      renderWithRouter(<ModuleCard {...defaultProps} status="locked" />)
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })
})
