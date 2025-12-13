import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { Module } from './pages/Module'
import { Lesson } from './pages/Lesson'
import { Quiz } from './pages/Quiz'
import { Game } from './pages/Game'
import { NotFound } from './pages/NotFound'
import { ErrorBoundary, CookieConsent } from './components/common'
import { usePageTracking } from './hooks'

function App() {
  // Track page views on route changes
  usePageTracking()

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="module/:moduleId" element={<Module />} />
          <Route path="lesson/:moduleId/:lessonId" element={<Lesson />} />
          <Route path="quiz/:moduleId" element={<Quiz />} />
          <Route path="game/:moduleId" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <CookieConsent />
    </ErrorBoundary>
  )
}

export default App
