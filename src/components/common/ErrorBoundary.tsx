import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 p-8"
          role="alert"
          aria-live="assertive"
        >
          <AlertTriangle className="h-12 w-12 text-red-500" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-red-500">
            Algo salió mal
          </h2>
          <p className="mt-2 text-center text-gray-400">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
          </p>
          {this.state.error && (
            <details className="mt-4 w-full max-w-md">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-400">
                Detalles del error
              </summary>
              <pre className="mt-2 overflow-auto rounded bg-gray-800 p-3 text-xs text-gray-400">
                {this.state.error.message}
              </pre>
            </details>
          )}
          <button
            onClick={this.handleRetry}
            className="mt-6 flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700"
            aria-label="Intentar de nuevo"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Intentar de nuevo
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
