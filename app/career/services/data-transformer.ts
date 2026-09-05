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
        achievements: project.achievements.map((achievement) => ({
          description: achievement,
          metric: '',
        })),
        company: job.company,
        dateRange: formatDateRange(project.period.start, project.period.end),
        employmentType: CAREER_CONFIG.DEFAULTS.EMPLOYMENT_TYPE,
        gradientClass:
          CAREER_CONFIG.TIMELINE.GRADIENT_CLASSES[
            (jobIndex + projectIndex) % CAREER_CONFIG.TIMELINE.GRADIENT_CLASSES.length
          ],
        keyProjects: [
          {
            description: project.teamType
              ? `${project.teamType} (${project.teamSize}名)`
              : `チーム規模: ${project.teamSize || 1}名`,
            impact: project.achievements.join('、'),
            name: project.name,
            technologies: project.techStacks,
          },
        ],
        // biome-ignore lint/suspicious/noUnnecessaryConditions: data.jsoncをas RawCareerDataで断定しており実データの欠損を型で保証できない
        location: rawData.personalInfo?.contact?.location || CAREER_CONFIG.DEFAULTS.LOCATION,
        responsibilities: project.work || [`${project.name}の開発・実装`],
        summary: project.name,
        teamSize: project.teamSize,
        technologies: project.techStacks,
        title: project.role || job.role,
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
        level: convertNumericSkillLevel(skill.level),
        name: skill.name,
        yearsOfExperience: skill.experience,
      })),
    },
    {
      category: 'Frontend',
      skills: rawData.skills.categories.frontend.map((skill) => ({
        level: convertNumericSkillLevel(skill.level),
        name: skill.name,
        yearsOfExperience: skill.experience,
      })),
    },
    {
      category: 'Backend',
      skills: rawData.skills.categories.backend.map((skill) => ({
        level: convertNumericSkillLevel(skill.level),
        name: skill.name,
        yearsOfExperience: skill.experience,
      })),
    },
    {
      category: 'Databases',
      skills: rawData.skills.categories.databases.map((skill) => ({
        level: convertNumericSkillLevel(skill.level),
        name: skill.name,
        yearsOfExperience: skill.experience,
      })),
    },
    {
      category: 'DevOps & Tools',
      skills: [
        ...rawData.skills.categories.tools.map((skill) => ({
          level: convertNumericSkillLevel(skill.level),
          name: skill.name,
          yearsOfExperience: skill.experience,
        })),
        ...rawData.skills.categories.infrastructure.map((skill) => ({
          level: convertNumericSkillLevel(skill.level),
          name: skill.name,
          yearsOfExperience: skill.experience,
        })),
      ],
    },
  ];
}

export function transformEducationData(rawData: RawCareerData): EducationItem[] {
  return [
    {
      dateRange: formatDateRange(
        rawData.personalInfo.education.period.start,
        rawData.personalInfo.education.period.end
      ),
      degree: rawData.personalInfo.education.degree,
      field: rawData.personalInfo.education.major,
      institution: rawData.personalInfo.education.university,
      location: '大阪',
    },
  ];
}

export function transformCertificationsData(rawData: RawCareerData): CertificationItem[] {
  return rawData.certifications.map((cert) => ({
    date: cert.date,
    issuer: cert.name.includes('AWS') ? 'Amazon Web Services' : 'PHP技術者認定機構',
    name: cert.name,
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
    { label: 'Years of Experience', number: `${totalYearsExperience}+` },
    { label: 'Projects Completed', number: `${totalProjects}+` },
    { label: 'Technologies Used', number: `${uniqueTechnologies.size}+` },
    { label: 'Certifications', number: `${certifications.length}` },
  ];
}

export function transformToCareerData(rawData: RawCareerData): CareerData {
  const timeline = transformTimelineData(rawData);
  const skills = transformSkillsData(rawData);
  const education = transformEducationData(rawData);
  const certifications = transformCertificationsData(rawData);
  const stats = calculateStats(timeline, certifications);

  return {
    aboutMe: rawData.aboutMe,
    certifications,
    education,
    // Raw data access
    personalInfo: rawData.personalInfo,
    professionalSummary: rawData.personalInfo.summary,
    selfPR: rawData.selfPR,
    skills,
    stats,
    subtitle: rawData.personalInfo.fullName,
    tags: [...CAREER_CONFIG.DEFAULTS.TAGS],
    timeline,
    title: rawData.personalInfo.nickName,
  };
}
