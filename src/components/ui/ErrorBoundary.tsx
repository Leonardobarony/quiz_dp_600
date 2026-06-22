'use client'

import React from 'react'

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-4">
          <p className="text-2xl">⚠️</p>
          <h2 className="text-lg font-semibold text-slate-800">Algo deu errado</h2>
          <p className="text-sm text-slate-500">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Tentar novamente
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
