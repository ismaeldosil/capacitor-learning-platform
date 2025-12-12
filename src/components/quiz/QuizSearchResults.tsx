import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageSquare,
  Lightbulb,
  Search,
  BookOpen,
} from 'lucide-react'
import type { QuizSearchResult, MatchLocation } from '../../hooks/useQuizSearch'
import { highlightText } from '../../hooks/useQuizSearch'

interface QuizSearchResultsProps {
  results: QuizSearchResult[]
  groupedResults: Record<string, QuizSearchResult[]>
  searchTerm: string
  onResultClick?: (result: QuizSearchResult) => void
  isLoading?: boolean
}

// Componente para texto con highlight
function HighlightedText({
  text,
  searchTerm,
}: {
  text: string
  searchTerm: string
}) {
  const parts = highlightText(text, searchTerm)

  return (
    <span>
      {parts.map((part, index) =>
        part.isHighlight ? (
          <mark
            key={index}
            className="bg-yellow-500/30 text-yellow-200 rounded px-0.5"
          >
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </span>
  )
}

// Badge para indicar dónde se encontró el match
function MatchBadge({ matchedIn }: { matchedIn: MatchLocation }) {
  const config: Record<
    MatchLocation,
    { label: string; icon: typeof HelpCircle; color: string }
  > = {
    question: {
      label: 'Pregunta',
      icon: HelpCircle,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
    option: {
      label: 'Respuesta',
      icon: MessageSquare,
      color: 'bg-green-500/20 text-green-400 border-green-500/30',
    },
    explanation: {
      label: 'Explicación',
      icon: Lightbulb,
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    },
  }

  const { label, icon: Icon, color } = config[matchedIn]

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${color}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}

// Card expandible para cada resultado
function ResultCard({
  result,
  searchTerm,
  onResultClick,
}: {
  result: QuizSearchResult
  searchTerm: string
  onResultClick?: (result: QuizSearchResult) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    if (onResultClick) {
      onResultClick(result)
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-lg border border-gray-700 bg-gray-800/50 overflow-hidden"
    >
      {/* Header - siempre visible */}
      <button
        onClick={handleClick}
        className="w-full p-4 text-left hover:bg-gray-700/30 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-inset"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <div className="mb-2">
              <MatchBadge matchedIn={result.matchedIn} />
            </div>

            {/* Contexto del match */}
            <p className="text-sm text-gray-300 line-clamp-2">
              <HighlightedText
                text={result.matchContext}
                searchTerm={searchTerm}
              />
            </p>

            {/* Pregunta (si el match no está en la pregunta) */}
            {result.matchedIn !== 'question' && (
              <p className="mt-2 text-xs text-gray-500 line-clamp-1">
                <span className="font-medium">Pregunta:</span>{' '}
                {result.questionText}
              </p>
            )}
          </div>

          {/* Expand icon */}
          <div className="flex-shrink-0 text-gray-400">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>
      </button>

      {/* Contenido expandido */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-700"
          >
            <div className="p-4 space-y-4">
              {/* Pregunta completa */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Pregunta
                </h4>
                <p className="text-white">
                  <HighlightedText
                    text={result.question.text}
                    searchTerm={searchTerm}
                  />
                </p>
              </div>

              {/* Opciones */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Opciones
                </h4>
                <ul className="space-y-2">
                  {result.question.options.map((option, index) => (
                    <li
                      key={index}
                      className={`text-sm p-2 rounded ${
                        index === result.question.correctIndex
                          ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                          : 'text-gray-300'
                      }`}
                    >
                      <span className="font-medium mr-2">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <HighlightedText text={option} searchTerm={searchTerm} />
                      {index === result.question.correctIndex && (
                        <span className="ml-2 text-xs text-green-500">
                          (Correcta)
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Explicación */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Explicación
                </h4>
                <p className="text-sm text-gray-300 bg-gray-700/30 p-3 rounded">
                  <HighlightedText
                    text={result.question.explanation}
                    searchTerm={searchTerm}
                  />
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Estado vacío
function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-gray-800 p-4 mb-4">
        <Search className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">
        No se encontraron resultados
      </h3>
      <p className="text-sm text-gray-400 max-w-sm">
        No hay coincidencias para "{searchTerm}" en las preguntas, respuestas o
        explicaciones de los quizzes.
      </p>
    </div>
  )
}

// Componente principal
export function QuizSearchResults({
  results,
  groupedResults,
  searchTerm,
  onResultClick,
  isLoading = false,
}: QuizSearchResultsProps) {
  // Si está cargando, mostrar skeleton
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 rounded-lg bg-gray-800/50 animate-pulse"
          />
        ))}
      </div>
    )
  }

  // Si no hay término de búsqueda válido
  if (!searchTerm || searchTerm.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-gray-800 p-4 mb-4">
          <BookOpen className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">
          Busca conceptos en los quizzes
        </h3>
        <p className="text-sm text-gray-400 max-w-sm">
          Escribe al menos 2 caracteres para buscar en preguntas, respuestas y
          explicaciones.
        </p>
      </div>
    )
  }

  // Si no hay resultados
  if (results.length === 0) {
    return <EmptyState searchTerm={searchTerm} />
  }

  // Mostrar resultados agrupados por módulo
  const moduleIds = Object.keys(groupedResults)

  return (
    <div className="space-y-6">
      {/* Contador de resultados */}
      <p className="text-sm text-gray-400">
        {results.length} {results.length === 1 ? 'resultado' : 'resultados'}{' '}
        encontrado{results.length === 1 ? '' : 's'}
      </p>

      {/* Resultados por módulo */}
      {moduleIds.map((moduleId) => {
        const moduleResults = groupedResults[moduleId]
        if (!moduleResults || moduleResults.length === 0) return null

        const firstResult = moduleResults[0]
        const moduleName = firstResult?.moduleName ?? moduleId

        return (
          <div key={moduleId}>
            {/* Header del módulo */}
            <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {moduleName}
              <span className="text-gray-500 font-normal">
                ({moduleResults.length})
              </span>
            </h3>

            {/* Resultados del módulo */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {moduleResults.map((result) => (
                  <ResultCard
                    key={`${result.questionId}-${result.matchedIn}-${result.optionIndex ?? ''}`}
                    result={result}
                    searchTerm={searchTerm}
                    onResultClick={onResultClick}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )
      })}
    </div>
  )
}
