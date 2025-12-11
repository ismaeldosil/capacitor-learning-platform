import { useState } from 'react'
import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-react'
import { AnswerOption } from './AnswerOption'
import { Button } from '../common/Button'
import type { QuizQuestion as QuizQuestionType } from '../../data/types'

interface QuizQuestionProps {
  question: QuizQuestionType
  questionNumber: number
  totalQuestions: number
  selectedAnswer: number | null
  onSelectAnswer: (index: number) => void
  onNext: () => void
  showExplanation?: boolean
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  showExplanation = true,
}: QuizQuestionProps) {
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    setShowResult(true)
  }

  const handleNext = () => {
    setShowResult(false)
    onNext()
  }

  const isCorrect = selectedAnswer === question.correctIndex
  const isLastQuestion = questionNumber === totalQuestions

  return (
    <div className="space-y-6">
      {/* Question header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <HelpCircle className="h-4 w-4" />
          <span>
            Pregunta {questionNumber} de {totalQuestions}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-white">{question.text}</h2>
      </div>

      {/* Options */}
      <div className="space-y-3" role="listbox" aria-label="Opciones de respuesta">
        {question.options.map((option, index) => (
          <AnswerOption
            key={index}
            text={option}
            index={index}
            isSelected={selectedAnswer === index}
            isCorrect={index === question.correctIndex}
            showResult={showResult}
            disabled={showResult}
            onSelect={() => onSelectAnswer(index)}
          />
        ))}
      </div>

      {/* Explanation (shown after answering) */}
      {showResult && showExplanation && (
        <div
          className={`rounded-xl border p-4 ${
            isCorrect
              ? 'border-green-500/30 bg-green-500/10'
              : 'border-orange-500/30 bg-orange-500/10'
          }`}
        >
          <div className="flex items-start gap-3">
            <CheckCircle
              className={`h-5 w-5 flex-shrink-0 ${
                isCorrect ? 'text-green-500' : 'text-orange-500'
              }`}
            />
            <div>
              <p
                className={`font-semibold ${
                  isCorrect ? 'text-green-500' : 'text-orange-500'
                }`}
              >
                {isCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}
              </p>
              <p className="mt-1 text-gray-300">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end pt-4">
        {!showResult ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            variant="primary"
          >
            Verificar respuesta
            <CheckCircle className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleNext} variant="primary">
            {isLastQuestion ? 'Ver resultados' : 'Siguiente pregunta'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
