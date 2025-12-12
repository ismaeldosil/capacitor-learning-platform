import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  AlertTriangle,
  Shield,
  Code,
  Eye,
} from 'lucide-react'
import { useTranslatedSecurityAuditScenarios } from '../../hooks/useTranslatedContent'

interface SecurityAuditProps {
  onComplete: (score: number, total: number) => void
}

export function SecurityAudit({ onComplete }: SecurityAuditProps) {
  const { t } = useTranslation('gamesContent')
  const scenarios = useTranslatedSecurityAuditScenarios()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedVulns, setSelectedVulns] = useState<Set<string>>(new Set())
  const [isVerified, setIsVerified] = useState(false)
  const [score, setScore] = useState(0)

  const currentScenario = scenarios[currentIndex]!
  const vulnerabilities = currentScenario.vulnerabilities

  const handleVulnToggle = useCallback(
    (vulnId: string) => {
      if (isVerified) return

      setSelectedVulns((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(vulnId)) {
          newSet.delete(vulnId)
        } else {
          newSet.add(vulnId)
        }
        return newSet
      })
    },
    [isVerified]
  )

  const handleVerify = useCallback(() => {
    const correctVulns = vulnerabilities
      .filter((v) => v.isVulnerable)
      .map((v) => v.id)
    const correctSet = new Set(correctVulns)
    const userSet = selectedVulns

    // Check for wrong selections (false positives)
    const wrongSelections = Array.from(userSet).filter(
      (id) => !correctSet.has(id)
    ).length
    // Check for missed vulnerabilities (false negatives)
    const missedVulns = Array.from(correctSet).filter(
      (id) => !userSet.has(id)
    ).length

    const isPerfect = wrongSelections === 0 && missedVulns === 0

    setIsVerified(true)
    if (isPerfect) {
      setScore((prev) => prev + 1)
    }
  }, [selectedVulns, vulnerabilities])

  const handleNext = useCallback(() => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedVulns(new Set())
      setIsVerified(false)
    } else {
      onComplete(score, scenarios.length)
    }
  }, [currentIndex, scenarios.length, score, onComplete])

  const isVulnCorrect = useCallback(
    (vulnId: string) => {
      const vuln = vulnerabilities.find((v) => v.id === vulnId)
      return vuln?.isVulnerable ?? false
    },
    [vulnerabilities]
  )

  const getVulnStatus = useCallback(
    (vulnId: string) => {
      if (!isVerified) return 'neutral'

      const isSelected = selectedVulns.has(vulnId)
      const isActualVuln = isVulnCorrect(vulnId)

      if (isSelected && isActualVuln) return 'correct' // True positive
      if (isSelected && !isActualVuln) return 'wrong' // False positive
      if (!isSelected && isActualVuln) return 'missed' // False negative
      return 'neutral' // True negative
    },
    [isVerified, selectedVulns, isVulnCorrect]
  )

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      storage: '💾',
      auth: '🔐',
      network: '🌐',
      crypto: '🔑',
      platform: '📱',
    }
    return icons[category] || '⚠️'
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      storage: t('ui.categoryStorage', { defaultValue: 'Almacenamiento' }),
      auth: t('ui.categoryAuth', { defaultValue: 'Autenticación' }),
      network: t('ui.categoryNetwork', { defaultValue: 'Red' }),
      crypto: t('ui.categoryCrypto', { defaultValue: 'Criptografía' }),
      platform: t('ui.categoryPlatform', { defaultValue: 'Plataforma' }),
    }
    return labels[category] || category
  }

  const correctCount = Array.from(selectedVulns).filter((id) =>
    isVulnCorrect(id)
  ).length
  const wrongCount = Array.from(selectedVulns).filter(
    (id) => !isVulnCorrect(id)
  ).length
  const missedCount = vulnerabilities.filter(
    (v) => v.isVulnerable && !selectedVulns.has(v.id)
  ).length

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          {t('ui.scenario', { defaultValue: 'Escenario' })} {currentIndex + 1}{' '}
          {t('ui.of', { defaultValue: 'de' })} {scenarios.length}
        </span>
        <span className="text-sm font-medium text-green-400">
          {t('ui.score', { defaultValue: 'Puntuación' })}: {score}/
          {currentIndex + (isVerified ? 1 : 0)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-gray-700">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-300"
          style={{
            width: `${((currentIndex + (isVerified ? 1 : 0)) / scenarios.length) * 100}%`,
          }}
        />
      </div>

      {/* Scenario Header */}
      <div className="card">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20">
            <Shield className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold">{currentScenario.title}</h3>
            <p className="text-xs text-red-400">
              {t('ui.securityReview', { defaultValue: 'Auditoría de Seguridad' })}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-300">{currentScenario.description}</p>
      </div>

      {/* Code Snippet */}
      <div className="card overflow-hidden p-0">
        <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-2">
          <Code className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400">
            {currentScenario.language}
          </span>
        </div>
        <pre className="overflow-x-auto p-4">
          <code className="text-sm text-gray-300 whitespace-pre-wrap">
            {currentScenario.codeSnippet}
          </code>
        </pre>
      </div>

      {/* Vulnerabilities List */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Eye className="h-4 w-4" />
          <span>
            {t('ui.selectVulnerabilities', {
              defaultValue: 'Selecciona las vulnerabilidades de seguridad:',
            })}
          </span>
        </div>

        {vulnerabilities.map((vuln) => {
          const status = getVulnStatus(vuln.id)
          const isSelected = selectedVulns.has(vuln.id)

          return (
            <button
              key={vuln.id}
              onClick={() => handleVulnToggle(vuln.id)}
              disabled={isVerified}
              className={`flex w-full items-start gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                isVerified
                  ? status === 'correct'
                    ? 'border-green-500 bg-green-600/10'
                    : status === 'wrong'
                      ? 'border-red-500 bg-red-600/10'
                      : status === 'missed'
                        ? 'border-yellow-500 bg-yellow-600/10'
                        : 'border-gray-600 bg-gray-800'
                  : isSelected
                    ? 'border-orange-500 bg-orange-600/20'
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500'
              } ${isVerified ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={vuln.description}
              aria-pressed={isSelected}
            >
              {/* Checkbox */}
              <div
                className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border-2 ${
                  isVerified
                    ? status === 'correct'
                      ? 'border-green-500 bg-green-500'
                      : status === 'wrong'
                        ? 'border-red-500 bg-red-500'
                        : status === 'missed'
                          ? 'border-yellow-500'
                          : 'border-gray-600'
                    : isSelected
                      ? 'border-orange-500 bg-orange-500'
                      : 'border-gray-600'
                }`}
              >
                {(isSelected || status === 'missed') && (
                  <span className="text-white">
                    {status === 'correct' && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    {status === 'wrong' && <XCircle className="h-4 w-4" />}
                    {status === 'missed' && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                    {!isVerified && isSelected && '✓'}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {getCategoryIcon(vuln.category)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {getCategoryLabel(vuln.category)}
                  </span>
                </div>
                <p
                  className={`mt-1 text-sm ${status === 'wrong' ? 'line-through opacity-50' : ''}`}
                >
                  {vuln.description}
                </p>
                {vuln.code && (
                  <code className="mt-1 inline-block rounded bg-gray-700 px-2 py-0.5 text-xs text-orange-300">
                    {vuln.code}
                  </code>
                )}
              </div>

              {/* Status Label */}
              {isVerified && (
                <span
                  className={`flex-shrink-0 text-xs ${
                    status === 'correct'
                      ? 'text-green-400'
                      : status === 'wrong'
                        ? 'text-red-400'
                        : status === 'missed'
                          ? 'text-yellow-400'
                          : ''
                  }`}
                >
                  {status === 'correct' &&
                    t('ui.correctAnswer', { defaultValue: 'Correcto' })}
                  {status === 'wrong' &&
                    t('ui.incorrect', { defaultValue: 'Incorrecto' })}
                  {status === 'missed' &&
                    t('ui.notSelected', { defaultValue: 'No seleccionado' })}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Results */}
      {isVerified && (
        <div
          className={`rounded-lg border p-4 ${
            wrongCount === 0 && missedCount === 0
              ? 'border-green-600/30 bg-green-600/10'
              : 'border-yellow-600/30 bg-yellow-600/10'
          }`}
        >
          <div className="mb-3 flex items-start gap-3">
            {wrongCount === 0 && missedCount === 0 ? (
              <CheckCircle className="mt-0.5 h-5 w-5 text-green-400" />
            ) : (
              <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-400" />
            )}
            <div>
              <p className="font-medium">
                {wrongCount === 0 && missedCount === 0
                  ? t('ui.perfectAudit', {
                      defaultValue:
                        '¡Auditoría perfecta! Identificaste todas las vulnerabilidades.',
                    })
                  : `${correctCount} ${t('ui.correctMatches', { defaultValue: 'correctas' })}, ${wrongCount} ${t('ui.falsePositives', { defaultValue: 'falsos positivos' })}, ${missedCount} ${t('ui.missed', { defaultValue: 'no detectadas' })}`}
              </p>
            </div>
          </div>

          {/* Explanation */}
          <div className="rounded-lg bg-gray-800 p-3">
            <p className="text-sm font-medium text-gray-300">
              {t('ui.explanation', { defaultValue: 'Explicación' })}:
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {currentScenario.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end">
        {!isVerified ? (
          <button
            onClick={handleVerify}
            disabled={selectedVulns.size === 0}
            className="btn-primary flex items-center gap-2"
            aria-label={t('ui.verify', { defaultValue: 'Verificar' })}
          >
            {t('ui.verify', { defaultValue: 'Verificar' })}
            <CheckCircle className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn-primary flex items-center gap-2"
            aria-label={
              currentIndex < scenarios.length - 1
                ? t('ui.next', { defaultValue: 'Siguiente' })
                : t('ui.viewResults', { defaultValue: 'Ver resultados' })
            }
          >
            {currentIndex < scenarios.length - 1
              ? t('ui.next', { defaultValue: 'Siguiente' })
              : t('ui.viewResults', { defaultValue: 'Ver resultados' })}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Legend */}
      {isVerified && (
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span>{t('ui.legend', { defaultValue: 'Leyenda' })}:</span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded bg-green-500" />{' '}
            {t('ui.vulnerabilityFound', {
              defaultValue: 'Vulnerabilidad detectada',
            })}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded bg-red-500" />{' '}
            {t('ui.falsePositive', { defaultValue: 'Falso positivo' })}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded border-2 border-yellow-500" />{' '}
            {t('ui.vulnerabilityMissed', {
              defaultValue: 'Vulnerabilidad no detectada',
            })}
          </span>
        </div>
      )}
    </div>
  )
}
