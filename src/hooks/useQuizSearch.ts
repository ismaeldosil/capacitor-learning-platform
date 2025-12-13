import { useState, useEffect, useMemo, useCallback } from 'react'
import { QUIZZES } from '../data/quizzes'
import { MODULES } from '../data/constants'
import type { QuizQuestion } from '../data/types'

export type MatchLocation = 'question' | 'option' | 'explanation'

export interface QuizSearchResult {
  questionId: string
  questionText: string
  question: QuizQuestion
  moduleId: string
  moduleName: string
  quizId: string
  matchedIn: MatchLocation
  matchLocations: MatchLocation[] // All locations where the term was found
  matchContext: string
  highlightRanges: Array<{ start: number; end: number }>
  optionIndex?: number // If match is in an option
}

export interface UseQuizSearchReturn {
  results: QuizSearchResult[]
  isSearching: boolean
  totalResults: number
  searchTerm: string
  groupedResults: Record<string, QuizSearchResult[]>
}

// Función para encontrar rangos de coincidencia en texto
function findMatchRanges(
  text: string,
  searchTerm: string
): Array<{ start: number; end: number }> {
  const ranges: Array<{ start: number; end: number }> = []
  const lowerText = text.toLowerCase()
  const lowerSearch = searchTerm.toLowerCase()

  let startIndex = 0
  let index = lowerText.indexOf(lowerSearch, startIndex)

  while (index !== -1) {
    ranges.push({
      start: index,
      end: index + searchTerm.length,
    })
    startIndex = index + 1
    index = lowerText.indexOf(lowerSearch, startIndex)
  }

  return ranges
}

// Función para extraer contexto alrededor del match
function extractContext(
  text: string,
  searchTerm: string,
  contextLength: number = 50
): string {
  const lowerText = text.toLowerCase()
  const lowerSearch = searchTerm.toLowerCase()
  const matchIndex = lowerText.indexOf(lowerSearch)

  if (matchIndex === -1) return text

  const start = Math.max(0, matchIndex - contextLength)
  const end = Math.min(text.length, matchIndex + searchTerm.length + contextLength)

  let context = text.slice(start, end)

  if (start > 0) context = '...' + context
  if (end < text.length) context = context + '...'

  return context
}

// Función para obtener el nombre del módulo
function getModuleName(moduleId: string): string {
  const module = MODULES.find((m) => m.id === moduleId)
  return module?.title || moduleId
}

// Priority for match locations (lower is higher priority)
const MATCH_PRIORITY: Record<MatchLocation, number> = {
  question: 1,
  option: 2,
  explanation: 3,
}

// Main search function
function searchInQuizzes(searchTerm: string): QuizSearchResult[] {
  if (!searchTerm || searchTerm.length < 2) {
    return []
  }

  // Map to store results by questionId for deduplication
  const resultsMap = new Map<string, QuizSearchResult>()
  const lowerSearch = searchTerm.toLowerCase()

  for (const quiz of QUIZZES) {
    for (const question of quiz.questions) {
      const matchLocations: MatchLocation[] = []
      let bestMatch: {
        location: MatchLocation
        context: string
        ranges: Array<{ start: number; end: number }>
        optionIndex?: number
      } | null = null

      // Search in question text
      if (question.text.toLowerCase().includes(lowerSearch)) {
        matchLocations.push('question')
        bestMatch = {
          location: 'question',
          context: extractContext(question.text, searchTerm),
          ranges: findMatchRanges(question.text, searchTerm),
        }
      }

      // Search in options
      question.options.forEach((option, optionIndex) => {
        if (option.toLowerCase().includes(lowerSearch)) {
          if (!matchLocations.includes('option')) {
            matchLocations.push('option')
          }
          // Only update bestMatch if we don't have one yet or this is higher priority
          if (!bestMatch || MATCH_PRIORITY.option < MATCH_PRIORITY[bestMatch.location]) {
            bestMatch = {
              location: 'option',
              context: extractContext(option, searchTerm),
              ranges: findMatchRanges(option, searchTerm),
              optionIndex,
            }
          }
        }
      })

      // Search in explanation
      if (question.explanation.toLowerCase().includes(lowerSearch)) {
        matchLocations.push('explanation')
        // Only update bestMatch if we don't have one yet
        if (!bestMatch) {
          bestMatch = {
            location: 'explanation',
            context: extractContext(question.explanation, searchTerm),
            ranges: findMatchRanges(question.explanation, searchTerm),
          }
        }
      }

      // If we found any matches, add/update the result
      if (matchLocations.length > 0 && bestMatch) {
        const existingResult = resultsMap.get(question.id)

        if (!existingResult) {
          resultsMap.set(question.id, {
            questionId: question.id,
            questionText: question.text,
            question,
            moduleId: quiz.moduleId,
            moduleName: getModuleName(quiz.moduleId),
            quizId: quiz.id,
            matchedIn: bestMatch.location,
            matchLocations,
            matchContext: bestMatch.context,
            highlightRanges: bestMatch.ranges,
            optionIndex: bestMatch.optionIndex,
          })
        }
      }
    }
  }

  return Array.from(resultsMap.values())
}

// Función para agrupar resultados por módulo
function groupResultsByModule(
  results: QuizSearchResult[]
): Record<string, QuizSearchResult[]> {
  return results.reduce(
    (acc, result) => {
      const key = result.moduleId
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(result)
      return acc
    },
    {} as Record<string, QuizSearchResult[]>
  )
}

/**
 * Hook para buscar conceptos dentro de los quizzes
 * Busca en preguntas, opciones y explicaciones
 *
 * @param initialSearchTerm - Término de búsqueda inicial (opcional)
 * @param debounceMs - Tiempo de debounce en ms (default: 300)
 */
export function useQuizSearch(
  initialSearchTerm: string = '',
  debounceMs: number = 300
): UseQuizSearchReturn & {
  setSearchTerm: (term: string) => void
  clearSearch: () => void
} {
  const [searchTerm, setSearchTermInternal] = useState(initialSearchTerm)
  const [debouncedTerm, setDebouncedTerm] = useState(initialSearchTerm)
  const [isSearching, setIsSearching] = useState(false)

  // Debounce del término de búsqueda
  useEffect(() => {
    setIsSearching(true)
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
      setIsSearching(false)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchTerm, debounceMs])

  // Ejecutar búsqueda cuando cambia el término debounced
  const results = useMemo(() => {
    return searchInQuizzes(debouncedTerm)
  }, [debouncedTerm])

  // Agrupar resultados por módulo
  const groupedResults = useMemo(() => {
    return groupResultsByModule(results)
  }, [results])

  // Función para actualizar el término de búsqueda
  const setSearchTerm = useCallback((term: string) => {
    setSearchTermInternal(term)
  }, [])

  // Función para limpiar la búsqueda
  const clearSearch = useCallback(() => {
    setSearchTermInternal('')
    setDebouncedTerm('')
  }, [])

  return {
    results,
    isSearching: isSearching && searchTerm.length >= 2,
    totalResults: results.length,
    searchTerm,
    groupedResults,
    setSearchTerm,
    clearSearch,
  }
}

/**
 * Función utilitaria para resaltar texto con las coincidencias
 */
export function highlightText(
  text: string,
  searchTerm: string
): Array<{ text: string; isHighlight: boolean }> {
  if (!searchTerm || searchTerm.length < 2) {
    return [{ text, isHighlight: false }]
  }

  const ranges = findMatchRanges(text, searchTerm)
  if (ranges.length === 0) {
    return [{ text, isHighlight: false }]
  }

  const parts: Array<{ text: string; isHighlight: boolean }> = []
  let lastEnd = 0

  for (const range of ranges) {
    // Texto antes del match
    if (range.start > lastEnd) {
      parts.push({
        text: text.slice(lastEnd, range.start),
        isHighlight: false,
      })
    }

    // El match
    parts.push({
      text: text.slice(range.start, range.end),
      isHighlight: true,
    })

    lastEnd = range.end
  }

  // Texto después del último match
  if (lastEnd < text.length) {
    parts.push({
      text: text.slice(lastEnd),
      isHighlight: false,
    })
  }

  return parts
}
