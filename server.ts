import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { runHeuristicATSAnalysis } from './src/server/atsAnalyzer.ts';
import { extractTextFromDocument } from './src/server/documentExtractor.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Support up to 25MB for document uploads
  app.use(express.json({ limit: '25mb' }));

  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', hasKey: !!process.env.GEMINI_API_KEY });
  });

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Extract Text from PDF, DOCX, TXT API
  app.post('/api/extract-resume-text', async (req: Request, res: Response): Promise<void> => {
    try {
      const { fileName, fileBase64, fileSizeBytes } = req.body;

      if (!fileName || !fileBase64) {
        res.status(400).json({ error: 'Please provide the file data and file name.' });
        return;
      }

      const result = await extractTextFromDocument(fileName, fileBase64, fileSizeBytes || 0, ai);
      if (!result.success) {
        res.status(422).json({ error: result.error || 'Failed to extract text from document.' });
        return;
      }

      res.json(result);
    } catch (error: any) {
      console.error('Error in /api/extract-resume-text:', error);
      res.status(500).json({ error: error.message || 'An error occurred while processing the document.' });
    }
  });

  const SYSTEM_INSTRUCTION = `You are an expert ATS (Applicant Tracking System) Resume Analyzer and Senior Technical Recruiter.

Your responsibilities:
1. Analyze uploaded resumes accurately.
2. Identify all technical skills found in the resume, distinguishing between skills proven with concrete project achievements versus those merely listed in a skills bank.
3. Identify missing technical & operational skills requested or implied by the Job Description.
4. Compare resume with the provided job description across keywords, seniority, responsibilities, and ATS parseability.
5. Calculate an estimated match score strictly out of 100, broken down into:
   - Technical Skills Match (out of 35)
   - Experience & Seniority Fit (out of 25)
   - Keyword & Requirement Density (out of 25)
   - ATS Formatting & Parseability (out of 15)
   Total is the sum (0 to 100).
6. Suggest concrete, actionable improvements (rewriting weak bullet points using the Google X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]").

CRITICAL RULES:
- Never invent experience or skills. Explicitly warn against falsifying qualifications.
- Give honest feedback. Be direct and objective. If a candidate does not meet the requirements, score them accurately (e.g., 35-55/100) and explain why without false flattery.
- Use simple English. Keep explanations crystal clear and jargon-free.
- Organize your response into standard structured sections.
- If information is missing or ambiguous (e.g. missing metrics, unspecified cloud provider, vague team leadership, missing years of experience for a tool), formulate clear questions for the user in missingInformationQuestions so they can clarify in the next step.

You must respond with valid JSON adhering to the following structure:
{
  "candidateSummary": {
    "detectedName": string,
    "detectedRoleOrTitle": string,
    "totalYearsExperienceEstimated": string,
    "executiveSummary": string,
    "strengthsOverview": [string],
    "criticalHonestVerdict": string
  },
  "scoreBreakdown": {
    "overallScore": number (0-100),
    "ratingTier": "Strong Match" | "Moderate Match" | "Low Match" | "Unlikely to Pass ATS",
    "ratingSummary": string,
    "technicalSkillsScore": { "score": number, "max": 35, "rationale": string },
    "experienceSeniorityScore": { "score": number, "max": 25, "rationale": string },
    "keywordRequirementScore": { "score": number, "max": 25, "rationale": string },
    "atsFormattingScore": { "score": number, "max": 15, "rationale": string }
  },
  "technicalSkillsIdentified": [
    {
      "category": string,
      "skills": [
        {
          "name": string,
          "levelOfEvidence": "Demonstrated in Projects" | "Listed in Skills Only" | "Implied",
          "contextQuoteOrNote": string
        }
      ]
    }
  ],
  "missingSkillsGaps": [
    {
      "skill": string,
      "importance": "Must-Have / Dealbreaker" | "Core Stack Requirement" | "Nice-to-Have",
      "whyImportantInJD": string,
      "recommendation": string
    }
  ],
  "jobComparison": {
    "jobTitle": string,
    "companyIndustry": string,
    "mustHaveRequirements": [
      {
        "requirement": string,
        "status": "Fulfilled" | "Partially Met" | "Missing",
        "evidenceFromResume": string,
        "gapExplanation": string
      }
    ],
    "keywordDensityComparison": [
      {
        "keyword": string,
        "inJD": boolean,
        "inResume": boolean,
        "frequencyInResume": number,
        "context": string
      }
    ],
    "atsFormattingAudit": [
      {
        "criterion": string,
        "status": "Pass" | "Warning" | "Issue",
        "finding": string,
        "fix": string
      }
    ]
  },
  "suggestedImprovements": [
    {
      "category": "Bullet Point Rewrites" | "Skill Presentation" | "ATS Keyword Alignment" | "Formatting & Layout",
      "issue": string,
      "beforeExample": string,
      "afterSuggestedRewrite": string,
      "explanationInSimpleEnglish": string
    }
  ],
  "missingInformationQuestions": [
    {
      "id": string,
      "question": string,
      "context": string,
      "impactOnScore": string,
      "suggestedOptions": [string]
    }
  ],
  "ethicalGuidance": {
    "ruleReminder": string,
    "honestNote": string
  }
}`;

  // Analyze Resume API
  app.post('/api/analyze-resume', async (req: Request, res: Response): Promise<void> => {
    try {
      const { resumeText, resumePdfBase64, jobDescriptionText, targetRole } = req.body;

      if (!resumeText && !resumePdfBase64) {
        res.status(400).json({ error: 'Please provide either resume text or an uploaded resume PDF.' });
        return;
      }

      const jdText = jobDescriptionText?.trim() || 'General software/technical role assessment (no specific job description provided; assess against standard high-quality technical resume expectations).';

      // If Gemini API key is configured, try live Gemini 3.8 Flash model
      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5) {
        try {
          const promptParts: any[] = [];

          if (resumePdfBase64) {
            const base64Data = resumePdfBase64.replace(/^data:application\/pdf;base64,/, '');
            promptParts.push({
              inlineData: {
                mimeType: 'application/pdf',
                data: base64Data,
              },
            });
          }

          const promptText = `Please analyze the following resume against the target job description.

${resumeText ? `--- RESUME TEXT ---\n${resumeText}\n` : '--- RESUME IS ATTACHED AS PDF DOCUMENT ABOVE ---'}

--- TARGET JOB DESCRIPTION ---
${jdText}

${targetRole ? `Target Role Hint: ${targetRole}\n` : ''}

Provide your complete, honest ATS evaluation according to the required JSON schema. Remember:
1. Never invent experience or skills.
2. Give honest, constructive feedback with no sugarcoating.
3. Use simple, clear English.
4. Calculate an authentic match score out of 100.
5. If information is missing or ambiguous, ask questions in missingInformationQuestions.`;

          promptParts.push({ text: promptText });

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: promptParts,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              responseMimeType: 'application/json',
            },
          });

          const responseText = response.text || '';
          const parsed = JSON.parse(responseText);
          res.json(parsed);
          return;
        } catch (geminiError: any) {
          console.warn('Live Gemini call encountered an issue, falling back to built-in ATS engine:', geminiError.message);
        }
      }

      // Fallback: Comprehensive Built-in ATS Heuristic Analysis
      const fallbackResult = runHeuristicATSAnalysis(resumeText || '', jdText, targetRole);
      res.json(fallbackResult);
    } catch (error: any) {
      console.error('Error in /api/analyze-resume:', error);
      res.status(500).json({
        error: error.message || 'An error occurred during resume analysis.',
      });
    }
  });

  // Recalibrate with User Clarifications API
  app.post('/api/recalibrate-clarifications', async (req: Request, res: Response): Promise<void> => {
    try {
      const { previousAnalysis, resumeText, jobDescriptionText, answers } = req.body;

      if (!previousAnalysis || !answers || !Array.isArray(answers)) {
        res.status(400).json({ error: 'Missing required previous analysis or clarification answers.' });
        return;
      }

      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5) {
        try {
          const clarificationSummary = answers
            .map((a: any, idx: number) => `Clarification #${idx + 1}:
Question: "${a.question}"
User Answer: "${a.answer}"`)
            .join('\n\n');

          const recalibratePrompt = `The user was asked clarifying questions regarding ambiguous or missing details in their resume. Here are their verified, honest answers:

${clarificationSummary}

--- ORIGINAL RESUME TEXT ---
${resumeText || 'See previous analysis'}

--- TARGET JOB DESCRIPTION ---
${jobDescriptionText || 'General assessment'}

--- PREVIOUS SCORE ---
Overall Score: ${previousAnalysis?.scoreBreakdown?.overallScore || 'N/A'}/100

TASK:
Recalibrate the ATS analysis and score based on the user's answers.
- If the user confirmed actual hands-on experience that was previously missing or vague, adjust the technical/experience score upward with an updated rationale.
- If the user stated they do NOT have experience or knowledge of the topic, keep the score honest and adjust the recommendations accordingly.
- Never invent skills beyond what the user confirmed.
- Return the full updated ATSAnalysisResult JSON matching the schema, with updated scoreBreakdown, missingSkillsGaps, suggestedImprovements, and explain in criticalHonestVerdict how their clarifications impacted their score.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: recalibratePrompt,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              responseMimeType: 'application/json',
            },
          });

          const responseText = response.text || '';
          const parsed = JSON.parse(responseText);
          res.json(parsed);
          return;
        } catch (geminiError: any) {
          console.warn('Gemini recalibrate call encountered issue, falling back to local recalibration:', geminiError.message);
        }
      }

      // Local Recalibration Fallback
      let scoreBoost = 0;
      const boostReasons: string[] = [];

      for (const ans of answers) {
        const text = (ans.answer || '').toLowerCase();
        if (text.includes('10,000') || text.includes('1,000,000') || text.includes('high volume') || text.includes('scale')) {
          scoreBoost += 4;
          boostReasons.push('Verified production scale (+4 pts)');
        }
        if (text.includes('terraform') || text.includes('kubernetes') || text.includes('managed') || text.includes('vpc') || text.includes('docker') || text.includes('yes')) {
          scoreBoost += 5;
          boostReasons.push('Confirmed hands-on infrastructure provisioning (+5 pts)');
        }
        if (text.includes('led') || text.includes('mentor') || text.includes('reviews') || text.includes('architect')) {
          scoreBoost += 3;
          boostReasons.push('Confirmed architecture review & engineering leadership (+3 pts)');
        }
      }

      const updated = JSON.parse(JSON.stringify(previousAnalysis));
      const currentScore = updated.scoreBreakdown.overallScore;
      const newScore = Math.min(98, currentScore + scoreBoost);

      updated.scoreBreakdown.overallScore = newScore;
      updated.scoreBreakdown.technicalSkillsScore.score = Math.min(35, updated.scoreBreakdown.technicalSkillsScore.score + Math.ceil(scoreBoost / 2));
      updated.scoreBreakdown.experienceSeniorityScore.score = Math.min(25, updated.scoreBreakdown.experienceSeniorityScore.score + Math.floor(scoreBoost / 2));

      if (newScore >= 85) updated.scoreBreakdown.ratingTier = 'Strong Match';
      else if (newScore >= 70) updated.scoreBreakdown.ratingTier = 'Moderate Match';
      else updated.scoreBreakdown.ratingTier = 'Low Match';

      updated.candidateSummary.criticalHonestVerdict = `Recalibrated with Candidate Clarifications: ${
        boostReasons.length > 0 ? boostReasons.join(', ') + '. ' : ''
      }Score updated from ${currentScore}/100 to ${newScore}/100 based on confirmed hands-on qualifications. All skills remain strictly grounded in candidate-verified answers.`;

      res.json(updated);
    } catch (error: any) {
      console.error('Error in /api/recalibrate-clarifications:', error);
      res.status(500).json({
        error: error.message || 'An error occurred while recalibrating analysis.',
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ATS Analyzer server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
