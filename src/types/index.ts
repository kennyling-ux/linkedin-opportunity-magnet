export interface LinkedInInput {
  rawContent: string;
  profileUrl?: string;
  industry?: string;
  targetRole?: string;
}

export type OpportunityLevel = "low" | "medium" | "high";

export interface ScoreBreakdown {
  visibility: number;       // 0–100
  credibility: number;      // 0–100
  positioning: number;      // 0–100
  overall: number;          // 0–100
  opportunityLevel: OpportunityLevel;
  opportunityReason: string;
  opportunityImprovements: string[];
}

export interface GapAnalysis {
  missingElements: string[];
  contentGaps: string[];
  visibilityIssues: string[];
  credibilityIssues: string[];
}

export interface AnalysisResult {
  scores: ScoreBreakdown;
  gaps: GapAnalysis;
  suggestedIndustry: string;
  suggestedTargetRoles: string[];
  suggestedAudience: string;
}

// Profile Engine
export interface HeadlineVariant {
  style: "authority" | "outcome" | "niche";
  label: string;
  text: string;
}

export interface ProfileOptimization {
  headlines: HeadlineVariant[];
  aboutOriginal: string;
  aboutOptimized: string;
  experienceRewrites: { original: string; optimized: string }[];
  keywords: string[];
}

// Content Engine
export interface PostTopic {
  id: string;
  title: string;
  angle: string;
  estimatedEngagement: "high" | "medium" | "standard";
}

export interface GeneratedPost {
  topicId: string;
  content: string;
  tone: PostTone;
  isDraft?: boolean;
}

export type PostTone = "professional" | "educational" | "viral" | "engagement";

// Credibility Engine
export interface CaseStudy {
  title: string;
  background: string;
  problem: string;
  solution: string;
  process: string;
  results: string;
  metrics: string[];
}

export interface CredibilityAnalysis {
  caseStudies: CaseStudy[];
  missingEvidence: string[];
  contentToAdd: string[];
  suggestedConnections: string[];
}

// Positioning
export interface PositioningAdvice {
  topCareerDirections: { title: string; rationale: string }[];
  targetMarkets: string[];
  skillsToStrengthen: string[];
  contentDirections: string[];
}

// App-wide state
export interface AppState {
  input: LinkedInInput | null;
  analysis: AnalysisResult | null;
  profile: ProfileOptimization | null;
  topics: PostTopic[];
  drafts: GeneratedPost[];
  credibility: CredibilityAnalysis | null;
  positioning: PositioningAdvice | null;
  isAnalyzing: boolean;
}
