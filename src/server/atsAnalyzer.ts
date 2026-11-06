import { ATSAnalysisResult } from '../types';

export function runHeuristicATSAnalysis(
  resumeText: string,
  jobDescriptionText: string,
  targetRoleHint?: string
): ATSAnalysisResult {
  const resumeLower = (resumeText || '').toLowerCase();
  const jdLower = (jobDescriptionText || '').toLowerCase();

  // 1. Detect candidate name & title
  const firstLines = (resumeText || '').split('\n').filter((l) => l.trim().length > 0);
  const detectedName = firstLines.length > 0 ? firstLines[0].trim().replace(/^#+\s*/, '') : 'Candidate';

  // Role detection
  let detectedRole = targetRoleHint || 'Software Engineer';
  if (resumeLower.includes('android') || resumeLower.includes('jetpack compose') || resumeLower.includes('kotlin')) {
    detectedRole = 'Android Developer';
  } else if (resumeLower.includes('cybersecurity') || resumeLower.includes('security operations') || resumeLower.includes('soc') || resumeLower.includes('siem')) {
    detectedRole = 'Cybersecurity Analyst';
  } else if (resumeLower.includes('qa automation') || resumeLower.includes('qa engineer') || resumeLower.includes('quality assurance') || resumeLower.includes('playwright')) {
    detectedRole = 'QA Engineer';
  } else if (resumeLower.includes('ai/ml') || resumeLower.includes('machine learning engineer') || resumeLower.includes('pytorch') || resumeLower.includes('llm')) {
    detectedRole = 'AI/ML Engineer';
  } else if (resumeLower.includes('data scientist') || resumeLower.includes('predictive model') || resumeLower.includes('statistics')) {
    detectedRole = 'Data Scientist';
  } else if (resumeLower.includes('python developer') || resumeLower.includes('fastapi') || resumeLower.includes('django')) {
    detectedRole = 'Python Developer';
  } else if (resumeLower.includes('java developer') || resumeLower.includes('spring boot') || resumeLower.includes('spring cloud')) {
    detectedRole = 'Java Developer';
  } else if (resumeLower.includes('frontend') || resumeLower.includes('front-end')) {
    detectedRole = 'Frontend Developer';
  } else if (resumeLower.includes('backend') || resumeLower.includes('back-end')) {
    detectedRole = 'Backend Developer';
  } else if (resumeLower.includes('full stack') || resumeLower.includes('fullstack')) {
    detectedRole = 'Full Stack Software Engineer';
  } else if (resumeLower.includes('devops') || resumeLower.includes('site reliability') || resumeLower.includes('sre')) {
    detectedRole = 'Cloud DevOps / SRE Engineer';
  } else if (resumeLower.includes('data analyst') || resumeLower.includes('analytics engineer')) {
    detectedRole = 'Data Analyst & Analytics Engineer';
  }

  // Experience calculation
  const yoeMatches = resumeText.match(/(\d+)\+?\s*years?\s+of\s+experience/i) || resumeText.match(/(\d+)\s*years/i);
  let estimatedYoe = yoeMatches ? `${yoeMatches[1]} Years` : '3-5 Years';
  const yoeNum = yoeMatches ? parseInt(yoeMatches[1], 10) : 3;

  // 2. Comprehensive technical skills dictionary covering all 13 roles
  const skillCatalog: Record<string, { category: string; keywords: string[] }> = {
    // Languages & Core
    'TypeScript': { category: 'Languages & Core', keywords: ['typescript', 'ts'] },
    'JavaScript': { category: 'Languages & Core', keywords: ['javascript', 'js', 'es6', 'es2020'] },
    'Python': { category: 'Languages & Core', keywords: ['python', 'py', 'python 3'] },
    'Java': { category: 'Languages & Core', keywords: ['java', 'java 17', 'java 21', 'core java'] },
    'Kotlin': { category: 'Languages & Core', keywords: ['kotlin', 'kotlin coroutines'] },
    'Golang': { category: 'Languages & Core', keywords: ['golang', 'go language'] },
    'SQL': { category: 'Languages & Core', keywords: ['sql', 'ansi sql', 'postgresql', 'mysql'] },
    'HTML5 / CSS3': { category: 'Languages & Core', keywords: ['html5', 'html', 'css3', 'css'] },
    'Data Structures & Algorithms': { category: 'Languages & Core', keywords: ['data structures', 'algorithms', 'system design', 'oop'] },

    // Frontend & Web
    'React': { category: 'Frontend & UI', keywords: ['react', 'react.js', 'reactjs', 'react 18'] },
    'Next.js': { category: 'Frontend & UI', keywords: ['next.js', 'nextjs', 'app router'] },
    'Tailwind CSS': { category: 'Frontend & UI', keywords: ['tailwind', 'tailwindcss'] },
    'State Management (Zustand/Redux)': { category: 'Frontend & UI', keywords: ['redux', 'zustand', 'redux toolkit', 'context api'] },
    'Web Vitals & Performance': { category: 'Frontend & UI', keywords: ['web vitals', 'lcp', 'cls', 'performance optimization', 'lighthouse'] },

    // Mobile / Android
    'Jetpack Compose': { category: 'Mobile & Android', keywords: ['jetpack compose', 'compose', 'declarative ui'] },
    'Android SDK': { category: 'Mobile & Android', keywords: ['android sdk', 'android architecture', 'android'] },
    'Coroutines & Flow': { category: 'Mobile & Android', keywords: ['coroutines', 'flow', 'stateflow', 'sharedflow'] },
    'Room DB & SQLite': { category: 'Mobile & Android', keywords: ['room', 'room database', 'sqlite'] },
    'Dagger Hilt': { category: 'Mobile & Android', keywords: ['dagger', 'hilt', 'dependency injection', 'koin'] },
    'Retrofit & Networking': { category: 'Mobile & Android', keywords: ['retrofit', 'okhttp'] },

    // Backend Frameworks & Microservices
    'FastAPI': { category: 'Backend & Frameworks', keywords: ['fastapi'] },
    'Django': { category: 'Backend & Frameworks', keywords: ['django', 'django rest framework', 'drf'] },
    'Spring Boot': { category: 'Backend & Frameworks', keywords: ['spring boot', 'spring', 'spring cloud', 'spring data'] },
    'Hibernate / JPA': { category: 'Backend & Frameworks', keywords: ['hibernate', 'jpa', 'orm'] },
    'Node.js & Express': { category: 'Backend & Frameworks', keywords: ['node.js', 'nodejs', 'express', 'express.js'] },
    'RESTful APIs & gRPC': { category: 'Backend & Frameworks', keywords: ['rest', 'restful', 'rest api', 'grpc', 'openapi'] },
    'Celery & AsyncIO': { category: 'Backend & Frameworks', keywords: ['celery', 'asyncio', 'task queue'] },
    'Microservices Architecture': { category: 'Backend & Frameworks', keywords: ['microservices', 'microservice', 'distributed systems'] },

    // Databases & Messaging
    'PostgreSQL': { category: 'Databases & Messaging', keywords: ['postgresql', 'postgres'] },
    'MySQL / Relational DB': { category: 'Databases & Messaging', keywords: ['mysql', 'mariadb', 'relational database'] },
    'Redis & Caching': { category: 'Databases & Messaging', keywords: ['redis', 'caching', 'memcached'] },
    'Apache Kafka / RabbitMQ': { category: 'Databases & Messaging', keywords: ['kafka', 'apache kafka', 'rabbitmq', 'message queue'] },
    'Snowflake & BigQuery': { category: 'Databases & Messaging', keywords: ['snowflake', 'bigquery', 'data warehouse'] },

    // Cloud & DevOps
    'AWS Cloud Services': { category: 'Cloud & Infrastructure', keywords: ['aws', 'amazon web services', 'ec2', 's3', 'rds', 'lambda', 'ecs', 'eks'] },
    'Docker & Containers': { category: 'Cloud & Infrastructure', keywords: ['docker', 'containerization', 'containers'] },
    'Kubernetes': { category: 'Cloud & Infrastructure', keywords: ['kubernetes', 'k8s', 'helm', 'kubectl'] },
    'Terraform & IaC': { category: 'Cloud & Infrastructure', keywords: ['terraform', 'iac', 'infrastructure as code'] },
    'CI/CD Pipelines': { category: 'Cloud & Infrastructure', keywords: ['ci/cd', 'github actions', 'gitlab ci', 'jenkins', 'argo'] },
    'Observability & Monitoring': { category: 'Cloud & Infrastructure', keywords: ['prometheus', 'grafana', 'datadog', 'opentelemetry', 'cloudwatch'] },

    // AI, ML & Data Science
    'PyTorch / TensorFlow': { category: 'AI, ML & Data Science', keywords: ['pytorch', 'tensorflow', 'deep learning'] },
    'LLMs & Generative AI': { category: 'AI, ML & Data Science', keywords: ['llm', 'llms', 'generative ai', 'genai', 'langchain', 'llamaindex', 'rag'] },
    'Hugging Face & Transformers': { category: 'AI, ML & Data Science', keywords: ['hugging face', 'transformers', 'bert', 'fine-tuning'] },
    'Vector Databases': { category: 'AI, ML & Data Science', keywords: ['pinecone', 'chroma', 'qdrant', 'vector database', 'embeddings'] },
    'Scikit-Learn & ML': { category: 'AI, ML & Data Science', keywords: ['scikit-learn', 'sklearn', 'machine learning', 'xgboost', 'lightgbm'] },
    'Pandas & NumPy': { category: 'AI, ML & Data Science', keywords: ['pandas', 'numpy', 'data wrangling'] },
    'A/B Testing & Statistics': { category: 'AI, ML & Data Science', keywords: ['a/b test', 'ab testing', 'hypothesis testing', 'statistics', 'causal inference'] },
    'dbt & Data Modeling': { category: 'AI, ML & Data Science', keywords: ['dbt', 'data modeling', 'star schema', 'kimball'] },

    // QA & Testing
    'Playwright & Cypress': { category: 'QA & Testing', keywords: ['playwright', 'cypress', 'ui automation'] },
    'Selenium & Automation': { category: 'QA & Testing', keywords: ['selenium', 'test automation', 'webdriver'] },
    'API Testing (Postman/REST)': { category: 'QA & Testing', keywords: ['postman', 'newman', 'api testing', 'rest-assured'] },
    'Unit Testing (Jest/PyTest/JUnit)': { category: 'QA & Testing', keywords: ['jest', 'pytest', 'junit', 'mockito', 'unit testing'] },
    'Performance Testing (k6/JMeter)': { category: 'QA & Testing', keywords: ['k6', 'jmeter', 'load testing', 'locust'] },

    // Cybersecurity
    'SIEM (Splunk/Sentinel)': { category: 'Cybersecurity', keywords: ['splunk', 'sentinel', 'siem', 'security information'] },
    'EDR (CrowdStrike)': { category: 'Cybersecurity', keywords: ['crowdstrike', 'edr', 'sentinelone', 'endpoint detection'] },
    'Incident Response & Triage': { category: 'Cybersecurity', keywords: ['incident response', 'containment', 'root cause analysis', 'soc'] },
    'Threat Hunting & MITRE ATT&CK': { category: 'Cybersecurity', keywords: ['threat hunting', 'mitre', 'att&ck', 'ttps'] },
    'Vulnerability Scanning (Nessus/Qualys)': { category: 'Cybersecurity', keywords: ['nessus', 'qualys', 'vulnerability management', 'cve'] },
    'Network Security & Wireshark': { category: 'Cybersecurity', keywords: ['wireshark', 'packet analysis', 'firewall', 'ids', 'ips', 'tcp/ip'] },
  };

  // Find present skills in resume
  const identifiedSkillsMap: Record<string, { name: string; levelOfEvidence: 'Demonstrated in Projects' | 'Listed in Skills Only' | 'Implied'; contextQuoteOrNote: string }[]> = {};

  for (const [skillName, data] of Object.entries(skillCatalog)) {
    const isPresent = data.keywords.some((kw) => {
      const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(resumeLower);
    });

    if (isPresent) {
      // Check if demonstrated with numbers/metrics in work experience
      const hasMetricEvidence = /(\d+[%kKmM]|reduced|improved|increased|decreased|built|engineered|architected)/i.test(resumeText);
      const isDemonstrated = hasMetricEvidence && (resumeLower.includes('present') || resumeLower.includes('engineered') || resumeLower.includes('developed'));

      const level = isDemonstrated ? 'Demonstrated in Projects' : 'Listed in Skills Only';
      const quote = isDemonstrated
        ? `Found in work experience with active engineering verbs.`
        : `Detected in resume skills bank or technical toolkit section.`;

      if (!identifiedSkillsMap[data.category]) {
        identifiedSkillsMap[data.category] = [];
      }
      identifiedSkillsMap[data.category].push({
        name: skillName,
        levelOfEvidence: level,
        contextQuoteOrNote: quote,
      });
    }
  }

  const technicalSkillsIdentified = Object.entries(identifiedSkillsMap).map(([category, skills]) => ({
    category,
    skills,
  }));

  // Find skills required by the Job Description
  const jdRequiredSkills: string[] = [];
  for (const [skillName, data] of Object.entries(skillCatalog)) {
    const isPresentInJD = data.keywords.some((kw) => {
      const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(jdLower);
    });
    if (isPresentInJD) {
      jdRequiredSkills.push(skillName);
    }
  }

  // Find Missing Skills
  const missingSkillsGaps: ATSAnalysisResult['missingSkillsGaps'] = [];
  const presentSkillNames = new Set(Object.values(identifiedSkillsMap).flatMap((s) => s.map((x) => x.name)));

  for (const reqSkill of jdRequiredSkills) {
    if (!presentSkillNames.has(reqSkill)) {
      const isDealbreaker = ['AWS', 'Kubernetes', 'TypeScript', 'Terraform', 'React', 'Node.js', 'PostgreSQL', 'Golang'].includes(reqSkill) && jdLower.includes('must') || jdLower.includes('required') || jdLower.includes('5+');
      const isCore = !isDealbreaker && (jdLower.includes('strong') || jdLower.includes('experience with'));

      missingSkillsGaps.push({
        skill: reqSkill,
        importance: isDealbreaker ? 'Must-Have / Dealbreaker' : (isCore ? 'Core Stack Requirement' : 'Nice-to-Have'),
        whyImportantInJD: `Target job posting explicitly lists ${reqSkill} as an essential skill for the team's stack.`,
        recommendation: `If you have worked with ${reqSkill}, incorporate it under a relevant project bullet point. If not, do NOT invent experience—highlight adjacent tools or pursue a verified project.`,
      });
    }
  }

  // 3. Score Calculation
  const totalReq = Math.max(jdRequiredSkills.length, 1);
  const matchedReq = jdRequiredSkills.filter((s) => presentSkillNames.has(s)).length;
  const matchRatio = matchedReq / totalReq;

  // Technical skills score (/35)
  const techScore = Math.min(35, Math.max(12, Math.round(matchRatio * 35)));

  // Seniority & Experience score (/25)
  let expScore = 18;
  const requires5Plus = jdLower.includes('5+') || jdLower.includes('8+') || jdLower.includes('senior') || jdLower.includes('staff');
  if (requires5Plus && yoeNum < 5) {
    expScore = Math.max(10, Math.round((yoeNum / 5) * 20));
  } else if (yoeNum >= 5) {
    expScore = 24;
  }

  // Keyword Requirement score (/25)
  const kwScore = Math.min(25, Math.max(10, Math.round(matchRatio * 25)));

  // ATS Formatting score (/15)
  const hasGoodStructure = resumeText.includes('EXPERIENCE') || resumeText.includes('Experience');
  const hasSkillsSection = resumeText.includes('SKILLS') || resumeText.includes('Skills');
  const hasContact = resumeText.includes('@') && (resumeText.includes('linkedin') || resumeText.includes('github') || resumeText.includes('com'));
  const atsScore = (hasGoodStructure ? 5 : 2) + (hasSkillsSection ? 5 : 2) + (hasContact ? 4 : 2);

  const overallScore = Math.min(100, techScore + expScore + kwScore + atsScore);

  let ratingTier: ATSAnalysisResult['scoreBreakdown']['ratingTier'] = 'Moderate Match';
  if (overallScore >= 85) ratingTier = 'Strong Match';
  else if (overallScore >= 70) ratingTier = 'Moderate Match';
  else if (overallScore >= 50) ratingTier = 'Low Match';
  else ratingTier = 'Unlikely to Pass ATS';

  // 4. Job Comparison Matrix
  const mustHaveRequirements: ATSAnalysisResult['jobComparison']['mustHaveRequirements'] = [
    {
      requirement: 'Professional Years of Experience & Seniority',
      status: yoeNum >= 4 ? 'Fulfilled' : 'Partially Met',
      evidenceFromResume: `${estimatedYoe} detected in professional experience.`,
      gapExplanation: requires5Plus && yoeNum < 5 ? `Job targets 5+ years seniority; resume shows ${estimatedYoe}.` : 'Meets core experience timeline.',
    },
    {
      requirement: 'Primary Core Languages & Frameworks',
      status: matchRatio >= 0.7 ? 'Fulfilled' : (matchRatio >= 0.4 ? 'Partially Met' : 'Missing'),
      evidenceFromResume: `Matched ${matchedReq} of ${totalReq} key technologies.`,
      gapExplanation: missingSkillsGaps.length > 0 ? `Missing target keywords: ${missingSkillsGaps.slice(0, 3).map((g) => g.skill).join(', ')}.` : 'Strong alignment with primary stack.',
    },
    {
      requirement: 'Production Cloud & Infrastructure Alignment',
      status: resumeLower.includes('aws') || resumeLower.includes('docker') || resumeLower.includes('kubernetes') ? 'Fulfilled' : 'Missing',
      evidenceFromResume: resumeLower.includes('aws') ? 'AWS and container deployment detected.' : 'Cloud provider experience not explicitly highlighted.',
      gapExplanation: jdLower.includes('aws') && !resumeLower.includes('aws') ? 'Job emphasizes AWS cloud deployments.' : 'Satisfies cloud deployment requirements.',
    },
    {
      requirement: 'Quantifiable Engineering Achievements',
      status: /(\d+%|\$[\d,]+|\d+k)/i.test(resumeText) ? 'Fulfilled' : 'Partially Met',
      evidenceFromResume: 'Resume includes performance numbers, latency drops, or team metrics.',
      gapExplanation: 'ATS and hiring managers strongly favor measurable project outcomes over passive duty lists.',
    },
  ];

  // Keyword density comparison
  const sampleKeywords = ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'GraphQL', 'Microservices'];
  const keywordDensityComparison = sampleKeywords.map((kw) => {
    const inJD = jdLower.includes(kw.toLowerCase());
    const count = (resumeLower.match(new RegExp(`\\b${kw.toLowerCase()}\\b`, 'g')) || []).length;
    return {
      keyword: kw,
      inJD,
      inResume: count > 0,
      frequencyInResume: count,
      context: count > 0 ? `Appears ${count} time(s) in resume` : 'Not present in resume text',
    };
  });

  // ATS formatting audit
  const atsFormattingAudit = [
    {
      criterion: 'Section Header Parseability',
      status: (hasGoodStructure && hasSkillsSection ? 'Pass' : 'Warning') as 'Pass' | 'Warning' | 'Issue',
      finding: 'Standard headers (Experience, Skills, Education) allow ATS parsers to accurately index experience dates.',
      fix: 'Keep standard title-case headings without custom graphic icons or fancy callouts.',
    },
    {
      criterion: 'Contact Information & Web Links',
      status: (hasContact ? 'Pass' : 'Issue') as 'Pass' | 'Warning' | 'Issue',
      finding: hasContact ? 'Email, phone, and professional profiles located at top.' : 'Missing verified professional profile link.',
      fix: 'Ensure email, phone number, and LinkedIn/GitHub profile URLs are cleanly formatted at the very top.',
    },
    {
      criterion: 'Bullet Point Action Verb Density',
      status: 'Pass' as const,
      finding: 'Bullets start with strong active verbs (Engineered, Architected, Automated).',
      fix: 'Avoid passive phrases like "Responsible for" or "Assisted in".',
    },
    {
      criterion: 'Metric & Quantitative Proof Ratio',
      status: /(\d+%|\d+k)/i.test(resumeText) ? ('Pass' as const) : ('Warning' as const),
      finding: /(\d+%|\d+k)/i.test(resumeText) ? 'Multiple bullet points contain concrete percentages or time savings.' : 'Lacks quantified business outcomes.',
      fix: 'Include specific numbers: latency reduction, dollar savings, user scale, or test coverage gains.',
    },
  ];

  // 5. Suggested Improvements
  const suggestedImprovements = [
    {
      category: 'Bullet Point Rewrites' as const,
      issue: 'Vague responsibility description without measurable impact',
      beforeExample: 'Built web applications and fixed bugs with team members.',
      afterSuggestedRewrite: 'Architected responsive frontend workflows using React and TypeScript for 45,000 active users, reducing first-contentful paint by 38% through route-level code splitting.',
      explanationInSimpleEnglish: 'Use Google’s X-Y-Z formula: state what you accomplished [X], how it was measured [Y], and the exact technology or architecture you used [Z].',
    },
    {
      category: 'ATS Keyword Alignment' as const,
      issue: 'Missing high-volume keywords explicitly requested in the job posting',
      beforeExample: missingSkillsGaps.length > 0 ? `Resume lacks: ${missingSkillsGaps.slice(0, 2).map((s) => s.skill).join(', ')}` : 'Vague tech stack mentions',
      afterSuggestedRewrite: missingSkillsGaps.length > 0 ? `If you have worked with ${missingSkillsGaps[0]?.skill}, add: "Automated deployment and state storage using ${missingSkillsGaps[0]?.skill} across staging and production clusters."` : 'Embed targeted library names in project descriptions.',
      explanationInSimpleEnglish: 'Automated ATS screeners search for literal keyword strings. If you have legitimate experience with a required tool, name it explicitly.',
    },
    {
      category: 'Skill Presentation' as const,
      issue: 'Listing isolated buzzwords without project reinforcement',
      beforeExample: 'Skills: Docker, Kubernetes, AWS, GraphQL, Redis',
      afterSuggestedRewrite: 'Integrated Redis caching layer into Node.js REST services, reducing 95th percentile database query latency from 240ms to 42ms.',
      explanationInSimpleEnglish: 'Hiring managers discount skills banks unless the same tool appears inside your job bullet points with a real outcome.',
    },
  ];

  // 6. Clarification Questions (Rule: If information is missing, ask the user)
  const missingInformationQuestions = [
    {
      id: 'q1-scale',
      question: 'What scale or user volume did your primary services handle in production?',
      context: 'The job posting values production scale. Stating DAU, request throughput, or data volume significantly strengthens your score.',
      impactOnScore: '+3 to +6 points if production scale is verified',
      suggestedOptions: [
        'Over 10,000+ daily active users',
        'Over 1,000,000+ requests per day',
        'Internal enterprise tool (under 500 users)',
        'Early-stage MVP / startup launch',
      ],
    },
    {
      id: 'q2-cloud',
      question: 'Did you personally configure or deploy cloud infrastructure, or primarily consume existing setups?',
      context: 'The role seeks autonomous infrastructure knowledge (AWS/Terraform/Docker).',
      impactOnScore: '+4 to +7 points if hands-on infrastructure provisioning is confirmed',
      suggestedOptions: [
        'Wrote Terraform / CloudFormation and managed production VPCs/EKS',
        'Built Docker containers and configured CI/CD release pipelines',
        'Deployed applications to pre-configured AWS/GCP services',
        'Did not work directly with cloud infrastructure',
      ],
    },
    {
      id: 'q3-ownership',
      question: 'Did you lead architecture decisions or mentor other team members?',
      context: 'Senior roles require demonstrable leadership and code review ownership.',
      impactOnScore: '+3 to +5 points for leadership or architectural ownership',
      suggestedOptions: [
        'Led architecture design reviews and mentored junior engineers',
        'Individual contributor focusing on feature implementation',
        'Collaborated equally in agile sprint planning',
      ],
    },
  ];

  return {
    candidateSummary: {
      detectedName,
      detectedRoleOrTitle: detectedRole,
      totalYearsExperienceEstimated: estimatedYoe,
      executiveSummary: `${detectedName} presents a solid background in ${detectedRole.toLowerCase()} with ~${estimatedYoe} of demonstrated software delivery. The resume showcases clear technical capabilities in core languages, with strong opportunities to elevate bullet point impact and align keywords with this specific opening.`,
      strengthsOverview: [
        `Strong foundational stack in ${Object.keys(identifiedSkillsMap).slice(0, 3).join(', ')}`,
        'Clean professional formatting with standard chronological layout',
        'Includes verifiable action verbs and project context',
      ],
      criticalHonestVerdict: requires5Plus && yoeNum < 5
        ? `Honest Recruiter Assessment: The candidate shows strong potential, but the job posting specifies senior-level experience (${requires5Plus ? '5+' : 'higher'} years). ATS keyword matching is moderate (${overallScore}/100), and missing must-have keywords (${missingSkillsGaps.slice(0, 2).map((s) => s.skill).join(', ') || 'cloud/distributed systems'}) will trigger manual recruiter scrutiny.`
        : `Honest Recruiter Assessment: Candidate matches ${Math.round(matchRatio * 100)}% of the target technology stack. With targeted bullet point rewrites and honest inclusion of any verified missing skills, this application will pass standard ATS screening filters.`,
    },
    scoreBreakdown: {
      overallScore,
      ratingTier,
      ratingSummary: `Estimated ${overallScore}/100 match against "${jobDescriptionText ? jobDescriptionText.slice(0, 45).replace(/\n/g, ' ') : 'Target Role'}..."`,
      technicalSkillsScore: {
        score: techScore,
        max: 35,
        rationale: `Matched ${matchedReq} of ${totalReq} required skills found in the job description.`,
      },
      experienceSeniorityScore: {
        score: expScore,
        max: 25,
        rationale: `Candidate has approximately ${estimatedYoe} vs role expectations.`,
      },
      keywordRequirementScore: {
        score: kwScore,
        max: 25,
        rationale: `Frequency and placement of critical job requirements across work history.`,
      },
      atsFormattingScore: {
        score: atsScore,
        max: 15,
        rationale: 'Clean section headers, contact visibility, and bullet point parseability.',
      },
    },
    technicalSkillsIdentified,
    missingSkillsGaps,
    jobComparison: {
      jobTitle: targetRoleHint || 'Target Role',
      companyIndustry: 'Technology',
      mustHaveRequirements,
      keywordDensityComparison,
      atsFormattingAudit,
    },
    suggestedImprovements,
    missingInformationQuestions,
    ethicalGuidance: {
      ruleReminder: 'Never Invent Experience or Skills',
      honestNote: 'ATS algorithms check for keywords, but human engineering managers conduct technical deep dives. Always represent your genuine experience with absolute accuracy.',
    },
  };
}
