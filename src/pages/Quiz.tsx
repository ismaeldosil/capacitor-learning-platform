import { useState, useCallback } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { MODULES, XP_REWARDS } from '../data/constants'
import { getQuizByModuleId } from '../data/quizzes'
import { ArrowLeft, Brain } from 'lucide-react'
import { QuizQuestion, QuizProgress, QuizResult } from '../components/quiz'
import { trackQuizStart, trackQuizComplete } from '../utils'

type QuizState = 'intro' | 'playing' | 'result'

export function Quiz() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  const { user, isQuizCompleted, completeQuiz } = useUser()

  const [quizState, setQuizState] = useState<QuizState>('intro')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)

  const module = MODULES.find((m) => m.id === moduleId)
  const quiz = module ? getQuizByModuleId(module.id) : undefined

  const handleSelectAnswer = useCallback((index: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[currentQuestionIndex] = index
      return newAnswers
    })
  }, [currentQuestionIndex])

  const handleNextQuestion = useCallback(() => {
    if (!quiz) return

    const currentQuestion = quiz.questions[currentQuestionIndex]
    if (!currentQuestion) return

    // Calculate if current answer is correct
    const currentAnswer = answers[currentQuestionIndex]
    const isCorrect = currentAnswer === currentQuestion.correctIndex

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    // Move to next question or show results
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Calculate final score by counting all correct answers
      let finalScore = 0
      for (let i = 0; i < quiz.questions.length; i++) {
        const question = quiz.questions[i]
        if (question && answers[i] === question.correctIndex) {
          finalScore++
        }
      }
      // Add last answer if not already counted
      if (currentAnswer === currentQuestion.correctIndex && answers[currentQuestionIndex] !== currentAnswer) {
        finalScore++
      }

      setScore(finalScore)
      setQuizState('result')
    }
  }, [quiz, currentQuestionIndex, answers])

  const handleStartQuiz = useCallback(() => {
    if (!quiz) return
    setAnswers(new Array(quiz.questions.length).fill(-1))
    setCurrentQuestionIndex(0)
    setScore(0)
    setQuizState('playing')
    trackQuizStart(quiz.id)
  }, [quiz])

  const handleRetry = useCallback(() => {
    handleStartQuiz()
  }, [handleStartQuiz])

  const handleContinue = useCallback(() => {
    if (!quiz || !module) return

    const didPass = (score / quiz.questions.length) * 100 >= quiz.passingScore
    const perfectScore = score === quiz.questions.length

    // Track quiz completion
    trackQuizComplete(quiz.id, score, perfectScore, didPass)

    if (didPass && !isQuizCompleted(quiz.id)) {
      completeQuiz(quiz.id, score, quiz.questions.length)
    }

    navigate(`/module/${moduleId}`)
  }, [quiz, module, score, moduleId, isQuizCompleted, completeQuiz, navigate])

  if (!module) {
    return <Navigate to="/" replace />
  }

  // Check if module is locked
  if (user.xp < module.requiredXP) {
    return <Navigate to="/" replace />
  }

  // Check if all lessons are completed
  const allLessonsCompleted = module.lessons.every((lessonId) =>
    user.completedLessons.includes(lessonId)
  )

  if (!allLessonsCompleted) {
    return <Navigate to={`/module/${moduleId}`} replace />
  }

  const quizDone = isQuizCompleted(module.quizId)

  // No quiz data available
  if (!quiz) {
    return (
      <div className="mx-auto max-w-4xl animate-in">
        <Link
          to={`/module/${moduleId}`}
          className="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al módulo</span>
        </Link>

        <div className="card">
          <div className="py-12 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-purple-600/20">
              <Brain className="h-12 w-12 text-purple-400" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Quiz en Desarrollo</h2>
            <p className="mx-auto max-w-md text-gray-400">
              El quiz para este módulo estará disponible próximamente.
            </p>
            <div className="mt-8">
              <Link to={`/module/${moduleId}`} className="btn-primary">
                Volver al módulo
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Calculate results data
  const passed = (score / quiz.questions.length) * 100 >= quiz.passingScore
  const isPerfect = score === quiz.questions.length
  const xpEarned = passed
    ? isPerfect
      ? XP_REWARDS.QUIZ_PERFECT
      : XP_REWARDS.QUIZ_PASSED
    : 0

  const currentQuestion = quiz.questions[currentQuestionIndex]

  return (
    <div className="mx-auto max-w-4xl animate-in">
      {/* Back Link */}
      <Link
        to={`/module/${moduleId}`}
        className="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Volver al módulo</span>
      </Link>

      {/* Quiz Header */}
      <div className="card mb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-600 text-3xl">
            <Brain className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Quiz: {module.title}</h1>
            <p className="mt-1 text-gray-400">
              Evalúa tus conocimientos del módulo
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {quizDone
                ? '✅ Quiz completado'
                : `📊 ${quiz.questions.length} preguntas • ${quiz.passingScore}% para aprobar`}
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="card">
        {quizState === 'intro' && (
          <div className="py-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-600/20">
              <Brain className="h-10 w-10 text-purple-400" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">
              {quizDone ? '¿Listo para mejorar tu puntuación?' : '¿Listo para el quiz?'}
            </h2>
            <p className="mx-auto mb-8 max-w-md text-gray-400">
              {quizDone
                ? 'Ya completaste este quiz. Puedes intentarlo de nuevo para reforzar tus conocimientos.'
                : `Este quiz tiene ${quiz.questions.length} preguntas. Necesitas ${quiz.passingScore}% para aprobar y desbloquear el mini-juego.`}
            </p>
            <div className="space-y-4">
              <button onClick={handleStartQuiz} className="btn-primary">
                {quizDone ? 'Repetir Quiz' : 'Comenzar Quiz'}
              </button>
              {quizDone && (
                <p className="text-sm text-green-500">
                  +{XP_REWARDS.QUIZ_PASSED} XP ganados anteriormente
                </p>
              )}
            </div>
          </div>
        )}

        {quizState === 'playing' && currentQuestion && (
          <div className="space-y-8">
            <QuizProgress
              currentQuestion={currentQuestionIndex}
              totalQuestions={quiz.questions.length}
              answers={answers}
            />
            <QuizQuestion
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={quiz.questions.length}
              selectedAnswer={answers[currentQuestionIndex] !== undefined && answers[currentQuestionIndex] >= 0 ? answers[currentQuestionIndex] : null}
              onSelectAnswer={handleSelectAnswer}
              onNext={handleNextQuestion}
            />
          </div>
        )}

        {quizState === 'result' && (
          <QuizResult
            score={score}
            totalQuestions={quiz.questions.length}
            passed={passed}
            xpEarned={xpEarned}
            isPerfect={isPerfect}
            questions={quiz.questions}
            answers={answers}
            onRetry={handleRetry}
            onContinue={handleContinue}
          />
        )}
      </div>
    </div>
  )
}
