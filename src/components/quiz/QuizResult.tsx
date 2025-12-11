import { Trophy, Target, Zap, RotateCcw, ArrowRight, CheckCircle, X } from 'lucide-react'
import { Button } from '../common/Button'
import type { QuizQuestion } from '../../data/types'

interface QuizResultProps {
  score: number
  totalQuestions: number
  passed: boolean
  xpEarned: number
  isPerfect: boolean
  questions: QuizQuestion[]
  answers: number[]
  onRetry: () => void
  onContinue: () => void
}

export function QuizResult({
  score,
  totalQuestions,
  passed,
  xpEarned,
  isPerfect,
  questions,
  answers,
  onRetry,
  onContinue,
}: QuizResultProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <div className="space-y-8">
      {/* Result header */}
      <div className="text-center">
        <div
          className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${
            passed
              ? isPerfect
                ? 'bg-yellow-500/20'
                : 'bg-green-500/20'
              : 'bg-red-500/20'
          }`}
        >
          {passed ? (
            <Trophy
              className={`h-12 w-12 ${
                isPerfect ? 'text-yellow-500' : 'text-green-500'
              }`}
            />
          ) : (
            <Target className="h-12 w-12 text-red-500" />
          )}
        </div>

        <h2 className="text-2xl font-bold">
          {isPerfect
            ? '¡Puntuación Perfecta!'
            : passed
            ? '¡Quiz Aprobado!'
            : 'Quiz No Aprobado'}
        </h2>

        <p className="mt-2 text-gray-400">
          {isPerfect
            ? 'Has demostrado un dominio completo del tema.'
            : passed
            ? 'Has demostrado un buen entendimiento del tema.'
            : 'Necesitas 70% o más para aprobar. ¡Inténtalo de nuevo!'}
        </p>
      </div>

      {/* Score display */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-4 text-center">
          <p className="text-3xl font-bold text-white">{percentage}%</p>
          <p className="text-sm text-gray-400">Puntuación</p>
        </div>
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-4 text-center">
          <p className="text-3xl font-bold text-white">
            {score}/{totalQuestions}
          </p>
          <p className="text-sm text-gray-400">Correctas</p>
        </div>
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-4 text-center">
          <p className="text-3xl font-bold text-yellow-500">+{xpEarned}</p>
          <p className="flex items-center justify-center gap-1 text-sm text-gray-400">
            <Zap className="h-3 w-3" />
            XP Ganado
          </p>
        </div>
      </div>

      {/* Question summary */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
        <h3 className="mb-4 font-semibold">Resumen de respuestas</h3>
        <div className="space-y-3">
          {questions.map((question, index) => {
            const userAnswer = answers[index]
            const isCorrect = userAnswer === question.correctIndex

            return (
              <div
                key={question.id}
                className="flex items-start gap-3 rounded-lg bg-gray-900/50 p-3"
              >
                <div
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                    isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">
                    {index + 1}. {question.text}
                  </p>
                  {!isCorrect && (
                    <p className="mt-1 text-xs text-gray-500">
                      Respuesta correcta: {question.options[question.correctIndex]}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        {!passed && (
          <Button onClick={onRetry} variant="secondary">
            <RotateCcw className="h-4 w-4" />
            Intentar de nuevo
          </Button>
        )}
        <Button onClick={onContinue} variant="primary">
          {passed ? 'Continuar' : 'Volver al módulo'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
