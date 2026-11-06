export interface CandidateSummary {
  detectedName?: string;
  detectedRoleOrTitle: string;
  totalYearsExperienceEstimated: string;
  executiveSummary: string;
  strengthsOverview: string[];
  criticalHonestVerdict: string;
}

export interface ScoreItem {
  score: number;
  max: number;
  rationale: string;
}

export interface ScoreBreakdown {
  overallScore: number;
  ratingTier: 'Strong Match' | 'Moderate Match' | 'Low Match' | 'Unlikely to Pass ATS';
  ratingSummary: string;
  technicalSkillsScore: ScoreItem;
  experienceSeniorityScore: ScoreItem;
  keywordRequirementScore: ScoreItem;
  atsFormattingScore: ScoreItem;
}

export interface IdentifiedSkill {
  name: string;
  levelOfEvidence: 'Demonstrated in Projects' | 'Listed in Skills Only' | 'Implied';
  contextQuoteOrNote: string;
}

export interface TechnicalSkillsCategory {
  category: string;
  skills: IdentifiedSkill[];
}

export interface MissingSkillGap {
  skill: string;
  importance: 'Must-Have / Dealbreaker' | 'Core Stack Requirement' | 'Nice-to-Have';
  whyImportantInJD: string;
  recommendation: string;
}

export interface MustHaveRequirement {
  requirement: string;
  status: 'Fulfilled' | 'Partially Met' | 'Missing';
  evidenceFromResume: string;
  gapExplanation: string;
}

export interface KeywordDensity {
  keyword: string;
  inJD: boolean;
  inResume: boolean;
  frequencyInResume: number;
  context: string;
}

export interface ATSFormattingAuditItem {
  criterion: string;
  status: 'Pass' | 'Warning' | 'Issue';
  finding: string;
  fix: string;
}

export interface JobComparison {
  jobTitle: string;
  companyIndustry?: string;
  mustHaveRequirements: MustHaveRequirement[];
  keywordDensityComparison: KeywordDensity[];
  atsFormattingAudit: ATSFormattingAuditItem[];
}

export interface SuggestedImprovement {
  category: 'Bullet Point Rewrites' | 'Skill Presentation' | 'ATS Keyword Alignment' | 'Formatting & Layout';
  issue: string;
  beforeExample?: string;
  afterSuggestedRewrite?: string;
  explanationInSimpleEnglish: string;
}

export interface MissingInformationQuestion {
  id: string;
  question: string;
  context: string;
  impactOnScore: string;
  suggestedOptions?: string[];
  userAnswer?: string;
}

export interface EthicalGuidance {
  ruleReminder: string;
  honestNote: string;
}

export interface ATSAnalysisResult {
  candidateSummary: CandidateSummary;
  scoreBreakdown: ScoreBreakdown;
  technicalSkillsIdentified: TechnicalSkillsCategory[];
  missingSkillsGaps: MissingSkillGap[];
  jobComparison: JobComparison;
  suggestedImprovements: SuggestedImprovement[];
  missingInformationQuestions: MissingInformationQuestion[];
  ethicalGuidance: EthicalGuidance;
}

export interface SampleDataPreset {
  id: string;
  title: string;
  role: string;
  resumeText: string;
  jobTitle: string;
  jobDescriptionText: string;
}

export interface PredefinedJobRole {
  id: string;
  title: string;
  roleHint: string;
  category: 'Frontend & Mobile' | 'Backend & Cloud' | 'Data & AI' | 'Security & QA' | 'General';
  experienceLevel: string;
  keySkills: string[];
  jobTitle: string;
  companyName: string;
  jobDescriptionText: string;
}

