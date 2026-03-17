
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-slate-950 rounded-[2.5rem] border border-white/10">
          <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Oups ! Quelque chose s'est mal passé.</h2>
          <p className="text-slate-400 max-w-md mb-8">
            Une erreur inattendue est survenue dans cette section. Nos ingénieurs (et Finn) ont été alertés.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl transition-all border border-white/10"
          >
            <RefreshCw size={18} />
            Recharger la page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-8 p-4 bg-black/50 rounded-lg text-rose-400 text-xs text-left max-w-full overflow-auto">
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
