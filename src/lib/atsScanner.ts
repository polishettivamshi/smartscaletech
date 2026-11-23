/**
 * Client-side ATS & Job Description analysis engine for SmartScaleTech.
 * Supports Role Benchmark mode and Resume vs. Job Description (JD) match mode.
 */

export interface ATSAnalysisResult {
  mode: 'role' | 'jd';
  score: number;
  grade:
    | 'A+ (Interview Ready)'
    | 'B (Good, Needs Optimization)'
    | 'C (High Risk of Rejection)'
    | 'D (Critical ATS Issues)';
  matchedKeywords: string[];
  missingKeywords: string[];
  metricsCount: number;
  actionVerbsFound: string[];
  sectionsFound: string[];
  missingSections: string[];
  hasContactSignals: boolean;
  wordCount: number;
  risks: string[];
  strengths: string[];
}

export const ROLE_KEYWORD_DATABASE: Record<string, string[]> = {
  'Full-Stack Developer (MERN / MEAN)': [
    'React',
    'Node.js',
    'TypeScript',
    'JavaScript',
    'REST API',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'Redux',
    'Git',
    'Docker',
    'AWS',
    'Tailwind',
    'Microservices',
    'GraphQL',
  ],
  'Java / Spring Boot Developer': [
    'Java',
    'Spring Boot',
    'Microservices',
    'RESTful APIs',
    'Hibernate',
    'JPA',
    'SQL',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'Kafka',
    'JUnit',
    'CI/CD',
    'Git',
    'Maven',
  ],
  'Frontend Developer (React / Next.js)': [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Redux',
    'REST APIs',
    'Webpack',
    'Vite',
    'Performance Optimization',
    'Responsive Design',
    'Git',
  ],
  'Python / Backend Developer': [
    'Python',
    'Django',
    'FastAPI',
    'Flask',
    'PostgreSQL',
    'Redis',
    'Docker',
    'Celery',
    'REST APIs',
    'SQLAlchemy',
    'AWS',
    'Git',
    'Microservices',
    'Linux',
  ],
  'Data Analyst / Business Intelligence': [
    'SQL',
    'Python',
    'Power BI',
    'Tableau',
    'Excel',
    'Pandas',
    'NumPy',
    'Data Visualization',
    'Data Cleaning',
    'Statistics',
    'ETL',
    'Dashboard',
    'Reporting',
  ],
  'Fresher / Junior Software Engineer': [
    'Data Structures',
    'Algorithms',
    'Java',
    'Python',
    'C++',
    'SQL',
    'Git',
    'OOP',
    'Database Management',
    'Object Oriented Programming',
    'Web Development',
    'Problem Solving',
  ],
  'DevOps & Cloud Engineer': [
    'AWS',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Terraform',
    'Linux',
    'Jenkins',
    'Ansible',
    'Git',
    'Prometheus',
    'Grafana',
    'Bash',
    'CloudFormation',
    'Python',
  ],
  'UI/UX & Product Designer': [
    'Figma',
    'User Research',
    'Wireframing',
    'Prototyping',
    'Design Systems',
    'Usability Testing',
    'Information Architecture',
    'Accessibility',
    'Responsive Design',
    'User Flows',
    'Interaction Design',
    'Adobe XD',
  ],
  'Digital Marketing & SEO Specialist': [
    'SEO',
    'Google Analytics',
    'Google Ads',
    'Meta Ads',
    'Keyword Research',
    'On-Page SEO',
    'Technical SEO',
    'Schema Markup',
    'Content Strategy',
    'Conversion Rate Optimization',
    'A/B Testing',
    'Search Console',
  ],
};

// Broad dictionary used to extract high-signal skills from arbitrary pasted Job Descriptions
const GLOBAL_TECH_AND_CAREER_SKILLS: string[] = [
  'Python',
  'Java',
  'JavaScript',
  'TypeScript',
  'C++',
  'C#',
  'Go',
  'React',
  'Next.js',
  'Angular',
  'Vue',
  'Node.js',
  'Express',
  'FastAPI',
  'Django',
  'Flask',
  'Spring Boot',
  'Hibernate',
  'GraphQL',
  'REST API',
  'RESTful APIs',
  'Microservices',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'Redux',
  'SQL',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'Elasticsearch',
  'Oracle',
  'SQLAlchemy',
  'Prisma',
  'AWS',
  'Azure',
  'GCP',
  'EC2',
  'S3',
  'Lambda',
  'RDS',
  'Docker',
  'Kubernetes',
  'Terraform',
  'Jenkins',
  'GitHub Actions',
  'CI/CD',
  'Linux',
  'Git',
  'GitHub',
  'RabbitMQ',
  'Kafka',
  'JIRA',
  'Agile',
  'Scrum',
  'Unit Testing',
  'JUnit',
  'Jest',
  'PyTest',
  'Selenium',
  'Playwright',
  'Machine Learning',
  'Deep Learning',
  'NLP',
  'LLM',
  'Generative AI',
  'RAG',
  'TensorFlow',
  'PyTorch',
  'Pandas',
  'NumPy',
  'Power BI',
  'Tableau',
  'Excel',
  'ETL',
  'Data Structures',
  'Algorithms',
  'System Design',
  'OAuth',
  'JWT',
  'Figma',
  'Wireframing',
  'Prototyping',
  'Design Systems',
  'User Research',
  'SEO',
  'Google Analytics',
  'Google Ads',
  'Meta Ads',
  'Search Console',
  'Content Strategy',
  'Conversion Optimization',
  'Postman',
  'Swagger',
  'Communication',
  'Problem Solving',
];

const ACTION_VERBS = [
  'architected',
  'spearheaded',
  'optimized',
  'engineered',
  'scaled',
  'implemented',
  'developed',
  'designed',
  'reduced',
  'increased',
  'accelerated',
  'automated',
  'refactored',
  'delivered',
  'integrated',
  'streamlined',
  'mentored',
  'managed',
  'built',
  'launched',
];

const STANDARD_SECTIONS: { label: string; patterns: string[] }[] = [
  { label: 'Summary', patterns: ['summary', 'profile', 'objective', 'about me'] },
  { label: 'Skills', patterns: ['skills', 'technical skills', 'technologies', 'tech stack'] },
  { label: 'Experience', patterns: ['experience', 'work history', 'employment', 'internship'] },
  { label: 'Projects', patterns: ['projects', 'key projects', 'personal projects', 'academic projects'] },
  { label: 'Education', patterns: ['education', 'academic', 'university', 'degree', 'b.tech', 'mca', 'b.e'] },
];

export function extractJDKeywords(jobDescription: string): string[] {
  const safeJD = jobDescription.slice(0, 30000);
  const jdLower = safeJD.toLowerCase();
  const detected: string[] = [];
  const seenLower = new Set<string>();

  for (const skill of GLOBAL_TECH_AND_CAREER_SKILLS) {
    const lower = skill.toLowerCase();
    // Avoid partial false matches for short tokens like "go" or "c++"
    const escaped = lower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
    if (regex.test(jdLower) && !seenLower.has(lower)) {
      detected.push(skill);
      seenLower.add(lower);
    }
  }

  // Fallback: extract capitalized technical terms or acronyms from JD if dictionary matches < 6
  if (detected.length < 6) {
    const extraMatches = safeJD.match(/\b[A-Z][A-Za-z0-9+#.-]{2,18}\b/g) || [];
    const ignoreList = new Set([
      'The',
      'And',
      'For',
      'With',
      'You',
      'Your',
      'Our',
      'Are',
      'Will',
      'Must',
      'Should',
      'Experience',
      'Skills',
      'Role',
      'Team',
      'Work',
      'Job',
      'Company',
      'Candidate',
      'Responsibilities',
      'Requirements',
      'Qualifications',
      'Benefits',
      'Hyderabad',
      'India',
      'Bangalore',
      'Bengaluru',
      'Required',
      'Preferred',
      'Strong',
      'Good',
    ]);
    for (const token of extraMatches) {
      const clean = token.replace(/[.,;:]+$/, '');
      if (clean.length >= 2 && !ignoreList.has(clean) && !seenLower.has(clean.toLowerCase())) {
        detected.push(clean);
        seenLower.add(clean.toLowerCase());
        if (detected.length >= 16) break;
      }
    }
  }

  return detected.slice(0, 18);
}

function analyzeCore(
  resumeTextInput: string,
  targetKeywords: string[],
  mode: 'role' | 'jd',
  contextLabel: string
): ATSAnalysisResult {
  const resumeText = resumeTextInput.slice(0, 30000);
  const textLower = resumeText.toLowerCase();
  const words = resumeText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Keyword matching
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  targetKeywords.forEach((kw) => {
    const escaped = kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
    if (regex.test(textLower) || (kw.length > 4 && textLower.includes(kw.toLowerCase()))) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const keywordMatchPercent =
    targetKeywords.length > 0 ? (matchedKeywords.length / targetKeywords.length) * 100 : 50;

  // 2. Quantified impact metrics (STAR format)
  const metricRegex = /\b(\d+[\.,]?\d*[%kKmMxX+]|\$\d+|\₹\d+|\d+\+\s*(?:years|yrs|projects|apis|users|issues|clients))\b/gi;
  const metricsMatches = resumeText.match(metricRegex) || [];
  const metricsCount = metricsMatches.length;

  // 3. Action verbs
  const actionVerbsFound = ACTION_VERBS.filter((verb) => textLower.includes(verb));

  // 4. Section completeness & contact signals
  const sectionsFound: string[] = [];
  const missingSections: string[] = [];

  STANDARD_SECTIONS.forEach((sec) => {
    if (sec.patterns.some((p) => textLower.includes(p))) {
      sectionsFound.push(sec.label);
    } else {
      missingSections.push(sec.label);
    }
  });

  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(resumeText);
  const hasLinkedInOrGitHub = /linkedin\.com|github\.com/i.test(resumeText);
  const hasContactSignals = hasEmail && hasLinkedInOrGitHub;

  // 5. Strengths & risks
  const strengths: string[] = [];
  const risks: string[] = [];

  if (wordCount < 150) {
    risks.push(
      `Resume is too brief (${wordCount} words). Target 380–750 words for strong single-page ATS keyword context.`
    );
  } else if (wordCount > 1100) {
    risks.push(
      `Resume is long (${wordCount} words). Tighten bullets so recruiters can scan top impact within 7 seconds.`
    );
  } else {
    strengths.push(`Optimal word length (${wordCount} words) for fast recruiter & ATS parsing.`);
  }

  if (targetKeywords.length > 0) {
    if (matchedKeywords.length >= targetKeywords.length * 0.65) {
      strengths.push(
        `Strong ${mode === 'jd' ? 'Job Description' : contextLabel} keyword alignment (${matchedKeywords.length}/${targetKeywords.length} matched).`
      );
    } else {
      risks.push(
        `Low ${mode === 'jd' ? 'Job Description' : 'role'} keyword match (${matchedKeywords.length}/${targetKeywords.length}). Missing core terms reduce ATS ranking.`
      );
    }
  } else {
    risks.push('Could not extract specific technical skills from the pasted Job Description. Include the Skills/Requirements section of the JD.');
  }

  if (metricsCount >= 4) {
    strengths.push(
      `Strong quantified impact (${metricsCount} metrics detected) proving measurable engineering/business results.`
    );
  } else {
    risks.push(
      'Too few quantified metrics (add %, latency reductions, user counts, or scale figures to bullets).'
    );
  }

  if (actionVerbsFound.length >= 4) {
    strengths.push(
      `Active ownership verbs detected (${actionVerbsFound.slice(0, 4).join(', ')}).`
    );
  } else {
    risks.push(
      'Weak action verbs. Start bullets with "Architected", "Engineered", "Automated", or "Optimized".'
    );
  }

  if (missingSections.length === 0) {
    strengths.push('All 5 standard ATS sections detected (Summary, Skills, Experience, Projects, Education).');
  } else {
    risks.push(`Missing or unlabeled standard ATS sections: ${missingSections.join(', ')}.`);
  }

  if (!hasContactSignals) {
    risks.push(
      'Ensure clickable email plus LinkedIn/GitHub URLs appear cleanly in the plain-text header (not inside header graphics).'
    );
  }

  // 6. Score Calculation (100-point weighted rubric)
  let score = Math.round(
    keywordMatchPercent * 0.45 +
      Math.min(metricsCount * 5, 20) +
      Math.min(actionVerbsFound.length * 3, 15) +
      (sectionsFound.length / STANDARD_SECTIONS.length) * 10 +
      (wordCount >= 220 && wordCount <= 950 ? 6 : 0) +
      (hasContactSignals ? 4 : 0)
  );

  score = Math.max(25, Math.min(score, 98));

  let grade: ATSAnalysisResult['grade'] = 'D (Critical ATS Issues)';
  if (score >= 85) grade = 'A+ (Interview Ready)';
  else if (score >= 70) grade = 'B (Good, Needs Optimization)';
  else if (score >= 50) grade = 'C (High Risk of Rejection)';

  return {
    mode,
    score,
    grade,
    matchedKeywords,
    missingKeywords,
    metricsCount,
    actionVerbsFound,
    sectionsFound,
    missingSections,
    hasContactSignals,
    wordCount,
    risks,
    strengths,
  };
}

export function scanResumeText(resumeText: string, targetRole: string): ATSAnalysisResult {
  const targetKeywords =
    ROLE_KEYWORD_DATABASE[targetRole] ||
    ROLE_KEYWORD_DATABASE['Fresher / Junior Software Engineer'];
  return analyzeCore(resumeText, targetKeywords, 'role', targetRole);
}

export function scanResumeVsJD(
  resumeText: string,
  jobDescription: string,
  fallbackRole = 'Full-Stack Developer (MERN / MEAN)'
): ATSAnalysisResult {
  const jdKeywords = extractJDKeywords(jobDescription);
  const keywordsToCheck =
    jdKeywords.length > 0
      ? jdKeywords
      : ROLE_KEYWORD_DATABASE[fallbackRole] || [];
  return analyzeCore(resumeText, keywordsToCheck, 'jd', 'Job Description');
}
