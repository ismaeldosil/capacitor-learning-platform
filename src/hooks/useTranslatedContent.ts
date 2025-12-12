import { useTranslation } from 'react-i18next'
import { LESSON_CONTENT as LESSON_CONTENT_STATIC } from '../data/lessons'
import { QUIZZES as QUIZZES_STATIC } from '../data/quizzes'
import {
  GAMES as GAMES_STATIC,
  COMMAND_CHALLENGES as COMMAND_CHALLENGES_STATIC,
  PLUGIN_PAIRS as PLUGIN_PAIRS_STATIC,
  BUILD_CHALLENGES as BUILD_CHALLENGES_STATIC,
  STORE_SCENARIOS as STORE_SCENARIOS_STATIC,
  ARCHITECTURE_CHALLENGES as ARCHITECTURE_CHALLENGES_STATIC,
  SECURITY_AUDIT_SCENARIOS as SECURITY_AUDIT_SCENARIOS_STATIC,
} from '../data/games'
import type { Quiz } from '../data/types'

interface ContentBlock {
  type: 'text' | 'code' | 'tip' | 'warning' | 'info' | 'success' | 'list'
  content?: string
  items?: string[]
  code?: string
  language?: string
  filename?: string
  highlightLines?: number[]
}

interface TranslatedLessonBlock {
  type: string
  content?: string
  items?: string[]
}

// Hook to get translated lesson content
export function useTranslatedLessonContent(lessonId: string): ContentBlock[] {
  const { t } = useTranslation('lessonsContent')

  // Get the translated blocks for this lesson
  const translatedBlocks = t(`${lessonId}.blocks`, {
    returnObjects: true,
    defaultValue: null,
  }) as TranslatedLessonBlock[] | null

  // Get static content (which has code blocks)
  const staticContent = LESSON_CONTENT_STATIC[lessonId] || []

  if (!translatedBlocks || !Array.isArray(translatedBlocks)) {
    return staticContent
  }

  // Merge translated text with static code blocks
  return staticContent.map((staticBlock, index) => {
    const translatedBlock = translatedBlocks[index]

    // Code blocks don't get translated
    if (staticBlock.type === 'code') {
      return staticBlock
    }

    // For text blocks, use translated content
    if (translatedBlock) {
      return {
        ...staticBlock,
        content: translatedBlock.content || staticBlock.content,
        items: translatedBlock.items || staticBlock.items,
      }
    }

    return staticBlock
  })
}

// Hook to get translated quiz content
export function useTranslatedQuiz(moduleId: string): Quiz | undefined {
  const { t } = useTranslation('quizzesContent')

  const quizId = `quiz-${moduleId}`
  const staticQuiz = QUIZZES_STATIC.find((q) => q.moduleId === moduleId)

  if (!staticQuiz) return undefined

  const translatedQuestions = t(`${quizId}.questions`, {
    returnObjects: true,
    defaultValue: null,
  }) as
    | Array<{
        id: string
        text: string
        options: string[]
        explanation: string
      }>
    | null

  if (!translatedQuestions || !Array.isArray(translatedQuestions)) {
    return staticQuiz
  }

  return {
    ...staticQuiz,
    questions: staticQuiz.questions.map((q, index) => {
      const translated = translatedQuestions[index]
      if (!translated) return q

      return {
        ...q,
        text: translated.text || q.text,
        options: translated.options || q.options,
        explanation: translated.explanation || q.explanation,
      }
    }),
  }
}

// Hook to get translated game content
export function useTranslatedGame(gameId: string) {
  const { t } = useTranslation('gamesContent')

  const staticGame = GAMES_STATIC.find((g) => g.id === gameId)

  if (!staticGame) return undefined

  const title = t(`${gameId}.title`, { defaultValue: staticGame.title })
  const description = t(`${gameId}.description`, {
    defaultValue: staticGame.description,
  })
  const instructions = t(`${gameId}.instructions`, {
    defaultValue: staticGame.instructions,
  })

  return {
    ...staticGame,
    title,
    description,
    instructions,
  }
}

// Hook to get translated command challenges
export function useTranslatedCommandChallenges() {
  const { t } = useTranslation('gamesContent')

  const translatedChallenges = t('command-builder.challenges', {
    returnObjects: true,
    defaultValue: null,
  }) as
    | Array<{
        id: string
        instruction: string
        description: string
        hint: string
      }>
    | null

  if (!translatedChallenges || !Array.isArray(translatedChallenges)) {
    return COMMAND_CHALLENGES_STATIC
  }

  return COMMAND_CHALLENGES_STATIC.map((challenge, index) => {
    const translated = translatedChallenges[index]
    if (!translated) return challenge

    return {
      ...challenge,
      instruction: translated.instruction || challenge.instruction,
      description: translated.description || challenge.description,
      hint: translated.hint || challenge.hint,
    }
  })
}

// Hook to get translated plugin pairs
export function useTranslatedPluginPairs() {
  const { t } = useTranslation('gamesContent')

  const translatedPairs = t('plugin-matcher.pairs', {
    returnObjects: true,
    defaultValue: null,
  }) as
    | Array<{
        id: string
        useCase: string
        hint: string
      }>
    | null

  if (!translatedPairs || !Array.isArray(translatedPairs)) {
    return PLUGIN_PAIRS_STATIC
  }

  return PLUGIN_PAIRS_STATIC.map((pair, index) => {
    const translated = translatedPairs[index]
    if (!translated) return pair

    return {
      ...pair,
      useCase: translated.useCase || pair.useCase,
      hint: translated.hint || pair.hint,
    }
  })
}

// Hook to get translated build challenges
export function useTranslatedBuildChallenges() {
  const { t } = useTranslation('gamesContent')

  const translatedAndroid = t('build-pipeline.challenges.android.steps', {
    returnObjects: true,
    defaultValue: null,
  }) as Array<{ id: string; name: string; description: string }> | null

  const translatedIos = t('build-pipeline.challenges.ios.steps', {
    returnObjects: true,
    defaultValue: null,
  }) as Array<{ id: string; name: string; description: string }> | null

  return BUILD_CHALLENGES_STATIC.map((challenge) => {
    const translatedSteps =
      challenge.platform === 'android' ? translatedAndroid : translatedIos

    if (!translatedSteps || !Array.isArray(translatedSteps)) {
      return challenge
    }

    return {
      ...challenge,
      steps: challenge.steps.map((step, index) => {
        const translated = translatedSteps[index]
        if (!translated) return step

        return {
          ...step,
          description: translated.description || step.description,
        }
      }),
    }
  })
}

// Hook to get translated store scenarios
export function useTranslatedStoreScenarios() {
  const { t } = useTranslation('gamesContent')

  const translatedScenarios = t('store-reviewer.scenarios', {
    returnObjects: true,
    defaultValue: null,
  }) as
    | Array<{
        id: string
        title: string
        description: string
        issues: string[]
        explanation: string
      }>
    | null

  if (!translatedScenarios || !Array.isArray(translatedScenarios)) {
    return STORE_SCENARIOS_STATIC
  }

  return STORE_SCENARIOS_STATIC.map((scenario, index) => {
    const translated = translatedScenarios[index]
    if (!translated) return scenario

    return {
      ...scenario,
      title: translated.title || scenario.title,
      description: translated.description || scenario.description,
      issues: translated.issues || scenario.issues,
      explanation: translated.explanation || scenario.explanation,
    }
  })
}

// Hook to get game UI translations
export function useGameUITranslations() {
  const { t } = useTranslation('gamesContent')

  return {
    startGame: t('command-builder.ui.startGame', { defaultValue: 'Comenzar Juego' }),
    playAgain: t('command-builder.ui.playAgain', { defaultValue: 'Jugar de Nuevo' }),
    next: t('command-builder.ui.next', { defaultValue: 'Siguiente' }),
    submit: t('command-builder.ui.submit', { defaultValue: 'Enviar' }),
    hint: t('command-builder.ui.hint', { defaultValue: 'Pista' }),
    correct: t('command-builder.ui.correct', { defaultValue: '¡Correcto!' }),
    incorrect: t('command-builder.ui.incorrect', { defaultValue: 'Incorrecto' }),
    completed: t('command-builder.ui.completed', { defaultValue: '¡Juego Completado!' }),
    score: t('command-builder.ui.score', { defaultValue: 'Puntuación' }),
    challenge: t('command-builder.ui.challenge', { defaultValue: 'Desafío' }),
    of: t('command-builder.ui.of', { defaultValue: 'de' }),
    xpReward: t('command-builder.ui.xpReward', { defaultValue: '+100 XP al completar' }),
    readyToPlay: t('command-builder.ui.readyToPlay', { defaultValue: '¿Listo para jugar?' }),
    gameCompleted: t('command-builder.ui.gameCompleted', { defaultValue: 'Juego Completado' }),
  }
}

// Hook to get translated architecture challenges
export function useTranslatedArchitectureChallenges() {
  const { t } = useTranslation('gamesContent')

  const translatedChallenges = t('architecture-planner.challenges', {
    returnObjects: true,
    defaultValue: null,
  }) as
    | Array<{
        id: string
        title: string
        scenario: string
        hint: string
        components: Array<{
          id: string
          name: string
          description: string
        }>
      }>
    | null

  if (!translatedChallenges || !Array.isArray(translatedChallenges)) {
    return ARCHITECTURE_CHALLENGES_STATIC
  }

  return ARCHITECTURE_CHALLENGES_STATIC.map((challenge, index) => {
    const translated = translatedChallenges[index]
    if (!translated) return challenge

    return {
      ...challenge,
      title: translated.title || challenge.title,
      scenario: translated.scenario || challenge.scenario,
      hint: translated.hint || challenge.hint,
      components: challenge.components.map((comp, compIndex) => {
        const translatedComp = translated.components?.[compIndex]
        if (!translatedComp) return comp

        return {
          ...comp,
          description: translatedComp.description || comp.description,
        }
      }),
    }
  })
}

// Hook to get translated security audit scenarios
export function useTranslatedSecurityAuditScenarios() {
  const { t } = useTranslation('gamesContent')

  const translatedScenarios = t('security-audit.scenarios', {
    returnObjects: true,
    defaultValue: null,
  }) as
    | Array<{
        id: string
        title: string
        description: string
        explanation: string
        vulnerabilities: Array<{
          id: string
          description: string
        }>
      }>
    | null

  if (!translatedScenarios || !Array.isArray(translatedScenarios)) {
    return SECURITY_AUDIT_SCENARIOS_STATIC
  }

  return SECURITY_AUDIT_SCENARIOS_STATIC.map((scenario, index) => {
    const translated = translatedScenarios[index]
    if (!translated) return scenario

    return {
      ...scenario,
      title: translated.title || scenario.title,
      description: translated.description || scenario.description,
      explanation: translated.explanation || scenario.explanation,
      vulnerabilities: scenario.vulnerabilities.map((vuln, vulnIndex) => {
        const translatedVuln = translated.vulnerabilities?.[vulnIndex]
        if (!translatedVuln) return vuln

        return {
          ...vuln,
          description: translatedVuln.description || vuln.description,
        }
      }),
    }
  })
}
