import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { UserProvider } from './contexts/UserContext'
import { initializeAnalytics } from './utils/analytics'
import './i18n'
import './styles/globals.css'

// Initialize analytics (only if consent given)
initializeAnalytics()

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-gray-900 text-white">Loading...</div>}>
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>
)
