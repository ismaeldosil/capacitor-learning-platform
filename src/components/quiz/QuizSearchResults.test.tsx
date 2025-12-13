import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QuizSearchResults } from './QuizSearchResults'
import type { QuizSearchResult } from '../../hooks/useQuizSearch'

const mockResults: QuizSearchResult[] = [
  {
    questionId: 'q1-1',
    questionText: '¿Qué es Capacitor?',
    question: {
      id: 'q1-1',
      text: '¿Qué es Capacitor?',
      options: [
        'Un framework CSS',
        'Un runtime nativo',
        'Un lenguaje de programación',
        'Una base de datos',
      ],
      correctIndex: 1,
      explanation: 'Capacitor es un runtime nativo moderno.',
    },
    moduleId: 'module-1',
    moduleName: 'Setup + Fundamentos',
    quizId: 'quiz-module-1',
    matchedIn: 'question',
    matchLocations: ['question'],
    matchContext: '¿Qué es Capacitor?',
    highlightRanges: [{ start: 8, end: 17 }],
  },
  {
    questionId: 'q1-2',
    questionText: '¿Cuál es el comando para sincronizar?',
    question: {
      id: 'q1-2',
      text: '¿Cuál es el comando para sincronizar?',
      options: ['npx cap build', 'npx cap run', 'npx cap sync', 'npx cap update'],
      correctIndex: 2,
      explanation: 'El comando sync copia tu build web.',
    },
    moduleId: 'module-1',
    moduleName: 'Setup + Fundamentos',
    quizId: 'quiz-module-1',
    matchedIn: 'option',
    matchLocations: ['option'],
    matchContext: 'npx cap sync',
    highlightRanges: [{ start: 8, end: 12 }],
    optionIndex: 2,
  },
  {
    questionId: 'q2-1',
    questionText: '¿Qué plugin maneja el ciclo de vida?',
    question: {
      id: 'q2-1',
      text: '¿Qué plugin maneja el ciclo de vida?',
      options: ['@capacitor/lifecycle', '@capacitor/app', '@capacitor/core', '@capacitor/status'],
      correctIndex: 1,
      explanation: 'El plugin @capacitor/app proporciona métodos para el ciclo de vida.',
    },
    moduleId: 'module-2',
    moduleName: 'Plugins Core',
    quizId: 'quiz-module-2',
    matchedIn: 'explanation',
    matchLocations: ['explanation'],
    matchContext: 'El plugin @capacitor/app proporciona métodos.',
    highlightRanges: [{ start: 10, end: 25 }],
  },
]

const mockGroupedResults: Record<string, QuizSearchResult[]> = {
  'module-1': mockResults.filter((r) => r.moduleId === 'module-1'),
  'module-2': mockResults.filter((r) => r.moduleId === 'module-2'),
}

describe('QuizSearchResults', () => {
  it('renders empty state when search term is less than 2 characters', () => {
    render(
      <QuizSearchResults
        results={[]}
        groupedResults={{}}
        searchTerm=""
      />
    )

    expect(screen.getByText('Busca conceptos en los quizzes')).toBeInTheDocument()
    expect(
      screen.getByText(/Escribe al menos 2 caracteres/)
    ).toBeInTheDocument()
  })

  it('renders no results state when search has no matches', () => {
    render(
      <QuizSearchResults
        results={[]}
        groupedResults={{}}
        searchTerm="xyznonexistent"
      />
    )

    expect(screen.getByText('No se encontraron resultados')).toBeInTheDocument()
    expect(screen.getByText(/No hay coincidencias para/)).toBeInTheDocument()
  })

  it('renders loading state', () => {
    render(
      <QuizSearchResults
        results={[]}
        groupedResults={{}}
        searchTerm="test"
        isLoading={true}
      />
    )

    // Should show skeleton loaders
    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders results grouped by module', () => {
    render(
      <QuizSearchResults
        results={mockResults}
        groupedResults={mockGroupedResults}
        searchTerm="Capacitor"
      />
    )

    // Check module headers
    expect(screen.getByText('Setup + Fundamentos')).toBeInTheDocument()
    expect(screen.getByText('Plugins Core')).toBeInTheDocument()
  })

  it('displays result count', () => {
    render(
      <QuizSearchResults
        results={mockResults}
        groupedResults={mockGroupedResults}
        searchTerm="Capacitor"
      />
    )

    expect(screen.getByText(/3 resultados encontrados/)).toBeInTheDocument()
  })

  it('displays single result count correctly', () => {
    const firstResult = mockResults[0]
    const singleResult = firstResult ? [firstResult] : []
    render(
      <QuizSearchResults
        results={singleResult}
        groupedResults={{ 'module-1': singleResult }}
        searchTerm="Capacitor"
      />
    )

    expect(screen.getByText(/1 resultado encontrado/)).toBeInTheDocument()
  })

  it('shows match badges correctly', () => {
    render(
      <QuizSearchResults
        results={mockResults}
        groupedResults={mockGroupedResults}
        searchTerm="Capacitor"
      />
    )

    expect(screen.getByText('Pregunta')).toBeInTheDocument()
    expect(screen.getByText('Respuesta')).toBeInTheDocument()
    expect(screen.getByText('Explicación')).toBeInTheDocument()
  })

  it('expands card on click to show full question', () => {
    render(
      <QuizSearchResults
        results={mockResults}
        groupedResults={mockGroupedResults}
        searchTerm="Capacitor"
      />
    )

    // Find and click the first result card
    const buttons = screen.getAllByRole('button')
    const firstCard = buttons.find(
      (btn) => btn.getAttribute('aria-expanded') !== null
    )

    expect(firstCard).toBeDefined()
    fireEvent.click(firstCard!)

    // After expansion, should show all options
    expect(screen.getByText('Un framework CSS')).toBeInTheDocument()
    expect(screen.getByText('Un runtime nativo')).toBeInTheDocument()
  })

  it('calls onResultClick when provided', () => {
    const onResultClick = vi.fn()

    render(
      <QuizSearchResults
        results={mockResults}
        groupedResults={mockGroupedResults}
        searchTerm="Capacitor"
        onResultClick={onResultClick}
      />
    )

    const buttons = screen.getAllByRole('button')
    const firstCard = buttons.find(
      (btn) => btn.getAttribute('aria-expanded') !== null
    )

    fireEvent.click(firstCard!)

    expect(onResultClick).toHaveBeenCalledWith(mockResults[0])
  })

  it('highlights search term in text', () => {
    render(
      <QuizSearchResults
        results={mockResults}
        groupedResults={mockGroupedResults}
        searchTerm="Capacitor"
      />
    )

    // Check that highlight marks exist
    const marks = document.querySelectorAll('mark')
    expect(marks.length).toBeGreaterThan(0)
  })

  it('shows correct answer indicator in expanded view', () => {
    render(
      <QuizSearchResults
        results={mockResults}
        groupedResults={mockGroupedResults}
        searchTerm="Capacitor"
      />
    )

    // Expand first card
    const buttons = screen.getAllByRole('button')
    const firstCard = buttons.find(
      (btn) => btn.getAttribute('aria-expanded') !== null
    )
    fireEvent.click(firstCard!)

    // Check for correct answer indicator
    expect(screen.getByText('(Correcta)')).toBeInTheDocument()
  })

  it('shows question text for non-question matches', () => {
    const optionMatch = mockResults[1] // This is an option match
    if (!optionMatch) return // Skip if not defined

    render(
      <QuizSearchResults
        results={[optionMatch]}
        groupedResults={{ 'module-1': [optionMatch] }}
        searchTerm="sync"
      />
    )

    // Should show the question text below the match context
    expect(screen.getByText(/Pregunta:/)).toBeInTheDocument()
  })
})
