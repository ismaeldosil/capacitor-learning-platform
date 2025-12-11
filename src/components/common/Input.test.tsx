import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  describe('rendering', () => {
    it('should render input element', () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('should render label when provided', () => {
      render(<Input label="Email" name="email" />)
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
    })

    it('should use id for label association if provided', () => {
      render(<Input label="Password" id="password-input" />)
      const input = screen.getByLabelText('Password')
      expect(input).toHaveAttribute('id', 'password-input')
    })

    it('should use name as id if id not provided', () => {
      render(<Input label="Username" name="username" />)
      const input = screen.getByLabelText('Username')
      expect(input).toHaveAttribute('id', 'username')
    })
  })

  describe('icons', () => {
    it('should render left icon', () => {
      render(<Input leftIcon={<span data-testid="left-icon">L</span>} />)
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    })

    it('should render right icon', () => {
      render(<Input rightIcon={<span data-testid="right-icon">R</span>} />)
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })

    it('should apply left padding when left icon present', () => {
      render(<Input leftIcon={<span>L</span>} />)
      const input = screen.getByRole('textbox')
      expect(input.className).toContain('pl-10')
    })

    it('should apply right padding when right icon present', () => {
      render(<Input rightIcon={<span>R</span>} />)
      const input = screen.getByRole('textbox')
      expect(input.className).toContain('pr-10')
    })
  })

  describe('error state', () => {
    it('should render error message', () => {
      render(<Input name="test" error="This field is required" />)
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('should set aria-invalid to true when error', () => {
      render(<Input error="Error" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('should apply error border styles', () => {
      render(<Input error="Error" />)
      const input = screen.getByRole('textbox')
      expect(input.className).toContain('border-error-500')
    })

    it('should set aria-describedby to error element', () => {
      render(<Input name="field" error="Error message" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'field-error')
    })
  })

  describe('helper text', () => {
    it('should render helper text when no error', () => {
      render(<Input name="test" helperText="Enter your email address" />)
      expect(screen.getByText('Enter your email address')).toBeInTheDocument()
    })

    it('should not render helper text when error exists', () => {
      render(<Input name="test" error="Error" helperText="Helper" />)
      expect(screen.queryByText('Helper')).not.toBeInTheDocument()
      expect(screen.getByText('Error')).toBeInTheDocument()
    })

    it('should set aria-describedby to helper element', () => {
      render(<Input name="field" helperText="Helper text" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'field-helper')
    })
  })

  describe('interaction', () => {
    it('should call onChange when typing', () => {
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} />)

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
      expect(handleChange).toHaveBeenCalled()
    })

    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('custom className', () => {
    it('should apply custom className', () => {
      render(<Input className="custom-input" />)
      const input = screen.getByRole('textbox')
      expect(input.className).toContain('custom-input')
    })
  })

  describe('ref forwarding', () => {
    it('should forward ref to input element', () => {
      const ref = { current: null as HTMLInputElement | null }
      render(<Input ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })
})
