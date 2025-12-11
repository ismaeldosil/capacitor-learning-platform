import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value')
    )

    expect(result.current[0]).toBe('initial-value')
  })

  it('should return stored value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'))

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value')
    )

    expect(result.current[0]).toBe('stored-value')
  })

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value')
    )

    act(() => {
      result.current[1]('new-value')
    })

    expect(result.current[0]).toBe('new-value')
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('new-value')
    )
  })

  it('should support function updates', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0))

    act(() => {
      result.current[1]((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(1)
  })

  it('should remove value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'))

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value')
    )

    act(() => {
      result.current[2]() // removeValue
    })

    expect(result.current[0]).toBe('initial-value')
    expect(localStorage.removeItem).toHaveBeenCalledWith('test-key')
  })

  it('should handle objects', () => {
    const initialValue = { name: 'test', count: 0 }

    const { result } = renderHook(() =>
      useLocalStorage('object-key', initialValue)
    )

    expect(result.current[0]).toEqual(initialValue)

    act(() => {
      result.current[1]({ name: 'updated', count: 5 })
    })

    expect(result.current[0]).toEqual({ name: 'updated', count: 5 })
  })

  it('should handle arrays', () => {
    const initialValue = ['a', 'b', 'c']

    const { result } = renderHook(() =>
      useLocalStorage('array-key', initialValue)
    )

    expect(result.current[0]).toEqual(initialValue)

    act(() => {
      result.current[1]((prev) => [...prev, 'd'])
    })

    expect(result.current[0]).toEqual(['a', 'b', 'c', 'd'])
  })
})
