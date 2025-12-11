import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CommandBuilder } from './CommandBuilder'

describe('CommandBuilder', () => {
  const mockOnComplete = vi.fn()

  beforeEach(() => {
    mockOnComplete.mockClear()
  })

  describe('rendering', () => {
    it('should render challenge instruction', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)
      expect(screen.getByText(/crea un nuevo proyecto/i)).toBeInTheDocument()
    })

    it('should render progress indicator', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)
      expect(screen.getByText(/desafío 1 de/i)).toBeInTheDocument()
    })

    it('should render available parts', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)
      expect(screen.getByText('npx')).toBeInTheDocument()
    })

    it('should render verify button', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /verificar/i })).toBeInTheDocument()
    })

    it('should render reset button', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /reiniciar/i })).toBeInTheDocument()
    })

    it('should render hint button', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /pista/i })).toBeInTheDocument()
    })

    it('should render legend', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)
      expect(screen.getByText('Comando base')).toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('should move part to command area on click', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)
      const npxButton = screen.getByText('npx')
      fireEvent.click(npxButton)

      // Part should now be in the command area (Tu comando section)
      expect(screen.getByText('Tu comando:')).toBeInTheDocument()
    })

    it('should show hint when hint button is clicked', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)
      fireEvent.click(screen.getByRole('button', { name: /pista/i }))

      expect(screen.getByText(/el comando base es/i)).toBeInTheDocument()
    })

    it('should disable hint button after showing hint', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)
      const hintButton = screen.getByRole('button', { name: /pista/i })
      fireEvent.click(hintButton)

      expect(hintButton).toBeDisabled()
    })

    it('should reset parts when reset button is clicked', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)

      // Click a part to add it
      fireEvent.click(screen.getByText('npx'))

      // Reset
      fireEvent.click(screen.getByRole('button', { name: /reiniciar/i }))

      // Part should be back in available parts
      expect(screen.getByText(/arrastra las partes aquí/i)).toBeInTheDocument()
    })
  })

  describe('verification', () => {
    it('should verify button be disabled when no parts arranged', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /verificar/i })).toBeDisabled()
    })

    it('should show result after verification', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)

      // Add some parts (click in correct order for first challenge)
      fireEvent.click(screen.getByText('npx'))
      fireEvent.click(screen.getByText('@capacitor/cli'))
      fireEvent.click(screen.getByText('create'))
      fireEvent.click(screen.getByText('mi-app'))

      // Verify
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))

      // Should show result
      expect(screen.getByText(/correcto|incorrecto/i)).toBeInTheDocument()
    })

    it('should show next button after verification', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)

      // Add parts
      fireEvent.click(screen.getByText('npx'))
      fireEvent.click(screen.getByText('@capacitor/cli'))
      fireEvent.click(screen.getByText('create'))
      fireEvent.click(screen.getByText('mi-app'))

      // Verify
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))

      // Next button should appear
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument()
    })

    it('should show correct answer when wrong', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)

      // Add parts in wrong order
      fireEvent.click(screen.getByText('mi-app'))
      fireEvent.click(screen.getByText('npx'))

      // Verify
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))

      // Should show correct command
      expect(screen.getByText(/comando correcto/i)).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('should move to next challenge after clicking next', () => {
      render(<CommandBuilder onComplete={mockOnComplete} />)

      // Complete first challenge
      fireEvent.click(screen.getByText('npx'))
      fireEvent.click(screen.getByText('@capacitor/cli'))
      fireEvent.click(screen.getByText('create'))
      fireEvent.click(screen.getByText('mi-app'))
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))
      fireEvent.click(screen.getByRole('button', { name: /siguiente/i }))

      // Should show challenge 2
      expect(screen.getByText(/desafío 2 de/i)).toBeInTheDocument()
    })
  })
})
