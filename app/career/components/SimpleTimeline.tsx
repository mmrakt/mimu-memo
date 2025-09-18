'use client';

import { useEffect } from 'react';
import { CAREER_CONFIG } from '@/career/config/constants';
import type { DetailedTimelineItem } from '@/career/types';
import { setupScrollAnimations } from '@/career/utils/animation';
import { formatDateRangeForDisplay } from '@/career/utils/date';

interface SimpleTimelineProps {
  timeline: DetailedTimelineItem[];
}

export function SimpleTimeline({ timeline }: SimpleTimelineProps) {
  useEffect(() => {
    return setupScrollAnimations();
  }, []);

  return (
    <div className="max-w-6xl mx-auto relative px-8">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-600 via-cyan-600 to-amber-600 hidden md:block" />

      {/* Timeline items */}
      {timeline.map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={`timeline-${item.company}-${index}`}
            className={`timeline-item group relative mb-16 md:w-1/2 opacity-0 scale-90 transition-all duration-700 ${
              isEven ? 'md:pr-12 md:mr-auto' : 'md:left-1/2 md:pl-12'
            }`}
            style={{
              transitionDelay: `${index * CAREER_CONFIG.ANIMATION.TIMELINE_DELAY_MULTIPLIER}s`,
            }}
          >
            {/* Timeline dot */}
            <div
              className={`absolute w-5 h-5 bg-slate-900 border-4 border-indigo-600 rounded-full top-6 z-10 transition-all duration-300 group-hover:scale-150 group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 ${
                isEven ? 'md:right-0 md:translate-x-1/2 md:left-auto' : 'md:-left-2.5'
              } left-0`}
            />

            {/* Content */}
            <div
              className={`bg-slate-800 p-6 rounded-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl border border-indigo-600/10 group-hover:border-indigo-600/30 bg-gradient-to-br ${item.gradientClass} ml-8 md:ml-0`}
            >
              {/* Header */}
              <div className={`mb-4 ${isEven ? '' : 'md:text-left'}`}>
                <div className={`flex items-center gap-2 mb-3 ${isEven ? '' : 'md:justify-start'}`}>
                  <div className="text-indigo-400 font-semibold text-sm capitalize tracking-wider">
                    {formatDateRangeForDisplay(item.dateRange)}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-cyan-400 text-base font-semibold">{item.company}</h3>
                  <span className="px-2 py-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-medium rounded-full border border-purple-400/30">
                    {item.title}
                  </span>
                </div>
              </div>

              {/* Project Name - Made more prominent */}
              <div className={`mb-4 ${isEven ? '' : 'md:text-left'}`}>
                <h4 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {item.summary}
                </h4>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs border border-white/20 transition-all hover:bg-white/20 hover:scale-105"
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
                      key={`${item.company}-${achievement.description.slice(0, 20)}-${achievementIndex}`}
                      className="text-slate-300 text-sm flex items-start gap-2"
                    >
                      <span className="text-cyan-400 mt-1">•</span>
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
