import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card'

describe('Card', () => {
  describe('rendering', () => {
    it('should render children', () => {
      render(<Card>Card content</Card>)
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('should apply default padding', () => {
      render(<Card>Content</Card>)
      // Card renders content directly inside itself
      const card = screen.getByText('Content')
      expect(card.className).toContain('p-6')
    })
  })

  describe('padding', () => {
    it('should apply no padding', () => {
      render(<Card padding="none">Content</Card>)
      const card = screen.getByText('Content')
      expect(card.className).not.toContain('p-')
    })

    it('should apply sm padding', () => {
      render(<Card padding="sm">Content</Card>)
      const card = screen.getByText('Content')
      expect(card.className).toContain('p-4')
    })

    it('should apply lg padding', () => {
      render(<Card padding="lg">Content</Card>)
      const card = screen.getByText('Content')
      expect(card.className).toContain('p-8')
    })
  })

  describe('hover', () => {
    it('should not apply hover styles by default', () => {
      render(<Card>Content</Card>)
      const card = screen.getByText('Content')
      expect(card.className).not.toContain('hover:border-primary-500')
    })

    it('should apply hover styles when hover is true', () => {
      render(<Card hover>Content</Card>)
      const card = screen.getByText('Content')
      expect(card.className).toContain('hover:border-primary-500')
    })
  })

  describe('custom className', () => {
    it('should apply custom className', () => {
      render(<Card className="custom-class">Content</Card>)
      const card = screen.getByText('Content')
      expect(card.className).toContain('custom-class')
    })
  })
})

describe('CardHeader', () => {
  it('should render children', () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('should apply border styles', () => {
    render(<CardHeader>Header</CardHeader>)
    const header = screen.getByText('Header')
    expect(header.className).toContain('border-b')
  })

  it('should apply custom className', () => {
    render(<CardHeader className="custom-header">Header</CardHeader>)
    const header = screen.getByText('Header')
    expect(header.className).toContain('custom-header')
  })
})

describe('CardTitle', () => {
  it('should render children', () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Title')
  })

  it('should apply custom className', () => {
    render(<CardTitle className="custom-title">Title</CardTitle>)
    const title = screen.getByRole('heading')
    expect(title.className).toContain('custom-title')
  })
})

describe('CardContent', () => {
  it('should render children', () => {
    render(<CardContent>Content</CardContent>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<CardContent className="custom-content">Content</CardContent>)
    const content = screen.getByText('Content')
    expect(content.className).toContain('custom-content')
  })
})

describe('CardFooter', () => {
  it('should render children', () => {
    render(<CardFooter>Footer</CardFooter>)
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('should apply border styles', () => {
    render(<CardFooter>Footer</CardFooter>)
    const footer = screen.getByText('Footer')
    expect(footer.className).toContain('border-t')
  })

  it('should apply custom className', () => {
    render(<CardFooter className="custom-footer">Footer</CardFooter>)
    const footer = screen.getByText('Footer')
    expect(footer.className).toContain('custom-footer')
  })
})
