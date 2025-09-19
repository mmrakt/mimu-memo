import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'jsonc-parser';
import { transformToCareerData } from '@/career/services/data-transformer';
import type { CareerData, RawCareerData } from '@/career/types';
import { safeAsyncCall } from '../shared/error-handler';
import type { AsyncServiceResult } from '../shared/types';

const CAREER_DATA_PATH = 'app/_contents/career/data.jsonc';

export function getCareerData(): AsyncServiceResult<CareerData> {
  return safeAsyncCall(async () => {
    const filePath = path.join(process.cwd(), CAREER_DATA_PATH);
    const content = await fs.promises.readFile(filePath, 'utf8');
    const rawData = parse(content) as RawCareerData;

    if (!rawData) {
      throw new Error('Failed to parse career data from data.jsonc');
    }

    return transformToCareerData(rawData);
  });
}

export function getCareerDataSync(): CareerData {
  const filePath = path.join(process.cwd(), CAREER_DATA_PATH);
  const content = fs.readFileSync(filePath, 'utf8');
  const rawData = parse(content) as RawCareerData;

  if (!rawData) {
    throw new Error('Failed to parse data.jsonc');
  }

  return transformToCareerData(rawData);
}
