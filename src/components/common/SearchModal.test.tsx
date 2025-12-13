import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { SearchModal } from './SearchModal'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

// Mock createPortal to render inline
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom')
  return {
    ...actual,
    createPortal: (children: React.ReactNode) => children,
  }
})

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('SearchModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('renders nothing when closed', () => {
    renderWithRouter(<SearchModal isOpen={false} onClose={vi.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders modal when open', () => {
    renderWithRouter(<SearchModal isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders search input', () => {
    renderWithRouter(<SearchModal isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    renderWithRouter(<SearchModal isOpen={true} onClose={onClose} />)

    const closeButton = screen.getByLabelText('Cerrar búsqueda')
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalled()
  })

  it('updates search input value', () => {
    renderWithRouter(<SearchModal isOpen={true} onClose={vi.fn()} />)

    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'Capacitor' } })

    expect(input).toHaveValue('Capacitor')
  })

  it('shows keyboard shortcuts in footer', () => {
    renderWithRouter(<SearchModal isOpen={true} onClose={vi.fn()} />)

    expect(screen.getByText('Enter')).toBeInTheDocument()
    expect(screen.getByText('Esc')).toBeInTheDocument()
  })

  it('shows recent searches when populated', () => {
    localStorage.setItem(
      'quiz-recent-searches',
      JSON.stringify(['WebView', 'plugin'])
    )

    renderWithRouter(<SearchModal isOpen={true} onClose={vi.fn()} />)

    expect(screen.getByText('Búsquedas recientes')).toBeInTheDocument()
    expect(screen.getByText('WebView')).toBeInTheDocument()
    expect(screen.getByText('plugin')).toBeInTheDocument()
  })

  it('clicking recent search fills input', () => {
    localStorage.setItem('quiz-recent-searches', JSON.stringify(['WebView']))

    renderWithRouter(<SearchModal isOpen={true} onClose={vi.fn()} />)

    fireEvent.click(screen.getByText('WebView'))

    expect(screen.getByRole('searchbox')).toHaveValue('WebView')
  })

  it('clears recent searches when clicking Limpiar', () => {
    localStorage.setItem('quiz-recent-searches', JSON.stringify(['WebView']))

    renderWithRouter(<SearchModal isOpen={true} onClose={vi.fn()} />)

    fireEvent.click(screen.getByText('Limpiar'))

    expect(screen.queryByText('Búsquedas recientes')).not.toBeInTheDocument()
  })

  it('blocks body scroll when open', () => {
    renderWithRouter(<SearchModal isOpen={true} onClose={vi.fn()} />)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body scroll when closed', () => {
    const { rerender } = renderWithRouter(
      <SearchModal isOpen={true} onClose={vi.fn()} />
    )

    rerender(
      <MemoryRouter>
        <SearchModal isOpen={false} onClose={vi.fn()} />
      </MemoryRouter>
    )

    expect(document.body.style.overflow).toBe('')
  })

  it('saves recent search on Enter', async () => {
    renderWithRouter(<SearchModal isOpen={true} onClose={vi.fn()} />)

    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'Capacitor' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    await waitFor(() => {
      const stored = localStorage.getItem('quiz-recent-searches')
      expect(stored).toBeTruthy()
      expect(JSON.parse(stored!)).toContain('Capacitor')
    })
  })

  it('shows empty state when search term is short', () => {
    renderWithRouter(<SearchModal isOpen={true} onClose={vi.fn()} />)

    expect(screen.getByText('Busca conceptos en los quizzes')).toBeInTheDocument()
  })

  it('shows search results when typing', async () => {
    renderWithRouter(<SearchModal isOpen={true} onClose={vi.fn()} />)

    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'Capacitor' } })

    // Wait for debounce and results
    await waitFor(
      () => {
        expect(screen.getByText(/resultados? encontrados?/)).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })
})
