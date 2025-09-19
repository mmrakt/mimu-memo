import fs from 'node:fs';
import path from 'node:path';
import * as JSONC from 'jsonc-parser';
import { transformToCareerData } from '@/career/services/data-transformer';
import type { CareerData, RawCareerData } from '@/career/types';
import { type AsyncServiceResult, safeAsyncCall } from '../shared';

export async function getCareerData(): AsyncServiceResult<CareerData> {
  return safeAsyncCall(async () => {
    const filePath = path.join(process.cwd(), 'app/_contents/career/data.jsonc');
    const content = await fs.promises.readFile(filePath, 'utf8');
    const rawData = JSONC.parse(content) as RawCareerData;

    if (!rawData) {
      throw new Error('Failed to parse career data from data.jsonc');
    }

    return transformToCareerData(rawData);
  });
}

export function getCareerDataSync(): CareerData {
  const filePath = path.join(process.cwd(), 'app/_contents/career/data.jsonc');
  const content = fs.readFileSync(filePath, 'utf8');
  const rawData = JSONC.parse(content) as RawCareerData;

  if (!rawData) {
    throw new Error('Failed to parse data.jsonc');
  }

  return transformToCareerData(rawData);
}
