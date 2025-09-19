'use client';

import type { Skill, SkillCategory } from '@/career/types';

type SkillsMatrixProps = {
  skills: SkillCategory[];
};

const TRANSITION_DELAY_STEP_SECONDS = 0.1;

export function SkillsMatrix({ skills }: SkillsMatrixProps) {
  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'Expert':
        return 'from-emerald-500 to-emerald-600';
      case 'Advanced':
        return 'from-cyan-500 to-cyan-600';
      case 'Intermediate':
        return 'from-amber-500 to-amber-600';
      case 'Beginner':
        return 'from-slate-500 to-slate-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getLevelWidth = (level: Skill['level']) => {
    switch (level) {
      case 'Expert':
        return 'w-full';
      case 'Advanced':
        return 'w-3/4';
      case 'Intermediate':
        return 'w-1/2';
      case 'Beginner':
        return 'w-1/4';
      default:
        return 'w-1/4';
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 py-20">
      <div className="mx-auto max-w-6xl px-8">
        <h2 className="reveal mb-16 translate-y-8 text-center font-bold text-4xl opacity-0 transition-all duration-1000 md:text-5xl">
          Technical Skills
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {skills.map((category, categoryIndex) => (
            <div
              className="reveal translate-y-8 rounded-xl border border-indigo-600/10 bg-slate-800/50 p-8 opacity-0 transition-all duration-300 hover:border-indigo-600/30"
              key={category.category}
              style={{ transitionDelay: `${categoryIndex * TRANSITION_DELAY_STEP_SECONDS}s` }}
            >
              <h3 className="mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-center font-bold text-2xl text-transparent">
                {category.category}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div className="group" key={skill.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-white">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">{skill.level}</span>
                        <span className="text-slate-500 text-xs">
                          {skill.yearsOfExperience}yr{skill.yearsOfExperience > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                      <div
                        className={`h-full bg-gradient-to-r ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)} animate-slideIn rounded-full transition-all duration-500 ease-out`}
                        style={{
                          animationDelay: `${(categoryIndex * category.skills.length + skillIndex) * TRANSITION_DELAY_STEP_SECONDS}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
