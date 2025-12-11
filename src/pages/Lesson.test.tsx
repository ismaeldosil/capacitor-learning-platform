import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRoute } from '../test/test-utils'
import { Lesson } from './Lesson'

describe('Lesson', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('valid lesson', () => {
    it('should render lesson title', () => {
      renderWithRoute(<Lesson />, {
        route: '/lesson/module-1/what-is-capacitor',
        path: '/lesson/:moduleId/:lessonId',
      })
      expect(screen.getByRole('heading', { level: 1, name: /qué es capacitor/i })).toBeInTheDocument()
    })

    it('should render breadcrumb navigation', () => {
      renderWithRoute(<Lesson />, {
        route: '/lesson/module-1/what-is-capacitor',
        path: '/lesson/:moduleId/:lessonId',
      })
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Setup + Fundamentos Capacitor')).toBeInTheDocument()
    })

    it('should render XP reward', () => {
      renderWithRoute(<Lesson />, {
        route: '/lesson/module-1/what-is-capacitor',
        path: '/lesson/:moduleId/:lessonId',
      })
      expect(screen.getByText('+10 XP')).toBeInTheDocument()
    })

    it('should render lesson position', () => {
      renderWithRoute(<Lesson />, {
        route: '/lesson/module-1/what-is-capacitor',
        path: '/lesson/:moduleId/:lessonId',
      })
      expect(screen.getByText(/lección 1 de/i)).toBeInTheDocument()
    })

    it('should render complete button when not completed', () => {
      renderWithRoute(<Lesson />, {
        route: '/lesson/module-1/what-is-capacitor',
        path: '/lesson/:moduleId/:lessonId',
      })
      expect(screen.getByRole('button', { name: /completar lección/i })).toBeInTheDocument()
    })

    it('should render content placeholder', () => {
      renderWithRoute(<Lesson />, {
        route: '/lesson/module-1/what-is-capacitor',
        path: '/lesson/:moduleId/:lessonId',
      })
      expect(screen.getByText(/capacitor-learning-content/i)).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('should render back button for first lesson', () => {
      renderWithRoute(<Lesson />, {
        route: '/lesson/module-1/what-is-capacitor',
        path: '/lesson/:moduleId/:lessonId',
      })
      expect(screen.getByRole('link', { name: /volver/i })).toBeInTheDocument()
    })

    it('should render previous button for non-first lesson', () => {
      renderWithRoute(<Lesson />, {
        route: '/lesson/module-1/architecture',
        path: '/lesson/:moduleId/:lessonId',
      })
      expect(screen.getByRole('link', { name: /anterior/i })).toBeInTheDocument()
    })
  })

  describe('invalid lesson', () => {
    it('should redirect for non-existent module', () => {
      renderWithRoute(<Lesson />, {
        route: '/lesson/invalid-module/any-lesson',
        path: '/lesson/:moduleId/:lessonId',
      })
      expect(screen.getByText('Home')).toBeInTheDocument()
    })
  })
})
