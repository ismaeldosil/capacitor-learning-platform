import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translations
import commonEs from './locales/es/common.json'
import dashboardEs from './locales/es/dashboard.json'
import moduleEs from './locales/es/module.json'
import lessonEs from './locales/es/lesson.json'
import quizEs from './locales/es/quiz.json'
import gameEs from './locales/es/game.json'
import gamificationEs from './locales/es/gamification.json'
import searchEs from './locales/es/search.json'
import lessonsContentEs from './locales/es/content/lessons.json'
import quizzesContentEs from './locales/es/content/quizzes.json'
import gamesContentEs from './locales/es/content/games.json'

import commonEn from './locales/en/common.json'
import dashboardEn from './locales/en/dashboard.json'
import moduleEn from './locales/en/module.json'
import lessonEn from './locales/en/lesson.json'
import quizEn from './locales/en/quiz.json'
import gameEn from './locales/en/game.json'
import gamificationEn from './locales/en/gamification.json'
import searchEn from './locales/en/search.json'
import lessonsContentEn from './locales/en/content/lessons.json'
import quizzesContentEn from './locales/en/content/quizzes.json'
import gamesContentEn from './locales/en/content/games.json'

import commonPt from './locales/pt/common.json'
import dashboardPt from './locales/pt/dashboard.json'
import modulePt from './locales/pt/module.json'
import lessonPt from './locales/pt/lesson.json'
import quizPt from './locales/pt/quiz.json'
import gamePt from './locales/pt/game.json'
import gamificationPt from './locales/pt/gamification.json'
import searchPt from './locales/pt/search.json'
import lessonsContentPt from './locales/pt/content/lessons.json'
import quizzesContentPt from './locales/pt/content/quizzes.json'
import gamesContentPt from './locales/pt/content/games.json'

// Supported languages
export const SUPPORTED_LANGUAGES = ['es', 'en', 'pt'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]
export const DEFAULT_LANGUAGE: SupportedLanguage = 'es'

// Storage key
export const LANGUAGE_STORAGE_KEY = 'capacitor-learning-language'

// Language labels for UI
export const LANGUAGE_LABELS: Record<
  SupportedLanguage,
  { native: string; flag: string }
> = {
  es: { native: 'Español', flag: '🇪🇸' },
  en: { native: 'English', flag: '🇺🇸' },
  pt: { native: 'Português', flag: '🇧🇷' },
}

// Resources
const resources = {
  es: {
    common: commonEs,
    dashboard: dashboardEs,
    module: moduleEs,
    lesson: lessonEs,
    quiz: quizEs,
    game: gameEs,
    gamification: gamificationEs,
    search: searchEs,
    lessonsContent: lessonsContentEs,
    quizzesContent: quizzesContentEs,
    gamesContent: gamesContentEs,
  },
  en: {
    common: commonEn,
    dashboard: dashboardEn,
    module: moduleEn,
    lesson: lessonEn,
    quiz: quizEn,
    game: gameEn,
    gamification: gamificationEn,
    search: searchEn,
    lessonsContent: lessonsContentEn,
    quizzesContent: quizzesContentEn,
    gamesContent: gamesContentEn,
  },
  pt: {
    common: commonPt,
    dashboard: dashboardPt,
    module: modulePt,
    lesson: lessonPt,
    quiz: quizPt,
    game: gamePt,
    gamification: gamificationPt,
    search: searchPt,
    lessonsContent: lessonsContentPt,
    quizzesContent: quizzesContentPt,
    gamesContent: gamesContentPt,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,

    // Namespaces
    ns: [
      'common',
      'dashboard',
      'module',
      'lesson',
      'quiz',
      'game',
      'gamification',
      'search',
      'lessonsContent',
      'quizzesContent',
      'gamesContent',
    ],
    defaultNS: 'common',

    // Detection configuration
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },

    // Interpolation settings
    interpolation: {
      escapeValue: false, // React already escapes
    },

    // React settings
    react: {
      useSuspense: false,
    },
  })

export default i18n
