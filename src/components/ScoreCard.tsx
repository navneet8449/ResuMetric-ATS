import React from 'react';
import { ATSAnalysisResult } from '../types';
import { Award, CheckCircle, AlertTriangle, XCircle, Info, ShieldAlert } from 'lucide-react';

interface ScoreCardProps {
  result: ATSAnalysisResult;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ result }) => {
  const { candidateSummary, scoreBreakdown, ethicalGuidance } = result;
  const overall = scoreBreakdown.overallScore;

  // Determine score color theme
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30';
    if (score >= 70) return 'text-sky-600 dark:text-sky-400 border-sky-500 bg-sky-50 dark:bg-sky-950/30';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400 border-amber-500 bg-amber-50 dark:bg-amber-950/30';
    return 'text-rose-600 dark:text-rose-400 border-rose-500 bg-rose-50 dark:bg-rose-950/30';
  };

  const getTierIcon = (tier: string) => {
    if (tier.includes('Strong')) return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    if (tier.includes('Moderate')) return <Info className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
    if (tier.includes('Low')) return <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    return <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Overall Score & Honest Verdict */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Score Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              ATS Match Score
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-6xl font-extrabold tracking-tight font-mono tabular-nums ${getScoreColor(overall).split(' ')[0]}`}>
                {overall}
              </span>
              <span className="text-xl font-medium text-slate-400 dark:text-slate-500 font-mono">
                / 100
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
              {getTierIcon(scoreBreakdown.ratingTier)}
              <span>{scoreBreakdown.ratingTier}</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {scoreBreakdown.ratingSummary}
            </p>
          </div>

          {/* Right: Candidate Profile & Honest Assessment */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {candidateSummary.detectedName || 'Candidate'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{candidateSummary.detectedRoleOrTitle || 'Software Professional'}</span>
              <span aria-hidden="true">·</span>
              <span>Estimated <strong className="font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">{candidateSummary.totalYearsExperienceEstimated}</strong></span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Executive Profile Summary
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {candidateSummary.executiveSummary}
              </p>
            </div>

            {/* Critical Honest Verdict Box */}
            <div className="p-3.5 bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    Honest ATS Verdict:
                  </span>{' '}
                  <span className="text-slate-700 dark:text-slate-300">
                    {candidateSummary.criticalHonestVerdict}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Score Breakdown Strip (4 Category Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Technical Skills Score */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Technical Stack
            </span>
            <span className="font-mono tabular-nums text-xs font-semibold text-slate-800 dark:text-slate-200">
              {scoreBreakdown.technicalSkillsScore.score} / {scoreBreakdown.technicalSkillsScore.max}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full"
              style={{
                width: `${Math.min(100, (scoreBreakdown.technicalSkillsScore.score / scoreBreakdown.technicalSkillsScore.max) * 100)}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 leading-normal">
            {scoreBreakdown.technicalSkillsScore.rationale}
          </p>
        </div>

        {/* Experience & Seniority Score */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Seniority & Fit
            </span>
            <span className="font-mono tabular-nums text-xs font-semibold text-slate-800 dark:text-slate-200">
              {scoreBreakdown.experienceSeniorityScore.score} / {scoreBreakdown.experienceSeniorityScore.max}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-sky-500 h-1.5 rounded-full"
              style={{
                width: `${Math.min(100, (scoreBreakdown.experienceSeniorityScore.score / scoreBreakdown.experienceSeniorityScore.max) * 100)}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 leading-normal">
            {scoreBreakdown.experienceSeniorityScore.rationale}
          </p>
        </div>

        {/* Keyword Requirement Score */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Keyword Density
            </span>
            <span className="font-mono tabular-nums text-xs font-semibold text-slate-800 dark:text-slate-200">
              {scoreBreakdown.keywordRequirementScore.score} / {scoreBreakdown.keywordRequirementScore.max}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-indigo-500 h-1.5 rounded-full"
              style={{
                width: `${Math.min(100, (scoreBreakdown.keywordRequirementScore.score / scoreBreakdown.keywordRequirementScore.max) * 100)}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 leading-normal">
            {scoreBreakdown.keywordRequirementScore.rationale}
          </p>
        </div>

        {/* ATS Formatting Score */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              ATS Parseability
            </span>
            <span className="font-mono tabular-nums text-xs font-semibold text-slate-800 dark:text-slate-200">
              {scoreBreakdown.atsFormattingScore.score} / {scoreBreakdown.atsFormattingScore.max}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-500 h-1.5 rounded-full"
              style={{
                width: `${Math.min(100, (scoreBreakdown.atsFormattingScore.score / scoreBreakdown.atsFormattingScore.max) * 100)}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 leading-normal">
            {scoreBreakdown.atsFormattingScore.rationale}
          </p>
        </div>
      </div>

      {/* Ethical Guidance Reminder */}
      {ethicalGuidance && (
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {ethicalGuidance.ruleReminder || 'Core ATS Principle'}:
            </span>
            <span>{ethicalGuidance.honestNote}</span>
          </div>
        </div>
      )}
    </div>
  );
};
