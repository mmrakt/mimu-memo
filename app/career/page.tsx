import { getCareerData } from '@/career/data';
import CareerClient from './CareerClient';

export default function CareerPage() {
  const careerData = getCareerData();

  return <CareerClient careerData={careerData} />;
}
