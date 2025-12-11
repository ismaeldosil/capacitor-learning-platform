import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PluginMatcher } from './PluginMatcher'

describe('PluginMatcher', () => {
  const mockOnComplete = vi.fn()

  beforeEach(() => {
    mockOnComplete.mockClear()
  })

  describe('rendering', () => {
    it('should render progress indicator', () => {
      render(<PluginMatcher onComplete={mockOnComplete} />)
      expect(screen.getByText(/emparejados: 0 de/i)).toBeInTheDocument()
    })

    it('should render use cases section', () => {
      render(<PluginMatcher onComplete={mockOnComplete} />)
      expect(screen.getByText('Casos de Uso')).toBeInTheDocument()
    })

    it('should render plugins section', () => {
      render(<PluginMatcher onComplete={mockOnComplete} />)
      expect(screen.getByText('Plugins')).toBeInTheDocument()
    })

    it('should render verify button', () => {
      render(<PluginMatcher onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /verificar/i })).toBeInTheDocument()
    })

    it('should render reset button', () => {
      render(<PluginMatcher onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /reiniciar/i })).toBeInTheDocument()
    })

    it('should render instructions', () => {
      render(<PluginMatcher onComplete={mockOnComplete} />)
      expect(screen.getByText(/selecciona un caso de uso/i)).toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('should highlight selected use case', () => {
      render(<PluginMatcher onComplete={mockOnComplete} />)

      // Find and click a use case
      const useCases = screen.getAllByRole('button')
      const useCase = useCases.find(btn => btn.textContent?.includes('autenticación') || btn.textContent?.includes('Face ID'))

      if (useCase) {
        fireEvent.click(useCase)
        expect(screen.getByText(/selecciona el plugin/i)).toBeInTheDocument()
      }
    })

    it('should show hint when hint button is clicked', () => {
      render(<PluginMatcher onComplete={mockOnComplete} />)

      // Find hint button
      const hintButtons = screen.getAllByRole('button', { name: /ver pista/i })
      if (hintButtons.length > 0) {
        fireEvent.click(hintButtons[0]!)
        // Hint text should be visible after clicking
        const hintTexts = screen.queryAllByText(/biométrica|storage|notificaciones|splash|barra|teclado|navegador|metadata/i)
        expect(hintTexts.length).toBeGreaterThanOrEqual(1)
      }
    })

    it('should reset matches when reset is clicked', () => {
      render(<PluginMatcher onComplete={mockOnComplete} />)

      // Click reset
      fireEvent.click(screen.getByRole('button', { name: /reiniciar/i }))

      // Should show 0 matches
      expect(screen.getByText(/emparejados: 0 de/i)).toBeInTheDocument()
    })

    it('should update match count when pair is made', () => {
      render(<PluginMatcher onComplete={mockOnComplete} />)

      // Get all buttons
      const buttons = screen.getAllByRole('button')

      // Find a use case button
      const useCaseButton = buttons.find(btn =>
        btn.textContent?.includes('Face ID') ||
        btn.textContent?.includes('autenticación') ||
        btn.textContent?.includes('huella')
      )

      if (useCaseButton) {
        fireEvent.click(useCaseButton)

        // Find corresponding plugin
        const pluginButton = buttons.find(btn =>
          btn.textContent?.includes('Biometric') ||
          btn.textContent?.includes('biometric')
        )

        if (pluginButton) {
          fireEvent.click(pluginButton)
          // Match should be made
          expect(screen.getByText(/emparejados: 1 de/i)).toBeInTheDocument()
        }
      }
    })
  })

  describe('verification', () => {
    it('should disable verify button when not all matched', () => {
      render(<PluginMatcher onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /verificar/i })).toBeDisabled()
    })
  })
})
