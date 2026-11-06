import React, { useState } from 'react';
import { MissingSkillGap } from '../types';
import { AlertCircle, Flame, ShieldAlert, Sparkles, Filter } from 'lucide-react';

interface MissingSkillsSectionProps {
  missingSkills: MissingSkillGap[];
}

export const MissingSkillsSection: React.FC<MissingSkillsSectionProps> = ({ missingSkills }) => {
  const [filter, setFilter] = useState<string>('all');

  const dealbreakerCount = missingSkills.filter((m) => m.importance.includes('Must-Have')).length;
  const coreCount = missingSkills.filter((m) => m.importance.includes('Core')).length;
  const bonusCount = missingSkills.filter((m) => m.importance.includes('Nice-to-Have')).length;

  const filteredSkills = missingSkills.filter((m) => {
    if (filter === 'dealbreakers') return m.importance.includes('Must-Have');
    if (filter === 'core') return m.importance.includes('Core');
    if (filter === 'nice') return m.importance.includes('Nice-to-Have');
    return true;
  });

  const getPriorityBadge = (importance: string) => {
    if (importance.includes('Must-Have')) {
      return (
        <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          Must-Have Dealbreaker
        </span>
      );
    }
    if (importance.includes('Core')) {
      return (
        <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          Core Stack Requirement
        </span>
      );
    }
    return (
      <span className="text-[11px] font-medium text-sky-700 dark:text-sky-400 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
        Nice-to-Have / Bonus
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Missing Skills & Skill Gaps
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>
              <strong className="font-mono tabular-nums font-semibold text-rose-600 dark:text-rose-400">
                {dealbreakerCount}
              </strong>{' '}
              Dealbreakers
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong className="font-mono tabular-nums font-semibold text-amber-600 dark:text-amber-400">
                {coreCount}
              </strong>{' '}
              Core Requirements
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong className="font-mono tabular-nums font-semibold text-sky-600 dark:text-sky-400">
                {bonusCount}
              </strong>{' '}
              Bonus
            </span>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Gaps ({missingSkills.length})
          </button>
          <button
            onClick={() => setFilter('dealbreakers')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'dealbreakers'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Dealbreakers ({dealbreakerCount})
          </button>
          <button
            onClick={() => setFilter('core')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'core'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Core ({coreCount})
          </button>
        </div>
      </div>

      {/* Skills Gap Grid */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400">
          No missing skills found in this category.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSkills.map((gap, idx) => (
            <div
              key={`${gap.skill}-${idx}`}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-900 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {gap.skill}
                  </span>
                </div>
                {getPriorityBadge(gap.importance)}
              </div>

              <div className="mt-2.5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Why the Job Description asks for it:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {gap.whyImportantInJD}
                  </p>
                </div>

                <div className="p-2.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Honest Action Plan:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {gap.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Honest Warning Box */}
      <div className="p-3.5 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-lg text-xs text-amber-900 dark:text-amber-300 leading-relaxed flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Honest Candidate Advice:</strong> Never copy-paste missing skills into your resume if you have never used them. If an interviewer asks technical depth questions on a skill you claimed, being caught will disqualify you instantly. Only add skills where you possess genuine foundational or project experience.
        </div>
      </div>
    </div>
  );
};
