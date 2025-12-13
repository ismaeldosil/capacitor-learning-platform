import ReactGA from 'react-ga4'

// Analytics configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

// Cookie consent storage key
const ANALYTICS_CONSENT_KEY = 'capacitor-learning-analytics-consent'

/**
 * Check if user has given consent for analytics
 */
export const hasAnalyticsConsent = (): boolean => {
  return localStorage.getItem(ANALYTICS_CONSENT_KEY) === 'true'
}

/**
 * Set analytics consent
 */
export const setAnalyticsConsent = (consent: boolean): void => {
  localStorage.setItem(ANALYTICS_CONSENT_KEY, consent.toString())
  if (consent) {
    initializeAnalytics()
  }
}

/**
 * Get current consent status (null if not set)
 */
export const getConsentStatus = (): boolean | null => {
  const consent = localStorage.getItem(ANALYTICS_CONSENT_KEY)
  if (consent === null) return null
  return consent === 'true'
}

/**
 * Initialize Google Analytics 4
 */
export const initializeAnalytics = (): void => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('GA_MEASUREMENT_ID not configured')
    return
  }

  if (!hasAnalyticsConsent()) {
    return
  }

  ReactGA.initialize(GA_MEASUREMENT_ID)
}

/**
 * Track page view
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!hasAnalyticsConsent()) return

  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title,
  })
}

/**
 * Track custom event
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  if (!hasAnalyticsConsent()) return

  ReactGA.event({
    category,
    action,
    label,
    value,
  })
}

// ==========================================
// Specific Event Tracking Functions
// ==========================================

/**
 * Track lesson completion
 */
export const trackLessonComplete = (moduleId: string, lessonId: string): void => {
  trackEvent('Learning', 'lesson_complete', `${moduleId}/${lessonId}`)
}

/**
 * Track quiz start
 */
export const trackQuizStart = (quizId: string): void => {
  trackEvent('Quiz', 'quiz_start', quizId)
}

/**
 * Track quiz completion
 */
export const trackQuizComplete = (
  quizId: string,
  score: number,
  isPerfect: boolean,
  passed: boolean
): void => {
  trackEvent('Quiz', 'quiz_complete', quizId, score)

  if (isPerfect) {
    trackEvent('Achievement', 'perfect_quiz', quizId)
  }

  if (passed) {
    trackEvent('Quiz', 'quiz_passed', quizId, score)
  } else {
    trackEvent('Quiz', 'quiz_failed', quizId, score)
  }
}

/**
 * Track game start
 */
export const trackGameStart = (gameId: string): void => {
  trackEvent('Game', 'game_start', gameId)
}

/**
 * Track game completion
 */
export const trackGameComplete = (gameId: string, score: number): void => {
  trackEvent('Game', 'game_complete', gameId, score)
}

/**
 * Track level up
 */
export const trackLevelUp = (newLevel: number, levelName: string): void => {
  trackEvent('Progression', 'level_up', levelName, newLevel)
}

/**
 * Track badge earned
 */
export const trackBadgeEarned = (badgeId: string, badgeName: string): void => {
  trackEvent('Achievement', 'badge_earned', `${badgeId}: ${badgeName}`)
}

/**
 * Track XP gained
 */
export const trackXPGained = (amount: number, source: string): void => {
  trackEvent('Progression', 'xp_gained', source, amount)
}

/**
 * Track module completion
 */
export const trackModuleComplete = (moduleId: string): void => {
  trackEvent('Learning', 'module_complete', moduleId)
}

/**
 * Track streak milestone
 */
export const trackStreakMilestone = (days: number): void => {
  trackEvent('Engagement', 'streak_milestone', `${days}_days`, days)
}

// ==========================================
// User Properties
// ==========================================

/**
 * Set user properties for better segmentation
 */
export const setUserProperties = (properties: {
  userLevel?: number
  totalXP?: number
  modulesCompleted?: number
}): void => {
  if (!hasAnalyticsConsent()) return

  ReactGA.gtag('set', 'user_properties', {
    user_level: properties.userLevel,
    total_xp: properties.totalXP,
    modules_completed: properties.modulesCompleted,
  })
}
