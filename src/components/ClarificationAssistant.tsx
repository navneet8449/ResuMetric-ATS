import React, { useState } from 'react';
import { MissingInformationQuestion } from '../types';
import { MessageSquare, RefreshCw, Send, CheckCircle2, HelpCircle } from 'lucide-react';

interface ClarificationAssistantProps {
  questions: MissingInformationQuestion[];
  onRecalibrate: (answers: Array<{ questionId: string; question: string; answer: string }>) => void;
  isRecalibrating: boolean;
}

export const ClarificationAssistant: React.FC<ClarificationAssistantProps> = ({
  questions,
  onRecalibrate,
  isRecalibrating,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionId: string, optionText: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionText,
    }));
  };

  const handleCustomChange = (questionId: string, text: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  const handleRecalibrateSubmit = () => {
    const formattedAnswers = questions
      .filter((q) => userAnswers[q.id]?.trim())
      .map((q) => ({
        questionId: q.id,
        question: q.question,
        answer: userAnswers[q.id].trim(),
      }));

    if (formattedAnswers.length === 0) return;
    setSubmitted(true);
    onRecalibrate(formattedAnswers);
  };

  const answeredCount = questions.filter((q) => userAnswers[q.id]?.trim()).length;

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs text-center space-y-2">
        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          No Missing Information Detected
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          The candidate's resume provided clear dates, metrics, and technology contexts for the target job requirements.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Clarifications & Missing Resume Information
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Rule: "If information is missing, ask the user." Answer these honest questions to recalibrate your ATS match score.
          </p>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
          <span>
            Answered{' '}
            <strong className="font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
              {answeredCount}
            </strong>{' '}
            of {questions.length}
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const currentAnswer = userAnswers[q.id] || '';
          return (
            <div
              key={q.id || idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {q.question}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    <strong>Context:</strong> {q.context}
                  </p>
                  {q.impactOnScore && (
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400">
                      <strong>Score Impact:</strong> {q.impactOnScore}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Select Options */}
              {q.suggestedOptions && q.suggestedOptions.length > 0 && (
                <div className="space-y-1.5 pl-7">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Quick Selection:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {q.suggestedOptions.map((opt, optIdx) => {
                      const isSelected = currentAnswer === opt;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleOptionSelect(q.id, opt)}
                          className={`text-xs px-2.5 py-1 rounded-md border transition-colors text-left ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Input */}
              <div className="pl-7">
                <input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => handleCustomChange(q.id, e.target.value)}
                  placeholder="Or provide your authentic details (e.g. Yes, 2 years managing RDS in production)..."
                  className="w-full text-xs px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recalibrate CTA Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Submitting updates your score objectively based only on facts you confirm.
        </p>

        <button
          onClick={handleRecalibrateSubmit}
          disabled={answeredCount === 0 || isRecalibrating}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg shadow-xs transition-all whitespace-nowrap ${
            answeredCount > 0 && !isRecalibrating
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isRecalibrating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Recalibrating ATS Match Score...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Recalibrate Score with Verified Answers ({answeredCount})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
