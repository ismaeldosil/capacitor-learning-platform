import { Check, X } from 'lucide-react'

interface AnswerOptionProps {
  text: string
  index: number
  isSelected: boolean
  isCorrect?: boolean
  showResult: boolean
  disabled: boolean
  onSelect: () => void
}

const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F']

export function AnswerOption({
  text,
  index,
  isSelected,
  isCorrect,
  showResult,
  disabled,
  onSelect,
}: AnswerOptionProps) {
  const getOptionStyles = () => {
    if (!showResult) {
      if (isSelected) {
        return 'border-primary-500 bg-primary-500/10 ring-2 ring-primary-500/50'
      }
      return 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
    }

    // Showing result
    if (isCorrect) {
      return 'border-green-500 bg-green-500/10'
    }
    if (isSelected && !isCorrect) {
      return 'border-red-500 bg-red-500/10'
    }
    return 'border-gray-700 opacity-50'
  }

  const getLabelStyles = () => {
    if (!showResult) {
      if (isSelected) {
        return 'bg-primary-500 text-white'
      }
      return 'bg-gray-700 text-gray-300'
    }

    if (isCorrect) {
      return 'bg-green-500 text-white'
    }
    if (isSelected && !isCorrect) {
      return 'bg-red-500 text-white'
    }
    return 'bg-gray-700 text-gray-500'
  }

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`
        flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all
        ${getOptionStyles()}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
      aria-pressed={isSelected}
      role="option"
      aria-selected={isSelected}
    >
      {/* Option label (A, B, C, D) */}
      <span
        className={`
          flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-semibold
          ${getLabelStyles()}
        `}
      >
        {showResult && isCorrect ? (
          <Check className="h-4 w-4" />
        ) : showResult && isSelected && !isCorrect ? (
          <X className="h-4 w-4" />
        ) : (
          optionLabels[index]
        )}
      </span>

      {/* Option text */}
      <span
        className={`flex-1 ${
          showResult && !isCorrect && !isSelected ? 'text-gray-500' : 'text-gray-200'
        }`}
      >
        {text}
      </span>

      {/* Result indicator */}
      {showResult && isSelected && (
        <span
          className={`text-sm font-medium ${
            isCorrect ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isCorrect ? 'Correcto' : 'Incorrecto'}
        </span>
      )}
    </button>
  )
}
