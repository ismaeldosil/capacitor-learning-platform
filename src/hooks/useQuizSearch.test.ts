import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useQuizSearch, highlightText } from './useQuizSearch'

describe('useQuizSearch', () => {
  it('returns empty results for empty search term', () => {
    const { result } = renderHook(() => useQuizSearch('', 0))

    expect(result.current.results).toEqual([])
    expect(result.current.totalResults).toBe(0)
  })

  it('returns empty results for search term less than 2 characters', () => {
    const { result } = renderHook(() => useQuizSearch('a', 0))

    expect(result.current.results).toEqual([])
  })

  it('finds results in question text', async () => {
    const { result } = renderHook(() => useQuizSearch('', 0))

    act(() => {
      result.current.setSearchTerm('Capacitor')
    })

    await waitFor(() => {
      expect(result.current.results.length).toBeGreaterThan(0)
    })

    expect(
      result.current.results.some((r) => r.matchedIn === 'question')
    ).toBe(true)
  })

  it('finds results in options', async () => {
    const { result } = renderHook(() => useQuizSearch('', 0))

    act(() => {
      result.current.setSearchTerm('WKWebView')
    })

    await waitFor(() => {
      expect(result.current.results.length).toBeGreaterThan(0)
    })

    expect(result.current.results.some((r) => r.matchedIn === 'option')).toBe(
      true
    )
  })

  it('finds results in explanations', async () => {
    const { result } = renderHook(() => useQuizSearch('', 0))

    act(() => {
      result.current.setSearchTerm('runtime')
    })

    await waitFor(() => {
      expect(result.current.results.length).toBeGreaterThan(0)
    })

    expect(
      result.current.results.some((r) => r.matchLocations.includes('explanation'))
    ).toBe(true)
  })

  it('is case insensitive', async () => {
    const { result } = renderHook(() => useQuizSearch('', 0))

    act(() => {
      result.current.setSearchTerm('CAPACITOR')
    })

    await waitFor(() => {
      expect(result.current.results.length).toBeGreaterThan(0)
    })
  })

  it('debounces search', () => {
    vi.useFakeTimers()

    const { result } = renderHook(() => useQuizSearch('', 300))

    act(() => {
      result.current.setSearchTerm('cap')
    })

    // Before debounce completes
    expect(result.current.isSearching).toBe(true)

    act(() => {
      vi.advanceTimersByTime(150)
    })

    // Still searching
    expect(result.current.isSearching).toBe(true)

    act(() => {
      vi.advanceTimersByTime(150)
    })

    // Debounce completed
    expect(result.current.isSearching).toBe(false)

    vi.useRealTimers()
  })

  it('clears search correctly', async () => {
    const { result } = renderHook(() => useQuizSearch('', 0))

    act(() => {
      result.current.setSearchTerm('Capacitor')
    })

    await waitFor(() => {
      expect(result.current.results.length).toBeGreaterThan(0)
    })

    act(() => {
      result.current.clearSearch()
    })

    expect(result.current.searchTerm).toBe('')
    expect(result.current.results).toEqual([])
  })

  it('groups results by module', async () => {
    const { result } = renderHook(() => useQuizSearch('', 0))

    act(() => {
      result.current.setSearchTerm('Capacitor')
    })

    await waitFor(() => {
      expect(Object.keys(result.current.groupedResults).length).toBeGreaterThan(0)
    })
  })

  it('includes module name in results', async () => {
    const { result } = renderHook(() => useQuizSearch('', 0))

    act(() => {
      result.current.setSearchTerm('comando')
    })

    await waitFor(() => {
      expect(result.current.results.length).toBeGreaterThan(0)
    })

    const firstResult = result.current.results[0]
    expect(firstResult).toBeDefined()
    expect(firstResult?.moduleName).toBeTruthy()
    expect(firstResult?.moduleId).toBeTruthy()
  })
})

describe('highlightText', () => {
  it('returns original text when search term is empty', () => {
    const result = highlightText('Hello World', '')
    expect(result).toEqual([{ text: 'Hello World', isHighlight: false }])
  })

  it('returns original text when search term is less than 2 chars', () => {
    const result = highlightText('Hello World', 'H')
    expect(result).toEqual([{ text: 'Hello World', isHighlight: false }])
  })

  it('highlights matching text', () => {
    const result = highlightText('Hello World', 'World')
    expect(result).toEqual([
      { text: 'Hello ', isHighlight: false },
      { text: 'World', isHighlight: true },
    ])
  })

  it('highlights multiple matches', () => {
    const result = highlightText('cat and cat', 'cat')
    expect(result).toEqual([
      { text: 'cat', isHighlight: true },
      { text: ' and ', isHighlight: false },
      { text: 'cat', isHighlight: true },
    ])
  })

  it('is case insensitive', () => {
    const result = highlightText('Hello World', 'WORLD')
    expect(result).toEqual([
      { text: 'Hello ', isHighlight: false },
      { text: 'World', isHighlight: true },
    ])
  })
})
