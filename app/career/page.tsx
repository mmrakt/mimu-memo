import { getCareerData } from '@/career/data';
import CareerClient from './career-client';

export default function CareerPage() {
  const careerData = getCareerData();

  return <CareerClient careerData={careerData} />;
}
