import React, { useState, useRef } from 'react';
import { Upload, FileText, Briefcase, Sparkles, CheckCircle2, AlertCircle, X, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/samplePresets';
import { PREDEFINED_JOB_ROLES } from '../data/predefinedRoles';
import { SampleDataPreset, PredefinedJobRole } from '../types';

interface InputPanelProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  jobDescriptionText: string;
  setJobDescriptionText: (text: string) => void;
  targetRole: string;
  setTargetRole: (role: string) => void;
  pdfBase64: string | null;
  setPdfBase64: (base64: string | null) => void;
  uploadedFileName: string | null;
  setUploadedFileName: (name: string | null) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  resumeText,
  setResumeText,
  jobDescriptionText,
  setJobDescriptionText,
  targetRole,
  setTargetRole,
  pdfBase64,
  setPdfBase64,
  uploadedFileName,
  setUploadedFileName,
  onAnalyze,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'upload'>('text');
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractedDetails, setExtractedDetails] = useState<{
    fileName: string;
    format: string;
    wordCount: number;
  } | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('fullstack-fintech');
  const [roleCategoryFilter, setRoleCategoryFilter] = useState<string>('All');
  const [roleLoadedNotice, setRoleLoadedNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPreset = (preset: SampleDataPreset) => {
    setResumeText(preset.resumeText);
    setJobDescriptionText(preset.jobDescriptionText);
    setTargetRole(preset.role);
    setPdfBase64(null);
    setUploadedFileName(null);
    setFileError(null);
    setSelectedRoleId(preset.id);
    setRoleLoadedNotice(`Loaded ${preset.title}`);
    setTimeout(() => setRoleLoadedNotice(null), 3000);
  };

  const handleSelectRole = (roleId: string) => {
    const role = PREDEFINED_JOB_ROLES.find((r) => r.id === roleId);
    if (role) {
      setSelectedRoleId(roleId);
      setJobDescriptionText(role.jobDescriptionText);
      setTargetRole(role.roleHint);
      setRoleLoadedNotice(`Applied ${role.title} requirements`);
      setTimeout(() => setRoleLoadedNotice(null), 3000);
    }
  };

  const processFile = (file: File) => {
    setFileError(null);

    // 1. Validate file size (10MB limit)
    const MAX_SIZE_BYTES = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileError(`File size (${sizeMb}MB) exceeds the 10MB limit. Please upload a smaller document.`);
      return;
    }

    if (file.size === 0) {
      setFileError('The selected file is empty (0 bytes). Please upload a valid resume document.');
      return;
    }

    // 2. Validate file type
    const fileName = file.name;
    const extension = fileName.split('.').pop()?.toLowerCase();
    const validExtensions = ['pdf', 'docx', 'doc', 'txt', 'md'];

    if (!extension || !validExtensions.includes(extension)) {
      setFileError(`Unsupported file format ".${extension || 'unknown'}". Please upload a PDF (.pdf), Word document (.docx), or plain text file (.txt, .md).`);
      return;
    }

    setIsExtracting(true);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;

        // Call backend document extraction endpoint
        const response = await fetch('/api/extract-resume-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName,
            fileBase64: base64Data,
            fileSizeBytes: file.size,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to extract text from document.');
        }

        if (!data.text || data.text.trim().length === 0) {
          throw new Error('No readable text was found in this document. If it is password-protected or an image-only scan, please paste your resume text directly.');
        }

        // Successfully extracted text
        setResumeText(data.text);
        setUploadedFileName(fileName);
        setExtractedDetails({
          fileName,
          format: data.fileFormat,
          wordCount: data.wordCount || data.text.trim().split(/\s+/).length,
        });

        // Automatically switch to text review tab so user can review & edit!
        setActiveTab('text');
      } catch (err: any) {
        setFileError(err.message || 'An error occurred while reading the document.');
      } finally {
        setIsExtracting(false);
      }
    };

    reader.onerror = () => {
      setFileError('Failed to read the file from disk. Please try again or paste text directly.');
      setIsExtracting(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const clearFile = () => {
    setPdfBase64(null);
    setUploadedFileName(null);
    setExtractedDetails(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resumeWordCount = resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0;
  const jdWordCount = jobDescriptionText.trim() ? jobDescriptionText.trim().split(/\s+/).length : 0;

  const canAnalyze = resumeText.trim().length > 40 && !isLoading && !isExtracting;

  return (
    <div className="space-y-6">
      {/* Quick Test Presets Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>TEST WITH REAL-WORLD DATA & PREDEFINED ROLES</span>
            </div>
            <h2 className="text-base font-semibold text-white mt-1">
              Select a pre-loaded candidate resume & job description
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Instant 1-click test with real engineer profiles or pick from 13 industry job descriptions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">Presets:</span>
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors whitespace-nowrap text-left ${
                  selectedRoleId === preset.id
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border-slate-700'
                }`}
              >
                {preset.title.split(' vs. ')[0]}
              </button>
            ))}

            {/* Quick dropdown for all 13 roles */}
            <div className="relative inline-block w-full sm:w-auto">
              <select
                value={selectedRoleId}
                onChange={(e) => handleSelectRole(e.target.value)}
                className="w-full sm:w-auto text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-400 cursor-pointer"
              >
                <option value="" disabled>Browse all 13 roles...</option>
                <optgroup label="Frontend & Mobile">
                  <option value="frontend-developer">Frontend Developer</option>
                  <option value="android-developer">Android Developer</option>
                </optgroup>
                <optgroup label="Backend & Cloud">
                  <option value="backend-developer">Backend Developer</option>
                  <option value="python-developer">Python Developer</option>
                  <option value="java-developer">Java Developer</option>
                  <option value="fullstack-fintech">Full Stack Software Engineer</option>
                  <option value="devops-cloud">Cloud DevOps / SRE</option>
                </optgroup>
                <optgroup label="Data & AI">
                  <option value="ai-ml-engineer">AI/ML Engineer</option>
                  <option value="data-scientist">Data Scientist</option>
                  <option value="data-analyst">Data Analyst & Analytics Eng</option>
                </optgroup>
                <optgroup label="Security & QA">
                  <option value="qa-engineer">QA Engineer</option>
                  <option value="cybersecurity-analyst">Cybersecurity Analyst</option>
                </optgroup>
                <optgroup label="General Engineering">
                  <option value="software-engineer">Software Engineer</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        {roleLoadedNotice && (
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-emerald-400">
            <Check className="w-3.5 h-3.5" />
            <span>{roleLoadedNotice}</span>
          </div>
        )}
      </div>

      {/* Main 2-Column Split: Resume on Left, Job Description on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Resume Input */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col h-full">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  1. Candidate Resume
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {pdfBase64 ? (
                    <span>PDF Document Attached</span>
                  ) : (
                    <span>
                      <strong className="font-mono tabular-nums">{resumeWordCount}</strong> words
                    </span>
                  )}
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>Required</span>
                </div>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'text'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Text
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'upload'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Upload File
              </button>
            </div>
          </div>

          <div className="mt-4 flex-1">
            {activeTab === 'upload' ? (
              <div className="space-y-4">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    dragOver
                      ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                      : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt,.md"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mx-auto flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Click to browse or drag & drop resume file
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Supports PDF, TXT, Markdown documents (up to 15MB)
                  </p>
                </div>

                {uploadedFileName && (
                  <div className="flex items-center justify-between p-3 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-lg">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div className="truncate">
                        <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 truncate">
                          {uploadedFileName}
                        </p>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                          {pdfBase64 ? 'Ready for native multi-page ATS parse' : 'Loaded text format'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {fileError && (
                  <div className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 rounded-lg text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{fileError}</span>
                  </div>
                )}

                <div className="pt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Note: You can switch back to the "Text" tab at any time if you prefer to edit sections, paste specific job stints, or tweak bullet points directly.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste complete resume content here (Contact info, Summary, Technical Skills, Experience, Education)..."
                  rows={15}
                  className="w-full text-xs font-mono p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 resize-y leading-relaxed"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Job Description & Target Role */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col h-full">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  2. Target Job Description
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    <strong className="font-mono tabular-nums">{jdWordCount}</strong> words
                  </span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>Required for Match Score</span>
                </div>
              </div>
            </div>

            {jobDescriptionText && (
              <button
                type="button"
                onClick={() => setJobDescriptionText('')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          <div className="mt-4 space-y-4 flex-1 flex flex-col">
            {/* Predefined Role Selector Box */}
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  Select Predefined Role & Auto-Fill Requirements
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  13 Roles Available
                </span>
              </div>

              {/* Category Segmented Tabs */}
              <div className="flex flex-wrap items-center gap-1 p-0.5 bg-slate-200/70 dark:bg-slate-850 rounded-md">
                {(['All', 'Frontend & Mobile', 'Backend & Cloud', 'Data & AI', 'Security & QA', 'General'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setRoleCategoryFilter(cat)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors whitespace-nowrap ${
                      roleCategoryFilter === cat
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Responsive Role Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {PREDEFINED_JOB_ROLES
                  .filter((role) => roleCategoryFilter === 'All' || role.category === roleCategoryFilter)
                  .map((role) => {
                    const isSelected = selectedRoleId === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => handleSelectRole(role.id)}
                        className={`px-2.5 py-1.5 text-xs text-left font-medium rounded-md border transition-all truncate ${
                          isSelected
                            ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                        }`}
                        title={role.title}
                      >
                        {role.title}
                      </button>
                    );
                  })}
              </div>

              {/* Active Role Skills Preview */}
              {PREDEFINED_JOB_ROLES.find((r) => r.id === selectedRoleId) && (
                <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {PREDEFINED_JOB_ROLES.find((r) => r.id === selectedRoleId)?.title}:
                  </span>{' '}
                  <span>
                    {PREDEFINED_JOB_ROLES.find((r) => r.id === selectedRoleId)?.keySkills.join(' · ')}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Target Role / Title
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Developer, Python Developer, Android Developer"
                className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Job Description Text & Requirements
                </label>
                <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                  {jdWordCount} words
                </span>
              </div>
              <textarea
                value={jobDescriptionText}
                onChange={(e) => setJobDescriptionText(e.target.value)}
                placeholder="Paste the target job posting here (Key responsibilities, Required qualifications, Must-have technical stack, Nice-to-haves)..."
                rows={11}
                className="w-full text-xs font-mono p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 resize-y leading-relaxed flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Strip & Ethical Guidance */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              ATS Analysis Standards
            </span>
            <span aria-hidden="true">·</span>
            <span>Zero hallucinated experience</span>
            <span aria-hidden="true">·</span>
            <span>Honest gap assessment</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-500">
            Rule: We never invent experience or skills. You'll receive realistic scores, honest missing skill tags, and Google X-Y-Z formula rewrites.
          </p>
        </div>

        <button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap ${
            canAnalyze
              ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 cursor-pointer'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Resume & Matching Keywords...</span>
            </>
          ) : (
            <>
              <span>Run Expert ATS Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
