// Utils barrel file
export {
  getModuleStatus,
  getModuleProgress,
  getCompletedLessonsCount,
  getLessonTitle,
  getGameTitle,
} from './module-utils'

export {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackLessonComplete,
  trackQuizStart,
  trackQuizComplete,
  trackGameStart,
  trackGameComplete,
  trackLevelUp,
  trackBadgeEarned,
  trackXPGained,
  trackModuleComplete,
  trackStreakMilestone,
  setUserProperties,
  hasAnalyticsConsent,
  setAnalyticsConsent,
  getConsentStatus,
} from './analytics'
