import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from '../contexts/UserContext'
import { STORAGE_KEYS } from '../data/constants'
import type { User } from '../data/types'

interface WrapperProps {
  children: ReactNode
}

function AllProviders({ children }: WrapperProps) {
  return (
    <BrowserRouter>
      <UserProvider>{children}</UserProvider>
    </BrowserRouter>
  )
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options })
}

interface RenderWithRouteOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
  path?: string
  initialUser?: Partial<User>
}

/**
 * Sets up localStorage with initial user data for testing
 */
function setupUserStorage(userData: Partial<User>) {
  const defaultUser: User = {
    id: 'test-user-id',
    name: 'Test Developer',
    xp: 0,
    level: 1,
    streak: 0,
    lastActivityDate: null,
    completedLessons: [],
    completedQuizzes: [],
    completedGames: [],
    badges: [],
    createdAt: new Date().toISOString(),
  }

  const user = { ...defaultUser, ...userData }
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  return user
}

function renderWithRoute(
  ui: ReactElement,
  { route = '/', path = '/', initialUser, ...options }: RenderWithRouteOptions = {}
) {
  // Set up initial user data if provided
  if (initialUser) {
    setupUserStorage(initialUser)
  }

  return render(
    <MemoryRouter initialEntries={[route]}>
      <UserProvider>
        <Routes>
          <Route path={path} element={ui} />
          <Route path="/" element={<div>Home</div>} />
          <Route path="/module/:moduleId" element={<div>Module Page</div>} />
        </Routes>
      </UserProvider>
    </MemoryRouter>,
    options
  )
}

export * from '@testing-library/react'
export { customRender as render, renderWithRoute, setupUserStorage }
