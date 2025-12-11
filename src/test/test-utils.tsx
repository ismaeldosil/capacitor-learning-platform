import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from '../contexts/UserContext'

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
}

function renderWithRoute(
  ui: ReactElement,
  { route = '/', path = '/', ...options }: RenderWithRouteOptions = {}
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <UserProvider>
        <Routes>
          <Route path={path} element={ui} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </UserProvider>
    </MemoryRouter>,
    options
  )
}

export * from '@testing-library/react'
export { customRender as render, renderWithRoute }
