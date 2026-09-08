import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[AAi ErrorBoundary caught render error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleResetWorkspace = () => {
    try {
      localStorage.removeItem('aai_agent_os_tasks_v1');
      localStorage.removeItem('aai_agent_os_active_task_id');
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('aai_parakkai_')) {
          localStorage.removeItem(key);
        }
      });
    } catch {
      // ignore
    }
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null, errorInfo: null });
    try {
      window.location.reload();
    } catch {
      // fallback
    }
  };

  private handleReturnHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020914] text-[#eaf7ff] flex flex-col items-center justify-center p-4 font-mono select-none">
          <div className="max-w-lg w-full bg-[#021326] border border-[#00e3fd]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,227,253,0.15)] text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#00e3fd]/15 border border-[#00e3fd]/40 flex items-center justify-center text-[#00e3fd] shadow-[0_0_20px_rgba(0,227,253,0.3)]">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#00e3fd] px-2 py-0.5 rounded bg-[#00e3fd]/10 border border-[#00e3fd]/30 inline-block">
                AAi Workspace Resilient Guard
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {this.props.fallbackTitle || 'Workspace View Recovered'}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                An unexpected component state was safely intercepted. Your workspace data and universe state remain intact.
              </p>
            </div>

            {this.state.error && (
              <div className="text-left bg-[#010a16] border border-slate-800 rounded-xl p-3 text-[11px] text-amber-300 font-mono overflow-x-auto max-h-24">
                <code>{this.state.error.message || 'Render exception handled.'}</code>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleReturnHome}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0070ba] hover:bg-[#005a96] border border-[#00e3fd]/50 text-xs font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,227,253,0.25)]"
              >
                <Home className="w-3.5 h-3.5 text-[#00e3fd]" />
                <span>Return to Home</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetWorkspace}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset Workspace</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
