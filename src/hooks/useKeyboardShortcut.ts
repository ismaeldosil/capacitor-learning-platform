import { useEffect, useCallback } from 'react'

type KeyboardModifier = 'ctrl' | 'meta' | 'alt' | 'shift'

interface ShortcutOptions {
  key: string
  modifiers?: KeyboardModifier[]
  callback: () => void
  enabled?: boolean
  preventDefault?: boolean
}

/**
 * Hook para manejar atajos de teclado
 *
 * @example
 * // Cmd+K / Ctrl+K para abrir búsqueda
 * useKeyboardShortcut({
 *   key: 'k',
 *   modifiers: ['meta'], // 'ctrl' en Windows/Linux
 *   callback: () => setIsOpen(true)
 * })
 */
export function useKeyboardShortcut({
  key,
  modifiers = [],
  callback,
  enabled = true,
  preventDefault = true,
}: ShortcutOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      // Ignorar si está en un input/textarea (a menos que sea Escape)
      const target = event.target as HTMLElement
      const isInputField =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable

      // Permitir Escape siempre, otros shortcuts solo fuera de inputs
      if (key.toLowerCase() !== 'escape' && isInputField) {
        // Pero permitir Cmd+K incluso en inputs
        const isCmdK =
          key.toLowerCase() === 'k' &&
          (modifiers.includes('meta') || modifiers.includes('ctrl'))
        if (!isCmdK) return
      }

      // Verificar la tecla
      if (event.key.toLowerCase() !== key.toLowerCase()) return

      // Verificar modificadores
      const modifierChecks: Record<KeyboardModifier, boolean> = {
        ctrl: event.ctrlKey,
        meta: event.metaKey,
        alt: event.altKey,
        shift: event.shiftKey,
      }

      // Verificar que todos los modificadores requeridos estén presentes
      const hasAllModifiers = modifiers.every((mod) => modifierChecks[mod])

      // Verificar que no haya modificadores extra no requeridos
      // (excepto si usamos meta, permitimos ctrl como alternativa en Windows)
      const allowedModifiers = new Set(modifiers)
      if (modifiers.includes('meta')) {
        allowedModifiers.add('ctrl')
      }
      if (modifiers.includes('ctrl')) {
        allowedModifiers.add('meta')
      }

      const hasExtraModifiers = (
        Object.keys(modifierChecks) as KeyboardModifier[]
      ).some((mod) => modifierChecks[mod] && !allowedModifiers.has(mod))

      if (!hasAllModifiers || hasExtraModifiers) return

      // Ejecutar callback
      if (preventDefault) {
        event.preventDefault()
      }
      callback()
    },
    [key, modifiers, callback, enabled, preventDefault]
  )

  useEffect(() => {
    if (!enabled) return

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown, enabled])
}

/**
 * Hook para cerrar con Escape
 */
export function useEscapeKey(callback: () => void, enabled: boolean = true) {
  useKeyboardShortcut({
    key: 'Escape',
    callback,
    enabled,
    preventDefault: false,
  })
}

/**
 * Hook para Cmd+K / Ctrl+K (búsqueda)
 */
export function useSearchShortcut(callback: () => void, enabled: boolean = true) {
  useKeyboardShortcut({
    key: 'k',
    modifiers: ['meta'],
    callback,
    enabled,
  })
}
