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
  matchContext: string
  highlightRanges: Array<{ start: number; end: number }>
  optionIndex?: number // Si el match está en una opción
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

// Función principal de búsqueda
function searchInQuizzes(searchTerm: string): QuizSearchResult[] {
  if (!searchTerm || searchTerm.length < 2) {
    return []
  }

  const results: QuizSearchResult[] = []
  const lowerSearch = searchTerm.toLowerCase()

  for (const quiz of QUIZZES) {
    for (const question of quiz.questions) {
      // Buscar en el texto de la pregunta
      if (question.text.toLowerCase().includes(lowerSearch)) {
        results.push({
          questionId: question.id,
          questionText: question.text,
          question,
          moduleId: quiz.moduleId,
          moduleName: getModuleName(quiz.moduleId),
          quizId: quiz.id,
          matchedIn: 'question',
          matchContext: extractContext(question.text, searchTerm),
          highlightRanges: findMatchRanges(question.text, searchTerm),
        })
      }

      // Buscar en las opciones
      question.options.forEach((option, optionIndex) => {
        if (option.toLowerCase().includes(lowerSearch)) {
          // Evitar duplicados si ya encontramos en la pregunta
          const alreadyAdded = results.some(
            (r) =>
              r.questionId === question.id &&
              r.matchedIn === 'option' &&
              r.optionIndex === optionIndex
          )

          if (!alreadyAdded) {
            results.push({
              questionId: question.id,
              questionText: question.text,
              question,
              moduleId: quiz.moduleId,
              moduleName: getModuleName(quiz.moduleId),
              quizId: quiz.id,
              matchedIn: 'option',
              matchContext: extractContext(option, searchTerm),
              highlightRanges: findMatchRanges(option, searchTerm),
              optionIndex,
            })
          }
        }
      })

      // Buscar en la explicación
      if (question.explanation.toLowerCase().includes(lowerSearch)) {
        results.push({
          questionId: question.id,
          questionText: question.text,
          question,
          moduleId: quiz.moduleId,
          moduleName: getModuleName(quiz.moduleId),
          quizId: quiz.id,
          matchedIn: 'explanation',
          matchContext: extractContext(question.explanation, searchTerm),
          highlightRanges: findMatchRanges(question.explanation, searchTerm),
        })
      }
    }
  }

  return results
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
