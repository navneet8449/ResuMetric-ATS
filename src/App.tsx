import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { ScoreCard } from './components/ScoreCard';
import { TechnicalSkillsSection } from './components/TechnicalSkillsSection';
import { MissingSkillsSection } from './components/MissingSkillsSection';
import { JobComparisonSection } from './components/JobComparisonSection';
import { ImprovementsSection } from './components/ImprovementsSection';
import { ClarificationAssistant } from './components/ClarificationAssistant';
import { ReportExportModal } from './components/ReportExportModal';
import { SAMPLE_PRESETS } from './data/samplePresets';
import { ATSAnalysisResult } from './types';
import { FileDown, RefreshCw, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function App() {
  const defaultPreset = SAMPLE_PRESETS[0];

  const [resumeText, setResumeText] = useState<string>(defaultPreset.resumeText);
  const [jobDescriptionText, setJobDescriptionText] = useState<string>(defaultPreset.jobDescriptionText);
  const [targetRole, setTargetRole] = useState<string>(defaultPreset.role);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecalibrating, setIsRecalibrating] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ATSAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('scanner');
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Run initial analysis or let user trigger
  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: pdfBase64 ? undefined : resumeText,
          resumePdfBase64: pdfBase64,
          jobDescriptionText,
          targetRole,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Analysis request failed with status ${response.status}`);
      }

      const data: ATSAnalysisResult = await response.json();
      setAnalysisResult(data);
      setActiveSection('overview');

      // Scroll smoothly to results
      setTimeout(() => {
        const el = document.getElementById('results-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'An unexpected error occurred while analyzing the resume.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecalibrate = async (
    answers: Array<{ questionId: string; question: string; answer: string }>
  ) => {
    if (!analysisResult) return;
    setIsRecalibrating(true);
    setError(null);

    try {
      const response = await fetch('/api/recalibrate-clarifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          previousAnalysis: analysisResult,
          resumeText,
          jobDescriptionText,
          answers,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Recalibration failed with status ${response.status}`);
      }

      const updatedData: ATSAnalysisResult = await response.json();
      setAnalysisResult(updatedData);

      // Smooth scroll back to score breakdown
      const el = document.getElementById('overview');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err: any) {
      console.error('Recalibration error:', err);
      setError(err.message || 'Failed to recalibrate analysis with your answers.');
    } finally {
      setIsRecalibrating(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
    setActiveSection('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'scanner') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased">
      {/* Top Header */}
      <Header
        onReset={handleReset}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        hasResult={!!analysisResult}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Error notification */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs font-semibold underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Input & Scanner Section */}
        <section id="scanner" className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Expert ATS Resume Analyzer
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Verify ATS keyword alignment, technical skills depth, and job description fit. Get an honest match score out of 100 with zero hallucinated credentials.
            </p>
          </div>

          <InputPanel
            resumeText={resumeText}
            setResumeText={setResumeText}
            jobDescriptionText={jobDescriptionText}
            setJobDescriptionText={setJobDescriptionText}
            targetRole={targetRole}
            setTargetRole={setTargetRole}
            pdfBase64={pdfBase64}
            setPdfBase64={setPdfBase64}
            uploadedFileName={uploadedFileName}
            setUploadedFileName={setUploadedFileName}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        </section>

        {/* Results Section */}
        {analysisResult && (
          <div id="results-section" className="space-y-10 pt-4 border-t border-slate-200 dark:border-slate-800">
            {/* Results Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Analysis Complete
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  Match Score:{' '}
                  <strong className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                    {analysisResult.scoreBreakdown.overallScore}/100
                  </strong>
                </span>
                <span aria-hidden="true">·</span>
                <span>{analysisResult.scoreBreakdown.ratingTier}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowExportModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Export Report (.md)</span>
                </button>
              </div>
            </div>

            {/* 1. Score & Executive Profile */}
            <section id="overview" className="scroll-mt-20">
              <ScoreCard result={analysisResult} />
            </section>

            {/* 2. Technical Skills Identified */}
            <section id="skills" className="scroll-mt-20">
              <TechnicalSkillsSection
                categories={analysisResult.technicalSkillsIdentified || []}
              />
            </section>

            {/* 3. Missing Skills & Gaps */}
            <section id="gaps" className="scroll-mt-20">
              <MissingSkillsSection
                missingSkills={analysisResult.missingSkillsGaps || []}
              />
            </section>

            {/* 4. Comparison with Job Description */}
            <section id="comparison" className="scroll-mt-20">
              <JobComparisonSection comparison={analysisResult.jobComparison} />
            </section>

            {/* 5. Suggested Improvements & Bullet Rewrites */}
            <section id="improvements" className="scroll-mt-20">
              <ImprovementsSection
                improvements={analysisResult.suggestedImprovements || []}
              />
            </section>

            {/* 6. Clarifications & Missing Information */}
            <section id="clarifications" className="scroll-mt-20">
              <ClarificationAssistant
                questions={analysisResult.missingInformationQuestions || []}
                onRecalibrate={handleRecalibrate}
                isRecalibrating={isRecalibrating}
              />
            </section>
          </div>
        )}
      </main>

      {/* Export Report Modal */}
      {showExportModal && analysisResult && (
        <ReportExportModal
          result={analysisResult}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              ResuMetric ATS Analyzer
            </span>
            <span aria-hidden="true">·</span>
            <span>Honest Evaluation Engine</span>
            <span aria-hidden="true">·</span>
            <span>Zero Hallucinated Experience</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Google X-Y-Z Formula Rewrites</span>
            <span aria-hidden="true">·</span>
            <span>Multi-Criteria ATS Scoring</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
