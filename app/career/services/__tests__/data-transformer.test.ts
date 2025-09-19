import { describe, expect, it } from 'vitest';
import { calculateStats, transformTimelineData } from '@/career/services/data-transformer';
import type { RawCareerData } from '@/career/types';

const STAT_COUNT = 4;

describe('Data Transformer', () => {
  const mockRawData: RawCareerData = {
    personalInfo: {
      fullName: 'Test User',
      nickName: 'test',
      summary: 'Test summary',
      languages: [],
      education: {
        degree: 'Bachelor',
        major: 'Computer Science',
        university: 'Test University',
        period: { start: '2015-04', end: '2019-03' },
      },
      contact: {
        website: 'https://test.com',
        github: 'https://github.com/test',
        location: 'Tokyo',
      },
    },
    workExperience: [
      {
        id: 'test-company',
        company: 'Test Company',
        period: { start: '2020-01', end: '' },
        role: 'Engineer',
        projects: [
          {
            name: 'Test Project',
            period: { start: '2020-01', end: '2020-12' },
            teamSize: 5,
            role: 'Developer',
            techStacks: ['React', 'Node.js'],
            achievements: ['Completed project successfully'],
          },
        ],
      },
    ],
    skills: {
      levelDefinition: {},
      categories: {
        programmingLanguages: [],
        frontend: [],
        backend: [],
        databases: [],
        tools: [],
        infrastructure: [],
      },
    },
    certifications: [{ name: 'Test Certification', date: '2023-01' }],
    aboutMe: {
      blogUrl: 'https://blog.test.com',
      description: 'Test blog',
    },
    selfPR: {
      autonomy: { title: 'Test', content: 'Test content' },
      fullstack: { title: 'Test', content: 'Test content' },
      teamwork: { title: 'Test', content: 'Test content' },
    },
  };

  describe('transformTimelineData', () => {
    it('should transform work experience to timeline items', () => {
      const result = transformTimelineData(mockRawData);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        title: 'Developer',
        company: 'Test Company',
        summary: 'Test Project',
        technologies: ['React', 'Node.js'],
        teamSize: 5,
      });
    });
  });

  describe('calculateStats', () => {
    it('should calculate correct stats', () => {
      const timeline = transformTimelineData(mockRawData);
      const certifications = [{ name: 'Test', issuer: 'Test', date: '2023-01' }];

      const result = calculateStats(timeline, certifications);

      expect(result).toHaveLength(STAT_COUNT);
      expect(result[0].label).toBe('Years of Experience');
      expect(result[1].label).toBe('Projects Completed');
      expect(result[2].label).toBe('Technologies Used');
      expect(result[3].label).toBe('Certifications');
    });
  });
});
