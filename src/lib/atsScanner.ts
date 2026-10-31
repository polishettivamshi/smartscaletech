/**
 * Client-side ATS analysis engine for SmartScaleTech.
 * Scans resume text for keyword coverage, STAR impact metrics, formatting risks, and overall ATS compatibility.
 */

export interface ATSAnalysisResult {
  score: number;
  grade: 'A+ (Interview Ready)' | 'B (Good, Needs Optimization)' | 'C (High Risk of Rejection)' | 'D (Critical ATS Issues)';
  matchedKeywords: string[];
  missingKeywords: string[];
  metricsCount: number;
  actionVerbsFound: string[];
  risks: string[];
  strengths: string[];
}

export const ROLE_KEYWORD_DATABASE: Record<string, string[]> = {
  'Full-Stack Developer (MERN / MEAN)': [
    'React', 'Node.js', 'TypeScript', 'JavaScript', 'REST API', 'Express', 'MongoDB',
    'PostgreSQL', 'Redux', 'Git', 'Docker', 'AWS', 'Tailwind', 'Microservices', 'GraphQL'
  ],
  'Java / Spring Boot Developer': [
    'Java', 'Spring Boot', 'Microservices', 'RESTful APIs', 'Hibernate', 'JPA', 'SQL',
    'PostgreSQL', 'Docker', 'Kubernetes', 'Kafka', 'JUnit', 'CI/CD', 'Git', 'Maven'
  ],
  'Frontend Developer (React / Next.js)': [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS',
    'Redux', 'REST APIs', 'Webpack', 'Vite', 'Performance Optimization', 'Responsive Design', 'Git'
  ],
  'Python / Backend Developer': [
    'Python', 'Django', 'FastAPI', 'Flask', 'PostgreSQL', 'Redis', 'Docker',
    'Celery', 'REST APIs', 'SQLAlchemy', 'AWS', 'Git', 'Microservices', 'Linux'
  ],
  'Data Analyst / Business Intelligence': [
    'SQL', 'Python', 'Power BI', 'Tableau', 'Excel', 'Pandas', 'NumPy',
    'Data Visualization', 'Data Cleaning', 'Statistics', 'ETL', 'Dashboard', 'Reporting'
  ],
  'Fresher / Junior Software Engineer': [
    'Data Structures', 'Algorithms', 'Java', 'Python', 'C++', 'SQL', 'Git',
    'OOP', 'Database Management', 'Object Oriented Programming', 'Web Development', 'Problem Solving'
  ],
  'DevOps & Cloud Engineer': [
    'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Linux', 'Jenkins',
    'Ansible', 'Git', 'Prometheus', 'Grafana', 'Bash', 'CloudFormation', 'Python'
  ],
};

const ACTION_VERBS = [
  'architected', 'spearheaded', 'optimized', 'engineered', 'scaled', 'implemented',
  'developed', 'designed', 'reduced', 'increased', 'accelerated', 'automated',
  'refactored', 'delivered', 'integrated', 'streamlined', 'mentored', 'managed'
];

export function scanResumeText(resumeText: string, targetRole: string): ATSAnalysisResult {
  const textLower = resumeText.toLowerCase();
  const words = textLower.split(/\s+/);
  const targetKeywords = ROLE_KEYWORD_DATABASE[targetRole] || ROLE_KEYWORD_DATABASE['Fresher / Junior Software Engineer'];

  // 1. Keyword analysis
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  targetKeywords.forEach((kw) => {
    if (textLower.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const keywordMatchPercent = targetKeywords.length > 0
    ? (matchedKeywords.length / targetKeywords.length) * 100
    : 50;

  // 2. Metrics & Numbers (STAR formula detection)
  // Searches for numbers with %, $, ₹, k, ms, x, or numeric metrics
  const metricRegex = /\b(\d+[\.,]?\d*[%kKmMxX]?|\$\d+|\₹\d+)\b/g;
  const metricsMatches = resumeText.match(metricRegex) || [];
  const metricsCount = metricsMatches.length;

  // 3. Action verbs found
  const actionVerbsFound: string[] = [];
  ACTION_VERBS.forEach((verb) => {
    if (textLower.includes(verb)) {
      actionVerbsFound.push(verb);
    }
  });

  // 4. Strengths & Risks
  const strengths: string[] = [];
  const risks: string[] = [];

  if (words.length < 150) {
    risks.push('Resume length is too short (under 150 words). May fail minimum experience filtering.');
  } else if (words.length > 1200) {
    risks.push('Resume exceeds 1,200 words. Recruiters and parsers favor concise 1-2 page layouts.');
  } else {
    strengths.push('Optimal word count (400-800 words) for clean 1-2 page ATS scanning.');
  }

  if (matchedKeywords.length >= targetKeywords.length * 0.65) {
    strengths.push(`High target role keyword coverage (${matchedKeywords.length} of ${targetKeywords.length} keywords matched).`);
  } else {
    risks.push(`Missing critical core keywords for ${targetRole}. You matched ${matchedKeywords.length}/${targetKeywords.length}.`);
  }

  if (metricsCount >= 5) {
    strengths.push(`Great quantified impact (${metricsCount} metrics detected). Demonstrates business results over passive duties.`);
  } else {
    risks.push('Low quantified metrics (less than 5 numbers/percentages found). Bullet points appear passive.');
  }

  if (actionVerbsFound.length >= 4) {
    strengths.push(`Strong active leadership verbs found (${actionVerbsFound.slice(0, 4).join(', ')}).`);
  } else {
    risks.push('Weak action verbs. Replace words like "responsible for" with "architected", "engineered", or "optimized".');
  }

  // 5. Calculate Score
  let score = Math.round(
    keywordMatchPercent * 0.5 +
    Math.min(metricsCount * 5, 25) +
    Math.min(actionVerbsFound.length * 4, 15) +
    (words.length >= 250 && words.length <= 1000 ? 10 : 0)
  );

  score = Math.max(25, Math.min(score, 98));

  let grade: ATSAnalysisResult['grade'] = 'D (Critical ATS Issues)';
  if (score >= 85) grade = 'A+ (Interview Ready)';
  else if (score >= 70) grade = 'B (Good, Needs Optimization)';
  else if (score >= 50) grade = 'C (High Risk of Rejection)';

  return {
    score,
    grade,
    matchedKeywords,
    missingKeywords,
    metricsCount,
    actionVerbsFound,
    risks,
    strengths,
  };
}
