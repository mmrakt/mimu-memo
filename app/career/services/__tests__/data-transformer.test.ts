import { describe, expect, it } from 'vitest';
import { calculateStats, transformTimelineData } from '@/career/services/data-transformer';
import type { RawCareerData } from '@/career/types';

const STAT_COUNT = 4;

describe('Data Transformer', () => {
  const mockRawData: RawCareerData = {
    aboutMe: {
      blogUrl: 'https://blog.test.com',
      description: 'Test blog',
    },
    certifications: [{ date: '2023-01', name: 'Test Certification' }],
    personalInfo: {
      contact: {
        github: 'https://github.com/test',
        location: 'Tokyo',
        website: 'https://test.com',
      },
      education: {
        degree: 'Bachelor',
        major: 'Computer Science',
        period: { end: '2019-03', start: '2015-04' },
        university: 'Test University',
      },
      fullName: 'Test User',
      languages: [],
      nickName: 'test',
      summary: 'Test summary',
    },
    selfPR: {
      autonomy: { content: 'Test content', title: 'Test' },
      fullstack: { content: 'Test content', title: 'Test' },
      teamwork: { content: 'Test content', title: 'Test' },
    },
    skills: {
      categories: {
        backend: [],
        databases: [],
        frontend: [],
        infrastructure: [],
        programmingLanguages: [],
        tools: [],
      },
      levelDefinition: {},
    },
    workExperience: [
      {
        company: 'Test Company',
        id: 'test-company',
        period: { end: '', start: '2020-01' },
        projects: [
          {
            achievements: ['Completed project successfully'],
            name: 'Test Project',
            period: { end: '2020-12', start: '2020-01' },
            role: 'Developer',
            teamSize: 5,
            techStacks: ['React', 'Node.js'],
          },
        ],
        role: 'Engineer',
      },
    ],
  };

  describe('transformTimelineData', () => {
    it('should transform work experience to timeline items', () => {
      const result = transformTimelineData(mockRawData);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        company: 'Test Company',
        summary: 'Test Project',
        teamSize: 5,
        technologies: ['React', 'Node.js'],
        title: 'Developer',
      });
    });
  });

  describe('calculateStats', () => {
    it('should calculate correct stats', () => {
      const timeline = transformTimelineData(mockRawData);
      const certifications = [{ date: '2023-01', issuer: 'Test', name: 'Test' }];

      const result = calculateStats(timeline, certifications);

      expect(result).toHaveLength(STAT_COUNT);
      expect(result[0].label).toBe('Years of Experience');
      expect(result[1].label).toBe('Projects Completed');
      expect(result[2].label).toBe('Technologies Used');
      expect(result[3].label).toBe('Certifications');
    });
  });
});
