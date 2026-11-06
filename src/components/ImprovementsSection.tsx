import React, { useState } from 'react';
import { SuggestedImprovement } from '../types';
import { Wrench, Copy, Check, ArrowRight, Lightbulb, CheckCheck } from 'lucide-react';

interface ImprovementsSectionProps {
  improvements: SuggestedImprovement[];
}

export const ImprovementsSection: React.FC<ImprovementsSectionProps> = ({ improvements }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = Array.from(new Set(improvements.map((i) => i.category)));

  const filteredImprovements = improvements.filter((imp) => {
    if (filterCategory === 'all') return true;
    return imp.category === filterCategory;
  });

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Actionable Resume Improvements & Rewrites
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Using Google's X-Y-Z formula: <span className="font-medium text-slate-700 dark:text-slate-300">"Accomplished [X] as measured by [Y], by doing [Z]"</span>
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filterCategory === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({improvements.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Improvements List */}
      <div className="space-y-4">
        {filteredImprovements.map((imp, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {imp.issue}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {imp.category}
              </span>
            </div>

            {/* Before vs After comparison if present */}
            {(imp.beforeExample || imp.afterSuggestedRewrite) && (
              <div className="space-y-2 text-xs">
                {imp.beforeExample && (
                  <div className="p-3 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                    <span className="font-semibold text-rose-800 dark:text-rose-300 block mb-1">
                      Before (Weak / Vague):
                    </span>
                    <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      "{imp.beforeExample}"
                    </p>
                  </div>
                )}

                {imp.afterSuggestedRewrite && (
                  <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60 relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                        Suggested ATS High-Impact Rewrite:
                      </span>
                      <button
                        onClick={() => handleCopy(imp.afterSuggestedRewrite || '', idx)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-900/60 hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Rewrite</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="font-mono text-[11px] text-slate-900 dark:text-slate-100 leading-relaxed">
                      "{imp.afterSuggestedRewrite}"
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Simple English explanation */}
            <div className="flex items-start gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-slate-800 dark:text-slate-200">Why this matters:</strong>{' '}
                {imp.explanationInSimpleEnglish}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
