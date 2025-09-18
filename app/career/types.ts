// Raw data structure matching data.jsonc
export interface RawCareerData {
  personalInfo: {
    fullName: string;
    nickName: string;
    summary: string;
    languages: Array<{ name: string; level: string }>;
    education: {
      degree: string;
      major: string;
      university: string;
      period: { start: string; end: string };
    };
    contact: {
      website: string;
      github: string;
      x?: string;
      location: string;
    };
  };
  workExperience: Array<{
    id: string;
    company: string;
    period: { start: string; end: string };
    role: string;
    mission?: string;
    targetSystems?: string[];
    projects: Array<{
      name: string;
      period: { start: string; end: string };
      teamSize?: number;
      role?: string;
      teamType?: string;
      work?: string[];
      techStacks: string[];
      achievements: string[];
    }>;
  }>;
  skills: {
    levelDefinition: Record<string, string>;
    categories: {
      programmingLanguages: Array<{ name: string; level: number; experience: number }>;
      frontend: Array<{ name: string; level: number; experience: number }>;
      backend: Array<{ name: string; level: number; experience: number }>;
      databases: Array<{ name: string; level: number; experience: number }>;
      tools: Array<{ name: string; level: number; experience: number }>;
      infrastructure: Array<{ name: string; level: number; experience: number }>;
    };
  };
  certifications: Array<{ name: string; date: string }>;
  aboutMe: {
    blogUrl: string;
    description: string;
  };
  selfPR: {
    autonomy: { title: string; content: string };
    fullstack: { title: string; content: string };
    teamwork: { title: string; content: string };
  };
}

// Processed data for components
export interface CareerData {
  title: string;
  subtitle: string;
  tags: string[];
  professionalSummary: string;
  timeline: DetailedTimelineItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  certifications: CertificationItem[];
  stats: StatItem[];
  // Raw data access
  personalInfo: RawCareerData['personalInfo'];
  aboutMe: RawCareerData['aboutMe'];
  selfPR: RawCareerData['selfPR'];
}

export interface DetailedTimelineItem {
  // Basic information
  dateRange: {
    start: string; // "2023-01" format
    end: string; // "Present" or "2024-12"
  };
  title: string;
  company: string;
  location: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

  // Detailed information
  summary: string;
  responsibilities: string[];
  keyProjects: Project[];
  achievements: Achievement[];
  technologies: string[];
  teamSize?: number;
  reportsTo?: string;

  // Visual
  gradientClass: string;
}

export interface Project {
  name: string;
  description: string;
  impact: string;
  technologies: string[];
  link?: string;
}

export interface Achievement {
  metric: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  yearsOfExperience: number;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  dateRange: {
    start: string;
    end: string;
  };
  gpa?: string;
  honors?: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
}

export interface StatItem {
  number: string;
  label: string;
  icon?: string;
}
