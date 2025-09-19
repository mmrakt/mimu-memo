import { CAREER_CONFIG } from '@/career/config/constants';
import type {
  CareerData,
  CertificationItem,
  DetailedTimelineItem,
  EducationItem,
  RawCareerData,
  SkillCategory,
  StatItem,
} from '@/career/types';
import { formatDateRange } from '@/career/utils/date';
import { convertNumericSkillLevel } from '@/career/utils/skills';

export function transformTimelineData(rawData: RawCareerData): DetailedTimelineItem[] {
  const timeline: DetailedTimelineItem[] = [];

  rawData.workExperience.forEach((job, jobIndex) => {
    job.projects.forEach((project, projectIndex) => {
      timeline.push({
        dateRange: formatDateRange(project.period.start, project.period.end),
        title: project.role || job.role,
        company: job.company,
        location: rawData.personalInfo?.contact?.location || CAREER_CONFIG.DEFAULTS.LOCATION,
        employmentType: CAREER_CONFIG.DEFAULTS.EMPLOYMENT_TYPE,
        summary: project.name,
        responsibilities: project.work || [`${project.name}の開発・実装`],
        keyProjects: [
          {
            name: project.name,
            description: project.teamType
              ? `${project.teamType} (${project.teamSize}名)`
              : `チーム規模: ${project.teamSize || 1}名`,
            impact: project.achievements.join('、'),
            technologies: project.techStacks,
          },
        ],
        achievements: project.achievements.map((achievement) => ({
          metric: '',
          description: achievement,
        })),
        technologies: project.techStacks,
        teamSize: project.teamSize,
        gradientClass:
          CAREER_CONFIG.TIMELINE.GRADIENT_CLASSES[
            (jobIndex + projectIndex) % CAREER_CONFIG.TIMELINE.GRADIENT_CLASSES.length
          ],
      });
    });
  });

  return timeline;
}

export function transformSkillsData(rawData: RawCareerData): SkillCategory[] {
  return [
    {
      category: 'Programming Languages',
      skills: rawData.skills.categories.programmingLanguages.map((skill) => ({
        name: skill.name,
        level: convertNumericSkillLevel(skill.level),
        yearsOfExperience: skill.experience,
      })),
    },
    {
      category: 'Frontend',
      skills: rawData.skills.categories.frontend.map((skill) => ({
        name: skill.name,
        level: convertNumericSkillLevel(skill.level),
        yearsOfExperience: skill.experience,
      })),
    },
    {
      category: 'Backend',
      skills: rawData.skills.categories.backend.map((skill) => ({
        name: skill.name,
        level: convertNumericSkillLevel(skill.level),
        yearsOfExperience: skill.experience,
      })),
    },
    {
      category: 'Databases',
      skills: rawData.skills.categories.databases.map((skill) => ({
        name: skill.name,
        level: convertNumericSkillLevel(skill.level),
        yearsOfExperience: skill.experience,
      })),
    },
    {
      category: 'DevOps & Tools',
      skills: [
        ...rawData.skills.categories.tools.map((skill) => ({
          name: skill.name,
          level: convertNumericSkillLevel(skill.level),
          yearsOfExperience: skill.experience,
        })),
        ...rawData.skills.categories.infrastructure.map((skill) => ({
          name: skill.name,
          level: convertNumericSkillLevel(skill.level),
          yearsOfExperience: skill.experience,
        })),
      ],
    },
  ];
}

export function transformEducationData(rawData: RawCareerData): EducationItem[] {
  return [
    {
      degree: rawData.personalInfo.education.degree,
      field: rawData.personalInfo.education.major,
      institution: rawData.personalInfo.education.university,
      location: '大阪',
      dateRange: formatDateRange(
        rawData.personalInfo.education.period.start,
        rawData.personalInfo.education.period.end
      ),
    },
  ];
}

export function transformCertificationsData(rawData: RawCareerData): CertificationItem[] {
  return rawData.certifications.map((cert) => ({
    name: cert.name,
    issuer: cert.name.includes('AWS') ? 'Amazon Web Services' : 'PHP技術者認定機構',
    date: cert.date,
  }));
}

export function calculateStats(
  timeline: DetailedTimelineItem[],
  certifications: CertificationItem[]
): StatItem[] {
  const totalYearsExperience = new Date().getFullYear() - CAREER_CONFIG.DEFAULTS.START_YEAR;
  const totalProjects = timeline.length;
  const uniqueTechnologies = new Set<string>();
  for (const item of timeline) {
    for (const tech of item.technologies) {
      uniqueTechnologies.add(tech);
    }
  }

  return [
    { number: `${totalYearsExperience}+`, label: 'Years of Experience' },
    { number: `${totalProjects}+`, label: 'Projects Completed' },
    { number: `${uniqueTechnologies.size}+`, label: 'Technologies Used' },
    { number: `${certifications.length}`, label: 'Certifications' },
  ];
}

export function transformToCareerData(rawData: RawCareerData): CareerData {
  const timeline = transformTimelineData(rawData);
  const skills = transformSkillsData(rawData);
  const education = transformEducationData(rawData);
  const certifications = transformCertificationsData(rawData);
  const stats = calculateStats(timeline, certifications);

  return {
    title: rawData.personalInfo.nickName,
    subtitle: rawData.personalInfo.fullName,
    tags: [...CAREER_CONFIG.DEFAULTS.TAGS],
    professionalSummary: rawData.personalInfo.summary,
    timeline,
    skills,
    education,
    certifications,
    stats,
    // Raw data access
    personalInfo: rawData.personalInfo,
    aboutMe: rawData.aboutMe,
    selfPR: rawData.selfPR,
  };
}
