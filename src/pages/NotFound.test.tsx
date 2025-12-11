import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../test/test-utils'
import { NotFound } from './NotFound'

describe('NotFound', () => {
  describe('rendering', () => {
    it('should render 404 heading', () => {
      render(<NotFound />)
      expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
    })

    it('should render error message', () => {
      render(<NotFound />)
      expect(
        screen.getByText(/la página que buscas no existe/i)
      ).toBeInTheDocument()
    })

    it('should render link to dashboard', () => {
      render(<NotFound />)
      const link = screen.getByRole('link', { name: /volver al dashboard/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/')
    })
  })
})
