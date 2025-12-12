import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  useKeyboardShortcut,
  useEscapeKey,
  useSearchShortcut,
} from './useKeyboardShortcut'

describe('useKeyboardShortcut', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls callback when key is pressed', () => {
    const callback = vi.fn()

    renderHook(() =>
      useKeyboardShortcut({
        key: 'k',
        callback,
      })
    )

    const event = new KeyboardEvent('keydown', { key: 'k' })
    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('does not call callback for different key', () => {
    const callback = vi.fn()

    renderHook(() =>
      useKeyboardShortcut({
        key: 'k',
        callback,
      })
    )

    const event = new KeyboardEvent('keydown', { key: 'j' })
    window.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()
  })

  it('respects meta modifier', () => {
    const callback = vi.fn()

    renderHook(() =>
      useKeyboardShortcut({
        key: 'k',
        modifiers: ['meta'],
        callback,
      })
    )

    // Without meta - should not call
    const eventWithoutMeta = new KeyboardEvent('keydown', { key: 'k' })
    window.dispatchEvent(eventWithoutMeta)
    expect(callback).not.toHaveBeenCalled()

    // With meta - should call
    const eventWithMeta = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
    })
    window.dispatchEvent(eventWithMeta)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('respects ctrl modifier', () => {
    const callback = vi.fn()

    renderHook(() =>
      useKeyboardShortcut({
        key: 'k',
        modifiers: ['ctrl'],
        callback,
      })
    )

    const eventWithCtrl = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
    })
    window.dispatchEvent(eventWithCtrl)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('allows ctrl as alternative to meta', () => {
    const callback = vi.fn()

    renderHook(() =>
      useKeyboardShortcut({
        key: 'k',
        modifiers: ['meta'],
        callback,
      })
    )

    // Ctrl should work as alternative to meta
    const eventWithCtrl = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
    })
    window.dispatchEvent(eventWithCtrl)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('does not call when disabled', () => {
    const callback = vi.fn()

    renderHook(() =>
      useKeyboardShortcut({
        key: 'k',
        callback,
        enabled: false,
      })
    )

    const event = new KeyboardEvent('keydown', { key: 'k' })
    window.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()
  })

  it('prevents default when preventDefault is true', () => {
    const callback = vi.fn()

    renderHook(() =>
      useKeyboardShortcut({
        key: 'k',
        callback,
        preventDefault: true,
      })
    )

    const event = new KeyboardEvent('keydown', { key: 'k' })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

    window.dispatchEvent(event)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('is case insensitive', () => {
    const callback = vi.fn()

    renderHook(() =>
      useKeyboardShortcut({
        key: 'K',
        callback,
      })
    )

    const event = new KeyboardEvent('keydown', { key: 'k' })
    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('ignores events from input fields except for allowed shortcuts', () => {
    const callback = vi.fn()

    renderHook(() =>
      useKeyboardShortcut({
        key: 'a',
        callback,
      })
    )

    // Create an input element and simulate keydown
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      bubbles: true,
    })
    Object.defineProperty(event, 'target', { value: input })
    window.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()

    document.body.removeChild(input)
  })

  it('allows Cmd+K even in input fields', () => {
    const callback = vi.fn()

    renderHook(() =>
      useKeyboardShortcut({
        key: 'k',
        modifiers: ['meta'],
        callback,
      })
    )

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
    })
    Object.defineProperty(event, 'target', { value: input })
    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    document.body.removeChild(input)
  })

  it('allows Escape in input fields', () => {
    const callback = vi.fn()

    renderHook(() =>
      useKeyboardShortcut({
        key: 'Escape',
        callback,
      })
    )

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
    })
    Object.defineProperty(event, 'target', { value: input })
    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    document.body.removeChild(input)
  })

  it('cleans up event listener on unmount', () => {
    const callback = vi.fn()
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() =>
      useKeyboardShortcut({
        key: 'k',
        callback,
      })
    )

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    )
  })
})

describe('useEscapeKey', () => {
  it('calls callback on Escape key', () => {
    const callback = vi.fn()

    renderHook(() => useEscapeKey(callback))

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('does not call when disabled', () => {
    const callback = vi.fn()

    renderHook(() => useEscapeKey(callback, false))

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    window.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()
  })
})

describe('useSearchShortcut', () => {
  it('calls callback on Cmd+K', () => {
    const callback = vi.fn()

    renderHook(() => useSearchShortcut(callback))

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
    })
    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('calls callback on Ctrl+K', () => {
    const callback = vi.fn()

    renderHook(() => useSearchShortcut(callback))

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
    })
    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('does not call when disabled', () => {
    const callback = vi.fn()

    renderHook(() => useSearchShortcut(callback, false))

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
    })
    window.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()
  })
})
