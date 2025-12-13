import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Command } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SearchInput } from './SearchInput'
import { QuizSearchResults } from '../quiz/QuizSearchResults'
import { useQuizSearch } from '../../hooks/useQuizSearch'
import { useEscapeKey } from '../../hooks/useKeyboardShortcut'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import type { QuizSearchResult } from '../../hooks/useQuizSearch'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const RECENT_SEARCHES_KEY = 'quiz-recent-searches'
const MAX_RECENT_SEARCHES = 5

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t } = useTranslation('search')
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const {
    results,
    groupedResults,
    isSearching,
    searchTerm,
    setSearchTerm,
    clearSearch,
  } = useQuizSearch()

  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    RECENT_SEARCHES_KEY,
    []
  )

  // Cerrar con Escape
  useEscapeKey(onClose, isOpen)

  // Focus en el input cuando se abre
  useEffect(() => {
    if (isOpen) {
      // Pequeño delay para que la animación termine
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    } else {
      // Limpiar búsqueda al cerrar
      clearSearch()
    }
  }, [isOpen, clearSearch])

  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Click fuera para cerrar
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  // Guardar búsqueda reciente
  const saveRecentSearch = useCallback(
    (term: string) => {
      if (!term || term.length < 2) return

      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s.toLowerCase() !== term.toLowerCase())
        return [term, ...filtered].slice(0, MAX_RECENT_SEARCHES)
      })
    },
    [setRecentSearches]
  )

  // Navegar al resultado
  const handleResultClick = useCallback(
    (result: QuizSearchResult) => {
      // Guardar búsqueda
      saveRecentSearch(searchTerm)

      // Navegar al quiz del módulo
      navigate(`/quiz/${result.moduleId}`)

      // Cerrar modal
      onClose()
    },
    [navigate, onClose, searchTerm, saveRecentSearch]
  )

  // Seleccionar búsqueda reciente
  const handleRecentSearchClick = useCallback(
    (term: string) => {
      setSearchTerm(term)
    },
    [setSearchTerm]
  )

  // Limpiar búsquedas recientes
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
  }, [setRecentSearches])

  // Manejar Enter para guardar búsqueda
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && searchTerm.length >= 2) {
        saveRecentSearch(searchTerm)
      }
    },
    [searchTerm, saveRecentSearch]
  )

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-700">
              <SearchInput
                ref={inputRef}
                value={searchTerm}
                onChange={setSearchTerm}
                onClear={clearSearch}
                onKeyDown={handleKeyDown}
                placeholder={t('placeholder')}
                isLoading={isSearching}
                size="lg"
                className="flex-1"
              />

              <button
                onClick={onClose}
                className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                aria-label={t('closeSearch')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {/* Recent searches (only if no active search) */}
              {(!searchTerm || searchTerm.length < 2) &&
                recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {t('recentSearches')}
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {t('clearRecent')}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentSearchClick(term)}
                          className="px-3 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Resultados */}
              <QuizSearchResults
                results={results}
                groupedResults={groupedResults}
                searchTerm={searchTerm}
                onResultClick={handleResultClick}
                isLoading={isSearching}
              />
            </div>

            {/* Footer with shortcuts */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700 bg-gray-800/50">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-400">
                    Enter
                  </kbd>
                  <span>{t('keyboard.toSearch')}</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-400">
                    Esc
                  </kbd>
                  <span>{t('keyboard.toClose')}</span>
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Command className="h-3 w-3" />
                <span>{t('keyboard.kToSearch')}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Usar portal para renderizar en el body
  return createPortal(modalContent, document.body)
}
