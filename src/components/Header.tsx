import React from 'react';
import { FileSearch, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  hasResult: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  activeSection,
  onNavigate,
  hasResult,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-semibold shadow-xs">
            <FileSearch className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap">
              ResuMetric ATS
            </span>
          </div>
        </div>

        {/* Zone 2: Single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onNavigate('scanner')}
            className={`transition-colors hover:text-slate-900 dark:hover:text-white whitespace-nowrap ${
              activeSection === 'scanner' ? 'text-slate-900 dark:text-white font-semibold' : ''
            }`}
          >
            Scanner & Input
          </button>
          {hasResult && (
            <>
              <button
                onClick={() => onNavigate('overview')}
                className={`transition-colors hover:text-slate-900 dark:hover:text-white whitespace-nowrap ${
                  activeSection === 'overview' ? 'text-slate-900 dark:text-white font-semibold' : ''
                }`}
              >
                Match Score
              </button>
              <button
                onClick={() => onNavigate('skills')}
                className={`transition-colors hover:text-slate-900 dark:hover:text-white whitespace-nowrap ${
                  activeSection === 'skills' ? 'text-slate-900 dark:text-white font-semibold' : ''
                }`}
              >
                Technical Skills
              </button>
              <button
                onClick={() => onNavigate('gaps')}
                className={`transition-colors hover:text-slate-900 dark:hover:text-white whitespace-nowrap ${
                  activeSection === 'gaps' ? 'text-slate-900 dark:text-white font-semibold' : ''
                }`}
              >
                Missing Skills
              </button>
              <button
                onClick={() => onNavigate('improvements')}
                className={`transition-colors hover:text-slate-900 dark:hover:text-white whitespace-nowrap ${
                  activeSection === 'improvements' ? 'text-slate-900 dark:text-white font-semibold' : ''
                }`}
              >
                Improvements
              </button>
              <button
                onClick={() => onNavigate('clarifications')}
                className={`transition-colors hover:text-slate-900 dark:hover:text-white whitespace-nowrap ${
                  activeSection === 'clarifications' ? 'text-slate-900 dark:text-white font-semibold' : ''
                }`}
              >
                Clarifications
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {hasResult ? (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              New Analysis
            </button>
          ) : (
            <div className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              <span>ATS Engine</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ready</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
