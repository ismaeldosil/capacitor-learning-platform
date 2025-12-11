import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BuildPipeline } from './BuildPipeline'

describe('BuildPipeline', () => {
  const mockOnComplete = vi.fn()

  beforeEach(() => {
    mockOnComplete.mockClear()
  })

  describe('rendering', () => {
    it('should render progress indicator', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)
      expect(screen.getByText(/pipeline 1 de/i)).toBeInTheDocument()
    })

    it('should render platform header (Android first)', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)
      expect(screen.getByText(/build pipeline para android/i)).toBeInTheDocument()
    })

    it('should render verify button', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /verificar/i })).toBeInTheDocument()
    })

    it('should render reset button', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /reiniciar/i })).toBeInTheDocument()
    })

    it('should render available steps', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)
      expect(screen.getByText('Pasos disponibles:')).toBeInTheDocument()
    })

    it('should render pipeline area', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)
      expect(screen.getByText('Tu Pipeline:')).toBeInTheDocument()
    })

    it('should render step descriptions', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)
      expect(screen.getByText(/compilar la app web/i)).toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('should move step to pipeline on click', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)

      // Find and click a step
      const stepButton = screen.getByText('npm run build')
      fireEvent.click(stepButton)

      // Step should now be in pipeline (has a number)
      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('should allow removing step from pipeline', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)

      // Add step
      const stepButton = screen.getByText('npm run build')
      fireEvent.click(stepButton)

      // Click the step in pipeline to remove it
      const stepInPipeline = screen.getByText('npm run build')
      fireEvent.click(stepInPipeline)

      // Pipeline should be empty again
      expect(screen.getByText(/arrastra los pasos aquí/i)).toBeInTheDocument()
    })

    it('should reset pipeline when reset is clicked', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)

      // Add a step
      fireEvent.click(screen.getByText('npm run build'))

      // Reset
      fireEvent.click(screen.getByRole('button', { name: /reiniciar/i }))

      // Pipeline should be empty
      expect(screen.getByText(/arrastra los pasos aquí/i)).toBeInTheDocument()
    })
  })

  describe('verification', () => {
    it('should disable verify button when pipeline incomplete', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)
      expect(screen.getByRole('button', { name: /verificar/i })).toBeDisabled()
    })

    it('should show result after verification', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)

      // Add all steps (click each available step)
      fireEvent.click(screen.getByText('npm run build'))
      fireEvent.click(screen.getByText('npx cap sync android'))
      fireEvent.click(screen.getByText('Abrir Android Studio'))
      fireEvent.click(screen.getByText('Build > Generate Signed Bundle'))
      fireEvent.click(screen.getByText('Seleccionar keystore'))
      fireEvent.click(screen.getByText('Build release'))

      // Verify
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))

      // Should show result
      expect(screen.getByText(/pipeline correcto|orden incorrecto/i)).toBeInTheDocument()
    })

    it('should show next button after verification', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)

      // Add all steps
      fireEvent.click(screen.getByText('npm run build'))
      fireEvent.click(screen.getByText('npx cap sync android'))
      fireEvent.click(screen.getByText('Abrir Android Studio'))
      fireEvent.click(screen.getByText('Build > Generate Signed Bundle'))
      fireEvent.click(screen.getByText('Seleccionar keystore'))
      fireEvent.click(screen.getByText('Build release'))

      // Verify
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))

      // Next button should appear
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('should move to iOS pipeline after Android', () => {
      render(<BuildPipeline onComplete={mockOnComplete} />)

      // Complete Android pipeline
      fireEvent.click(screen.getByText('npm run build'))
      fireEvent.click(screen.getByText('npx cap sync android'))
      fireEvent.click(screen.getByText('Abrir Android Studio'))
      fireEvent.click(screen.getByText('Build > Generate Signed Bundle'))
      fireEvent.click(screen.getByText('Seleccionar keystore'))
      fireEvent.click(screen.getByText('Build release'))
      fireEvent.click(screen.getByRole('button', { name: /verificar/i }))
      fireEvent.click(screen.getByRole('button', { name: /siguiente/i }))

      // Should show iOS pipeline
      expect(screen.getByText(/pipeline 2 de/i)).toBeInTheDocument()
      expect(screen.getByText(/build pipeline para ios/i)).toBeInTheDocument()
    })
  })
})
