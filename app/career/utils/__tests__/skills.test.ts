import { describe, expect, it } from 'vitest';
import { convertNumericSkillLevel } from '@/career/utils/skills';

const LEVEL_BELOW_RANGE = 0;
const LEVEL_ABOVE_RANGE = 6;
const LEVEL_NEGATIVE = -1;
const INVALID_LEVELS = [LEVEL_BELOW_RANGE, LEVEL_ABOVE_RANGE, LEVEL_NEGATIVE] as const;

describe('Skills Utils', () => {
  describe('convertNumericSkillLevel', () => {
    const levelExpectations = [
      { input: 5, label: 'Expert' },
      { input: 4, label: 'Expert' },
      { input: 3, label: 'Advanced' },
      { input: 2, label: 'Intermediate' },
      { input: 1, label: 'Beginner' },
    ];

    for (const { input, label } of levelExpectations) {
      it(`should convert level ${input} to ${label}`, () => {
        expect(convertNumericSkillLevel(input)).toBe(label);
      });
    }

    it('should default to Beginner for invalid levels', () => {
      for (const level of INVALID_LEVELS) {
        expect(convertNumericSkillLevel(level)).toBe('Beginner');
      }
    });
  });
});
