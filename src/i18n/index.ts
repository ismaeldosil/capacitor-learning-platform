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

import commonEn from './locales/en/common.json'
import dashboardEn from './locales/en/dashboard.json'
import moduleEn from './locales/en/module.json'
import lessonEn from './locales/en/lesson.json'
import quizEn from './locales/en/quiz.json'
import gameEn from './locales/en/game.json'
import gamificationEn from './locales/en/gamification.json'

import commonPt from './locales/pt/common.json'
import dashboardPt from './locales/pt/dashboard.json'
import modulePt from './locales/pt/module.json'
import lessonPt from './locales/pt/lesson.json'
import quizPt from './locales/pt/quiz.json'
import gamePt from './locales/pt/game.json'
import gamificationPt from './locales/pt/gamification.json'

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
  },
  en: {
    common: commonEn,
    dashboard: dashboardEn,
    module: moduleEn,
    lesson: lessonEn,
    quiz: quizEn,
    game: gameEn,
    gamification: gamificationEn,
  },
  pt: {
    common: commonPt,
    dashboard: dashboardPt,
    module: modulePt,
    lesson: lessonPt,
    quiz: quizPt,
    game: gamePt,
    gamification: gamificationPt,
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
