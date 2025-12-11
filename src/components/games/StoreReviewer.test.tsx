import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StoreReviewer } from './StoreReviewer'

describe('StoreReviewer', () => {
  const mockOnComplete = vi.fn()

  beforeEach(() => {
    mockOnComplete.mockClear()
  })

  describe('rendering', () => {
    it('should render progress indicator', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)
      expect(screen.getByText(/escenario 1 de/i)).toBeInTheDocument()
    })

    it('should render scenario title', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)
      expect(screen.getByText(/app de finanzas/i)).toBeInTheDocument()
    })

    it('should render scenario description', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)
      expect(screen.getByText(/app de banca fue rechazada/i)).toBeInTheDocument()
    })

    it('should render verify button', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /verificar/i })).toBeInTheDocument()
    })

    it('should render issues list', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)
      expect(screen.getByText(/selecciona los problemas/i)).toBeInTheDocument()
    })

    it('should render all issue options', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)
      expect(screen.getByText(/falta política de privacidad/i)).toBeInTheDocument()
      expect(screen.getByText(/permisos de cámara/i)).toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('should toggle issue selection on click', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)

      const issueButton = screen.getByText(/falta política de privacidad/i).closest('button')
      if (issueButton) {
        fireEvent.click(issueButton)
        // Button should be selected (aria-pressed or visual change)
        expect(issueButton).toHaveAttribute('aria-pressed', 'true')
      }
    })

    it('should deselect issue on second click', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)

      const issueButton = screen.getByText(/falta política de privacidad/i).closest('button')
      if (issueButton) {
        fireEvent.click(issueButton) // Select
        fireEvent.click(issueButton) // Deselect
        expect(issueButton).toHaveAttribute('aria-pressed', 'false')
      }
    })

    it('should allow multiple issues to be selected', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)

      const issue1 = screen.getByText(/falta política de privacidad/i).closest('button')
      const issue2 = screen.getByText(/permisos de cámara/i).closest('button')

      if (issue1 && issue2) {
        fireEvent.click(issue1)
        fireEvent.click(issue2)

        expect(issue1).toHaveAttribute('aria-pressed', 'true')
        expect(issue2).toHaveAttribute('aria-pressed', 'true')
      }
    })
  })

  describe('verification', () => {
    it('should disable verify button when no issues selected', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /verificar/i })).toBeDisabled()
    })

    it('should enable verify button when issues selected', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)

      const issueButton = screen.getByText(/falta política de privacidad/i).closest('button')
      if (issueButton) {
        fireEvent.click(issueButton)
      }

      expect(screen.getByRole('button', { name: /verificar/i })).not.toBeDisabled()
    })

    it('should show result after verification', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)

      // Select all correct issues
      const issue1 = screen.getByText(/falta política de privacidad/i).closest('button')
      const issue2 = screen.getByText(/permisos de cámara/i).closest('button')
      const issue3 = screen.getByText(/no declara uso de datos/i).closest('button')

      if (issue1) fireEvent.click(issue1)
      if (issue2) fireEvent.click(issue2)
      if (issue3) fireEvent.click(issue3)

      // Verify
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))

      // Should show result/explanation
      expect(screen.getByText(/explicación/i)).toBeInTheDocument()
    })

    it('should show correct indicator for right selections', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)

      // Select a correct issue
      const issue = screen.getByText(/falta política de privacidad/i).closest('button')
      if (issue) fireEvent.click(issue)

      // Verify
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))

      // Should show Correcto label
      expect(screen.getByText('Correcto')).toBeInTheDocument()
    })

    it('should show legend after verification', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)

      // Select an issue
      const issue = screen.getByText(/falta política de privacidad/i).closest('button')
      if (issue) fireEvent.click(issue)

      // Verify
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))

      // Should show legend
      expect(screen.getByText('Leyenda:')).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('should show next button after verification', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)

      // Select an issue
      const issue = screen.getByText(/falta política de privacidad/i).closest('button')
      if (issue) fireEvent.click(issue)

      // Verify
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))

      // Next button should appear
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument()
    })

    it('should move to next scenario after clicking next', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)

      // Select an issue
      const issue = screen.getByText(/falta política de privacidad/i).closest('button')
      if (issue) fireEvent.click(issue)

      // Verify and go to next
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))
      fireEvent.click(screen.getByRole('button', { name: /siguiente/i }))

      // Should show scenario 2
      expect(screen.getByText(/escenario 2 de/i)).toBeInTheDocument()
      expect(screen.getByText(/app social/i)).toBeInTheDocument()
    })
  })

  describe('completion', () => {
    it('should call onComplete after final scenario', () => {
      render(<StoreReviewer onComplete={mockOnComplete} />)

      // Complete all 4 scenarios
      for (let i = 0; i < 4; i++) {
        // Select first issue and verify
        const issueButtons = screen.getAllByRole('button').filter(btn =>
          btn.getAttribute('aria-label') &&
          !btn.getAttribute('aria-label')?.includes('Verificar') &&
          !btn.getAttribute('aria-label')?.includes('Siguiente') &&
          !btn.getAttribute('aria-label')?.includes('Reiniciar')
        )

        if (issueButtons[0]) {
          fireEvent.click(issueButtons[0])
        }

        fireEvent.click(screen.getByRole('button', { name: /verificar/i }))

        if (i < 3) {
          fireEvent.click(screen.getByRole('button', { name: /siguiente/i }))
        } else {
          fireEvent.click(screen.getByRole('button', { name: /ver resultados/i }))
        }
      }

      expect(mockOnComplete).toHaveBeenCalled()
    })
  })
})
