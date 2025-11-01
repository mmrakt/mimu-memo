'use client';

import { useEffect } from 'react';
import { CAREER_CONFIG } from '@/career/config/constants';
import type { DetailedTimelineItem } from '@/career/types';
import { setupScrollAnimations } from '@/career/utils/animation';
import { formatDateRangeForDisplay } from '@/career/utils/date';

type SimpleTimelineProps = {
  timeline: DetailedTimelineItem[];
};

const ACHIEVEMENT_KEY_SLICE_LENGTH = 20;

export function SimpleTimeline({ timeline }: SimpleTimelineProps) {
  useEffect(() => setupScrollAnimations(), []);

  return (
    <div className="relative mx-auto max-w-6xl px-8">
      {/* Timeline line */}
      <div className="-translate-x-1/2 absolute left-1/2 hidden h-full w-0.5 transform bg-gradient-to-b from-indigo-600 via-cyan-600 to-amber-600 md:block" />

      {/* Timeline items */}
      {timeline.map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            className={`timeline-item group relative mb-16 scale-90 opacity-0 transition-all duration-700 md:w-1/2 ${
              isEven ? 'md:mr-auto md:pr-12' : 'md:left-1/2 md:pl-12'
            }`}
            key={`timeline-${item.company}-${index}`}
            style={{
              transitionDelay: `${index * CAREER_CONFIG.ANIMATION.TIMELINE_DELAY_MULTIPLIER}s`,
            }}
          >
            {/* Timeline dot */}
            <div
              className={`absolute top-6 z-10 h-5 w-5 rounded-full border-4 border-indigo-600 bg-slate-900 transition-all duration-300 group-hover:scale-150 group-hover:border-cyan-400 group-hover:shadow-cyan-400/50 group-hover:shadow-lg ${
                isEven ? 'md:right-0 md:left-auto md:translate-x-1/2' : 'md:-left-2.5'
              } left-0`}
            />

            {/* Content */}
            <div
              className={`group-hover:-translate-y-1 rounded-xl border border-indigo-600/10 bg-gradient-to-br bg-slate-800 p-6 transition-all duration-300 group-hover:border-indigo-600/30 group-hover:shadow-xl ${item.gradientClass} ml-8 md:ml-0`}
            >
              {/* Header */}
              <div className={`mb-4 ${isEven ? '' : 'md:text-left'}`}>
                <div className={`mb-3 flex items-center gap-2 ${isEven ? '' : 'md:justify-start'}`}>
                  <div className="font-semibold text-indigo-400 text-sm capitalize tracking-wider">
                    {formatDateRangeForDisplay(item.dateRange)}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-base text-cyan-400">{item.company}</h3>
                  <span className="rounded-full border border-purple-400/30 bg-gradient-to-r from-purple-600 to-indigo-600 px-2 py-0.5 font-medium text-white text-xs">
                    {item.title}
                  </span>
                </div>
              </div>

              {/* Project Name - Made more prominent */}
              <div className={`mb-4 ${isEven ? '' : 'md:text-left'}`}>
                <h4 className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-semibold text-transparent text-xl">
                  {item.summary}
                </h4>
              </div>

              {/* Technologies */}
              <div className="mb-4 flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs transition-all hover:scale-105 hover:bg-white/20"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Achievements as bullet points */}
              {item.achievements.length > 0 && (
                <ul className={`space-y-2 ${isEven ? 'md:text-left' : ''}`}>
                  {item.achievements.map((achievement, achievementIndex) => (
                    <li
                      className="flex items-start gap-2 text-slate-300 text-sm"
                      key={`${item.company}-${achievement.description.slice(0, ACHIEVEMENT_KEY_SLICE_LENGTH)}-${achievementIndex}`}
                    >
                      <span className="mt-1 text-cyan-400">•</span>
                      <span>{achievement.description}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
