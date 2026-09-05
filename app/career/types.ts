// Raw data structure matching data.jsonc
export interface RawCareerData {
  aboutMe: {
    blogUrl: string;
    description: string;
  };
  certifications: Array<{ name: string; date: string }>;
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
  selfPR: {
    autonomy: { title: string; content: string };
    fullstack: { title: string; content: string };
    teamwork: { title: string; content: string };
  };
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
}

// Processed data for components
export interface CareerData {
  aboutMe: RawCareerData['aboutMe'];
  certifications: CertificationItem[];
  education: EducationItem[];
  // Raw data access
  personalInfo: RawCareerData['personalInfo'];
  professionalSummary: string;
  selfPR: RawCareerData['selfPR'];
  skills: SkillCategory[];
  stats: StatItem[];
  subtitle: string;
  tags: string[];
  timeline: DetailedTimelineItem[];
  title: string;
}

export interface DetailedTimelineItem {
  achievements: Achievement[];
  company: string;
  // Basic information
  dateRange: {
    start: string; // "2023-01" format
    end: string; // "Present" or "2024-12"
  };
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

  // Visual
  gradientClass: string;
  keyProjects: Project[];
  location: string;
  reportsTo?: string;
  responsibilities: string[];

  // Detailed information
  summary: string;
  teamSize?: number;
  technologies: string[];
  title: string;
}

export interface Project {
  description: string;
  impact: string;
  link?: string;
  name: string;
  technologies: string[];
}

export interface Achievement {
  description: string;
  metric: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  name: string;
  yearsOfExperience: number;
}

export interface EducationItem {
  dateRange: {
    start: string;
    end: string;
  };
  degree: string;
  field: string;
  gpa?: string;
  honors?: string[];
  institution: string;
  location: string;
}

export interface CertificationItem {
  credentialId?: string;
  date: string;
  expiryDate?: string;
  issuer: string;
  link?: string;
  name: string;
}

export interface StatItem {
  icon?: string;
  label: string;
  number: string;
}
