import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
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

export * from '@testing-library/react'
export { customRender as render }
