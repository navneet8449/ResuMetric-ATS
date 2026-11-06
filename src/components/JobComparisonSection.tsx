import React, { useState } from 'react';
import { JobComparison } from '../types';
import { GitCompare, CheckCircle2, AlertTriangle, XCircle, FileCheck, Hash } from 'lucide-react';

interface JobComparisonSectionProps {
  comparison: JobComparison;
}

export const JobComparisonSection: React.FC<JobComparisonSectionProps> = ({ comparison }) => {
  const [subTab, setSubTab] = useState<'requirements' | 'keywords' | 'audit'>('requirements');

  const fulfilledCount = comparison.mustHaveRequirements.filter((r) => r.status === 'Fulfilled').length;
  const partialCount = comparison.mustHaveRequirements.filter((r) => r.status === 'Partially Met').length;
  const missingCount = comparison.mustHaveRequirements.filter((r) => r.status === 'Missing').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Fulfilled':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />;
      case 'Partially Met':
        return <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />;
      case 'Missing':
      default:
        return <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />;
    }
  };

  const getAuditStatusBadge = (status: 'Pass' | 'Warning' | 'Issue') => {
    switch (status) {
      case 'Pass':
        return <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Pass</span>;
      case 'Warning':
        return <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">Warning</span>;
      case 'Issue':
      default:
        return <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400">Fix Needed</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <GitCompare className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Resume vs. Job Description Comparison
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Target Role:{' '}
            <strong className="text-slate-800 dark:text-slate-200">
              {comparison.jobTitle || 'Target Position'}
            </strong>{' '}
            {comparison.companyIndustry && `(${comparison.companyIndustry})`}
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setSubTab('requirements')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              subTab === 'requirements'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Requirements ({comparison.mustHaveRequirements.length})
          </button>
          <button
            onClick={() => setSubTab('keywords')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              subTab === 'keywords'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Keywords ({comparison.keywordDensityComparison.length})
          </button>
          <button
            onClick={() => setSubTab('audit')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              subTab === 'audit'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ATS Audit ({comparison.atsFormattingAudit.length})
          </button>
        </div>
      </div>

      {/* SubTab 1: Requirements Checklist */}
      {subTab === 'requirements' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
            <span>
              <strong className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                {fulfilledCount}
              </strong>{' '}
              Fulfilled
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong className="font-mono tabular-nums text-amber-600 dark:text-amber-400">
                {partialCount}
              </strong>{' '}
              Partially Met
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong className="font-mono tabular-nums text-rose-600 dark:text-rose-400">
                {missingCount}
              </strong>{' '}
              Missing
            </span>
          </div>

          <div className="space-y-3">
            {comparison.mustHaveRequirements.map((req, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {getStatusIcon(req.status)}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {req.requirement}
                      </h4>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Status: <strong>{req.status}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Evidence from Resume:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      {req.evidenceFromResume || 'No direct evidence located in resume text.'}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Gap or Recruiter Note:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      {req.gapExplanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 2: Keyword Density Table */}
      {subTab === 'keywords' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ATS parsers count the presence and frequency of exact keyword matches found in job postings.
          </p>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Keyword</th>
                  <th className="py-2.5 px-3">In JD</th>
                  <th className="py-2.5 px-3">In Resume</th>
                  <th className="py-2.5 px-3 text-right">Frequency</th>
                  <th className="py-2.5 px-3">Context / Placement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {comparison.keywordDensityComparison.map((kw, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
                      {kw.keyword}
                    </td>
                    <td className="py-2.5 px-3">
                      {kw.inJD ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">Yes</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      {kw.inResume ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">Matched</span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 font-medium">Missing</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                      {kw.frequencyInResume}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 text-[11px] max-w-xs truncate">
                      {kw.context || (kw.inResume ? 'Mentioned in resume' : 'Not found in candidate text')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SubTab 3: ATS Formatting Audit */}
      {subTab === 'audit' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Structural audit checking standard section headers, contact visibility, date formats, and parseability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {comparison.atsFormattingAudit.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {item.criterion}
                  </span>
                  {getAuditStatusBadge(item.status)}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong>Finding:</strong> {item.finding}
                </p>
                {item.fix && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-500 leading-relaxed">
                    <strong>Recommended Fix:</strong> {item.fix}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
