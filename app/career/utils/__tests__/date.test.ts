import { describe, expect, it } from 'vitest';
import { formatDate, formatDateRange, formatDateRangeForDisplay } from '@/career/utils/date';

describe('Date Utils', () => {
  describe('formatDateRange', () => {
    it('should format date range with both dates', () => {
      const result = formatDateRange('2023-01', '2024-12');
      expect(result).toEqual({ end: '2024-12', start: '2023-01' });
    });

    it('should handle empty end date', () => {
      const result = formatDateRange('2023-01', '');
      expect(result).toEqual({ end: 'Present', start: '2023-01' });
    });

    it('should handle empty start date', () => {
      const result = formatDateRange('', '2024-12');
      expect(result).toEqual({ end: '2024-12', start: 'Unknown' });
    });
  });

  describe('formatDate', () => {
    it('should format date in YYYY-MM format', () => {
      const result = formatDate('2023-01');
      expect(result).toBe('Jan 2023');
    });

    it('should handle Present date', () => {
      const result = formatDate('Present');
      expect(result).toBe('Present');
    });

    it('should format December correctly', () => {
      const result = formatDate('2023-12');
      expect(result).toBe('Dec 2023');
    });
  });

  describe('formatDateRangeForDisplay', () => {
    it('should format complete date range for display', () => {
      const dateRange = { end: '2024-12', start: '2023-01' };
      const result = formatDateRangeForDisplay(dateRange);
      expect(result).toBe('Jan 2023 - Dec 2024');
    });

    it('should handle Present end date', () => {
      const dateRange = { end: 'Present', start: '2023-01' };
      const result = formatDateRangeForDisplay(dateRange);
      expect(result).toBe('Jan 2023 - Present');
    });
  });
});
