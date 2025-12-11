import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Toast, ToastContainer } from './Toast'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('rendering', () => {
    it('should render message', () => {
      render(
        <Toast id="1" type="success" message="Success message" onClose={vi.fn()} />
      )
      expect(screen.getByText('Success message')).toBeInTheDocument()
    })

    it('should have role alert', () => {
      render(
        <Toast id="1" type="info" message="Info" onClose={vi.fn()} />
      )
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  describe('types', () => {
    it('should apply success styles', () => {
      render(
        <Toast id="1" type="success" message="Success" onClose={vi.fn()} />
      )
      const alert = screen.getByRole('alert')
      expect(alert.className).toContain('border-green-500')
    })

    it('should apply error styles', () => {
      render(
        <Toast id="1" type="error" message="Error" onClose={vi.fn()} />
      )
      const alert = screen.getByRole('alert')
      expect(alert.className).toContain('border-error-500')
    })

    it('should apply warning styles', () => {
      render(
        <Toast id="1" type="warning" message="Warning" onClose={vi.fn()} />
      )
      const alert = screen.getByRole('alert')
      expect(alert.className).toContain('border-warning-500')
    })

    it('should apply info styles', () => {
      render(
        <Toast id="1" type="info" message="Info" onClose={vi.fn()} />
      )
      const alert = screen.getByRole('alert')
      expect(alert.className).toContain('border-primary-500')
    })
  })

  describe('closing', () => {
    it('should call onClose with id when close button clicked', async () => {
      const handleClose = vi.fn()
      render(
        <Toast id="test-id" type="info" message="Info" onClose={handleClose} />
      )

      fireEvent.click(screen.getByRole('button', { name: /cerrar/i }))

      // Wait for the setTimeout in handleClose
      await act(async () => {
        vi.advanceTimersByTime(200)
      })

      expect(handleClose).toHaveBeenCalledWith('test-id')
    })

    it('should auto-dismiss after duration', async () => {
      const handleClose = vi.fn()
      render(
        <Toast
          id="test-id"
          type="info"
          message="Info"
          duration={3000}
          onClose={handleClose}
        />
      )

      await act(async () => {
        vi.advanceTimersByTime(3000)
      })

      await act(async () => {
        vi.advanceTimersByTime(200)
      })

      expect(handleClose).toHaveBeenCalledWith('test-id')
    })

    it('should not auto-dismiss when duration is 0', async () => {
      const handleClose = vi.fn()
      render(
        <Toast
          id="test-id"
          type="info"
          message="Info"
          duration={0}
          onClose={handleClose}
        />
      )

      await act(async () => {
        vi.advanceTimersByTime(10000)
      })

      expect(handleClose).not.toHaveBeenCalled()
    })
  })
})

describe('ToastContainer', () => {
  it('should render multiple toasts', () => {
    const toasts = [
      { id: '1', type: 'success' as const, message: 'First toast' },
      { id: '2', type: 'error' as const, message: 'Second toast' },
    ]

    render(<ToastContainer toasts={toasts} onClose={vi.fn()} />)

    expect(screen.getByText('First toast')).toBeInTheDocument()
    expect(screen.getByText('Second toast')).toBeInTheDocument()
  })

  it('should render no toasts when array is empty', () => {
    render(<ToastContainer toasts={[]} onClose={vi.fn()} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should pass duration to individual toasts', () => {
    const toasts = [
      { id: '1', type: 'info' as const, message: 'With duration', duration: 2000 },
    ]

    render(<ToastContainer toasts={toasts} onClose={vi.fn()} />)
    expect(screen.getByText('With duration')).toBeInTheDocument()
  })
})
