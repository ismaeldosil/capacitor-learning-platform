import { Check, Circle } from 'lucide-react'

interface QuizProgressProps {
  currentQuestion: number
  totalQuestions: number
  answers: number[]
  correctAnswers?: boolean[]
  showResults?: boolean
}

export function QuizProgress({
  currentQuestion,
  totalQuestions,
  answers,
  correctAnswers = [],
  showResults = false,
}: QuizProgressProps) {
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Pregunta {currentQuestion + 1} de {totalQuestions}
          </span>
          <span className="font-medium text-primary-400">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question indicators */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const isAnswered = answers[index] !== undefined && answers[index] >= 0
          const isCurrent = index === currentQuestion
          const isCorrect = showResults && correctAnswers[index]
          const isIncorrect = showResults && isAnswered && !correctAnswers[index]

          return (
            <div
              key={index}
              className={`
                flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all
                ${isCurrent && !showResults ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-gray-900' : ''}
                ${
                  showResults
                    ? isCorrect
                      ? 'bg-green-500/20 text-green-500'
                      : isIncorrect
                      ? 'bg-red-500/20 text-red-500'
                      : 'bg-gray-700 text-gray-500'
                    : isAnswered
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'bg-gray-700 text-gray-500'
                }
              `}
              aria-label={`Pregunta ${index + 1}${isAnswered ? ' (respondida)' : ''}`}
            >
              {showResults && isCorrect ? (
                <Check className="h-4 w-4" />
              ) : showResults && isIncorrect ? (
                <span>X</span>
              ) : isAnswered ? (
                <Circle className="h-3 w-3 fill-current" />
              ) : (
                index + 1
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
