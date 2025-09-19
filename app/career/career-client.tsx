'use client';

import { useId } from 'react';
import { CareerAnimations } from '@/career/career-animations';
import { EducationSection } from '@/career/components/education-section';
import { PersonalInfo } from '@/career/components/personal-info';
import { SelfPRSection } from '@/career/components/self-pr-section';
import { SimpleTimeline } from '@/career/components/simple-timeline';
import { SkillsMatrix } from '@/career/components/skills-matrix';
import type { CareerData } from '@/career/types';

type CareerClientProps = {
  careerData: CareerData;
};

const TAG_ANIMATION_DELAY_INCREMENT_SECONDS = 0.1;

export default function CareerClient({ careerData }: CareerClientProps) {
  const timelineId = useId();
  const heroContent = (
    <section className="relative flex min-h-screen items-center justify-center px-8">
      <div className="z-10 w-full max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-12 animate-gradient-x bg-[length:200%_200%] bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text font-bold text-5xl text-transparent md:text-6xl lg:text-7xl">
            {careerData.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            {careerData.tags.map((tag, index) => (
              <span
                className="hover:-translate-y-0.5 animate-fadeInUp rounded-full border border-indigo-600/30 bg-indigo-600/10 px-6 py-2 text-sm transition-all hover:bg-indigo-600/20 hover:shadow-indigo-600/30 hover:shadow-lg"
                key={tag}
                style={{ animationDelay: `${index * TAG_ANIMATION_DELAY_INCREMENT_SECONDS}s` }}
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
      <section className="relative py-20" id={timelineId}>
        <h2 className="reveal mb-16 translate-y-8 text-center font-bold text-4xl opacity-0 transition-all duration-1000 md:text-5xl">
          Career Timeline
        </h2>
        <SimpleTimeline timeline={careerData.timeline} />
      </section>

      {/* Skills Matrix */}
      <SkillsMatrix skills={careerData.skills} />

      {/* Education & Recognition */}
      <EducationSection
        certifications={careerData.certifications}
        education={careerData.education}
        languages={careerData.personalInfo.languages}
      />
    </>
  );

  return <CareerAnimations heroContent={heroContent} restContent={restContent} />;
}
