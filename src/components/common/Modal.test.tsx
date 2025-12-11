import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal', () => {
  describe('visibility', () => {
    it('should not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={vi.fn()}>
          Modal content
        </Modal>
      )
      expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
    })

    it('should render when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()}>
          Modal content
        </Modal>
      )
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })
  })

  describe('title', () => {
    it('should render title when provided', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          Content
        </Modal>
      )
      expect(screen.getByRole('heading', { name: /test modal/i })).toBeInTheDocument()
    })

    it('should not render header when title not provided', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()}>
          Content
        </Modal>
      )
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('should render close button in header when title provided', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </Modal>
      )
      expect(screen.getByRole('button', { name: /cerrar/i })).toBeInTheDocument()
    })
  })

  describe('closing', () => {
    it('should call onClose when close button clicked', () => {
      const handleClose = vi.fn()
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test">
          Content
        </Modal>
      )

      fireEvent.click(screen.getByRole('button', { name: /cerrar/i }))
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when Escape key pressed', () => {
      const handleClose = vi.fn()
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Content
        </Modal>
      )

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when overlay clicked', () => {
      const handleClose = vi.fn()
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Content
        </Modal>
      )

      // The overlay is the dialog element itself with role="dialog"
      // Clicking directly on it should trigger onClose
      const dialog = screen.getByRole('dialog')
      fireEvent.click(dialog)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('should not call onClose when content clicked', () => {
      const handleClose = vi.fn()
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <button>Content button</button>
        </Modal>
      )

      fireEvent.click(screen.getByText('Content button'))
      expect(handleClose).not.toHaveBeenCalled()
    })
  })

  describe('sizes', () => {
    it('should apply md size by default', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()}>
          Content
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog.querySelector('.max-w-md')).toBeInTheDocument()
    })

    it('should apply sm size', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} size="sm">
          Content
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog.querySelector('.max-w-sm')).toBeInTheDocument()
    })

    it('should apply lg size', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} size="lg">
          Content
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog.querySelector('.max-w-lg')).toBeInTheDocument()
    })

    it('should apply xl size', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} size="xl">
          Content
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog.querySelector('.max-w-xl')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('should have role dialog', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()}>
          Content
        </Modal>
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should have aria-modal true', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()}>
          Content
        </Modal>
      )
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    })

    it('should have aria-labelledby when title provided', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          Content
        </Modal>
      )
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title')
    })

    it('should lock body scroll when open', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()}>
          Content
        </Modal>
      )
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('should restore body scroll when closed', () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={vi.fn()}>
          Content
        </Modal>
      )

      rerender(
        <Modal isOpen={false} onClose={vi.fn()}>
          Content
        </Modal>
      )

      expect(document.body.style.overflow).toBe('')
    })
  })
})
