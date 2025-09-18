'use client';

import { CareerAnimations } from '@/career/CareerAnimations';
import { EducationSection } from '@/career/components/EducationSection';
import { PersonalInfo } from '@/career/components/PersonalInfo';
import { SelfPRSection } from '@/career/components/SelfPrSection';
import { SimpleTimeline } from '@/career/components/SimpleTimeline';
import { SkillsMatrix } from '@/career/components/SkillsMatrix';
import type { CareerData } from '@/career/types';

interface CareerClientProps {
  careerData: CareerData;
}

export default function CareerClient({ careerData }: CareerClientProps) {
  const heroContent = (
    <section className="min-h-screen flex items-center justify-center relative px-8">
      <div className="z-10 max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
            {careerData.title}
          </h1>
          <div className="flex flex-wrap gap-4 justify-center">
            {careerData.tags.map((tag, index) => (
              <span
                key={tag}
                className="px-6 py-2 bg-indigo-600/10 border border-indigo-600/30 rounded-full text-sm transition-all hover:bg-indigo-600/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-600/30 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <PersonalInfo personalInfo={careerData.personalInfo} />
      </div>
    </section>
  );

  const restContent = (
    <>
      {/* Self PR Section */}
      <SelfPRSection selfPR={careerData.selfPR} />

      {/* Timeline Section */}
      <section id="timeline" className="py-20 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 reveal opacity-0 translate-y-8 transition-all duration-1000">
          Career Timeline
        </h2>
        <SimpleTimeline timeline={careerData.timeline} />
      </section>

      {/* Skills Matrix */}
      <SkillsMatrix skills={careerData.skills} />

      {/* Education & Recognition */}
      <EducationSection
        education={careerData.education}
        certifications={careerData.certifications}
        languages={careerData.personalInfo.languages}
      />
    </>
  );

  return <CareerAnimations heroContent={heroContent} restContent={restContent} />;
}
