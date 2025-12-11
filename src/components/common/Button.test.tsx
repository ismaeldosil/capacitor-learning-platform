import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  describe('rendering', () => {
    it('should render children', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('should apply primary variant by default', () => {
      render(<Button>Primary</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-primary-600')
    })

    it('should apply secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-gray-700')
    })

    it('should apply ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-transparent')
    })

    it('should apply danger variant', () => {
      render(<Button variant="danger">Danger</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-error-600')
    })
  })

  describe('sizes', () => {
    it('should apply md size by default', () => {
      render(<Button>Medium</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-4 py-2')
    })

    it('should apply sm size', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-3 py-1.5')
    })

    it('should apply lg size', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-6 py-3')
    })
  })

  describe('loading state', () => {
    it('should show loader when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should hide leftIcon when loading', () => {
      render(
        <Button isLoading leftIcon={<span data-testid="left-icon">L</span>}>
          Loading
        </Button>
      )
      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument()
    })

    it('should hide rightIcon when loading', () => {
      render(
        <Button isLoading rightIcon={<span data-testid="right-icon">R</span>}>
          Loading
        </Button>
      )
      expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument()
    })
  })

  describe('icons', () => {
    it('should render left icon', () => {
      render(
        <Button leftIcon={<span data-testid="left-icon">L</span>}>With Icon</Button>
      )
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    })

    it('should render right icon', () => {
      render(
        <Button rightIcon={<span data-testid="right-icon">R</span>}>With Icon</Button>
      )
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not call onClick when disabled', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} disabled>Disabled</Button>)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('custom className', () => {
    it('should apply custom className', () => {
      render(<Button className="custom-class">Custom</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('custom-class')
    })
  })

  describe('ref forwarding', () => {
    it('should forward ref to button element', () => {
      const ref = { current: null as HTMLButtonElement | null }
      render(<Button ref={ref}>Ref test</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })
})
