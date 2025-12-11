import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRoute } from '../test/test-utils'
import { Module } from './Module'

describe('Module', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('valid module', () => {
    it('should render module title', () => {
      renderWithRoute(<Module />, {
        route: '/module/module-1',
        path: '/module/:moduleId',
      })
      expect(screen.getByRole('heading', { name: /setup \+ fundamentos capacitor/i })).toBeInTheDocument()
    })

    it('should render back link', () => {
      renderWithRoute(<Module />, {
        route: '/module/module-1',
        path: '/module/:moduleId',
      })
      expect(screen.getByText(/volver al dashboard/i)).toBeInTheDocument()
    })

    it('should render lessons section', () => {
      renderWithRoute(<Module />, {
        route: '/module/module-1',
        path: '/module/:moduleId',
      })
      expect(screen.getByText('Lecciones')).toBeInTheDocument()
    })

    it('should render all module lessons', () => {
      renderWithRoute(<Module />, {
        route: '/module/module-1',
        path: '/module/:moduleId',
      })
      expect(screen.getByText('¿Qué es Capacitor?')).toBeInTheDocument()
      expect(screen.getByText('Arquitectura')).toBeInTheDocument()
    })

    it('should render quiz section', () => {
      renderWithRoute(<Module />, {
        route: '/module/module-1',
        path: '/module/:moduleId',
      })
      expect(screen.getByText('Evaluación')).toBeInTheDocument()
      expect(screen.getByText('Quiz del Módulo')).toBeInTheDocument()
    })

    it('should render game section', () => {
      renderWithRoute(<Module />, {
        route: '/module/module-1',
        path: '/module/:moduleId',
      })
      expect(screen.getByText('Mini-Juego')).toBeInTheDocument()
    })
  })

  describe('invalid module', () => {
    it('should redirect to home for non-existent module', () => {
      renderWithRoute(<Module />, {
        route: '/module/invalid-module',
        path: '/module/:moduleId',
      })
      expect(screen.getByText('Home')).toBeInTheDocument()
    })
  })
})
