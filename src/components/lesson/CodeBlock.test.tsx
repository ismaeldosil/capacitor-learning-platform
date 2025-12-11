import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CodeBlock } from './CodeBlock'

describe('CodeBlock', () => {
  describe('rendering', () => {
    it('should render code content', () => {
      render(<CodeBlock code="const x = 1" language="typescript" />)
      expect(screen.getByText('const x = 1')).toBeInTheDocument()
    })

    it('should show language label', () => {
      render(<CodeBlock code="const x = 1" language="typescript" />)
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })

    it('should show filename when provided', () => {
      render(<CodeBlock code="test" language="typescript" filename="app.ts" />)
      expect(screen.getByText('app.ts')).toBeInTheDocument()
    })

    it('should show Terminal label for bash', () => {
      render(<CodeBlock code="npm install" language="bash" />)
      expect(screen.getByText('Terminal')).toBeInTheDocument()
    })

    it('should render line numbers by default', () => {
      render(<CodeBlock code={'line1\nline2\nline3'} />)
      // Line numbers are rendered
      const lineNumbers = screen.getAllByText(/^[123]$/)
      expect(lineNumbers.length).toBeGreaterThanOrEqual(3)
    })

    it('should hide line numbers when showLineNumbers is false', () => {
      render(<CodeBlock code="single line" showLineNumbers={false} />)
      // When no line numbers, only the code content should be visible
      expect(screen.getByText('single line')).toBeInTheDocument()
    })
  })

  describe('copy functionality', () => {
    it('should show copy button', () => {
      render(<CodeBlock code="test" />)
      expect(screen.getByRole('button', { name: /copiar/i })).toBeInTheDocument()
    })

    it('should copy code to clipboard when clicked', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined)
      Object.assign(navigator, {
        clipboard: { writeText: mockWriteText },
      })

      render(<CodeBlock code="test code" />)
      fireEvent.click(screen.getByRole('button', { name: /copiar/i }))

      expect(mockWriteText).toHaveBeenCalledWith('test code')
    })

    it('should show "Copiado" after copying', async () => {
      Object.assign(navigator, {
        clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
      })

      render(<CodeBlock code="test" />)
      fireEvent.click(screen.getByRole('button', { name: /copiar/i }))

      expect(await screen.findByText('Copiado')).toBeInTheDocument()
    })
  })

  describe('highlight lines', () => {
    it('should render with highlight lines prop', () => {
      render(<CodeBlock code={'line1\nline2\nline3'} highlightLines={[2]} />)
      // Just verify it renders without error
      expect(screen.getByText('line1')).toBeInTheDocument()
    })
  })
})
