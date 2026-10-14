import React, { Component, type ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('UI Crash Caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '16px' }}>PEEKLY</h1>
          <button 
            type="button"
            onClick={() => {
              try {
                if (typeof window !== 'undefined' && window.localStorage) {
                  localStorage.clear();
                }
              } catch {}
              window.location.href = '/';
            }}
            style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none', padding: '12px 24px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase' }}
          >
            RELOAD
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}
