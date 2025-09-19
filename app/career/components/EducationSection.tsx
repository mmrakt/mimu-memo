'use client';

import { CAREER_CONFIG } from '@/career/config/constants';
import type { CertificationItem, EducationItem } from '@/career/types';
import { formatDateRangeForDisplay } from '@/career/utils/date';

type EducationSectionProps = {
  education: EducationItem[];
  certifications: CertificationItem[];
  languages?: Array<{ name: string; level: string }>;
};

export function EducationSection({ education, certifications, languages }: EducationSectionProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-8">
        <h2 className="reveal mb-16 translate-y-8 text-center font-bold text-4xl opacity-0 transition-all duration-1000 md:text-5xl">
          Education & Recognition
        </h2>

        <div
          className={`grid grid-cols-1 ${languages ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}
        >
          {/* Education */}
          <div className="reveal translate-y-8 opacity-0 transition-all duration-700">
            <h3 className="mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-center font-bold text-2xl text-transparent">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  className="hover:-translate-y-1 rounded-xl border border-purple-600/10 bg-slate-800/50 p-6 transition-all duration-300 hover:border-purple-600/30 hover:shadow-lg"
                  key={`edu-${edu.institution}-${index}`}
                >
                  <h4 className="mb-2 font-semibold text-lg text-white">
                    {edu.degree} in {edu.field}
                  </h4>
                  <p className="mb-1 font-medium text-purple-400">{edu.institution}</p>
                  <p className="mb-2 text-slate-400 text-sm">{edu.location}</p>
                  <p className="mb-3 text-slate-400 text-sm">
                    {formatDateRangeForDisplay(edu.dateRange)}
                  </p>

                  {edu.gpa && (
                    <div className="mb-2 font-medium text-emerald-400 text-sm">GPA: {edu.gpa}</div>
                  )}

                  {edu.honors && edu.honors.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {edu.honors.map((honor) => (
                        <span
                          className="rounded-full border border-purple-600/30 bg-purple-600/20 px-3 py-1 text-purple-300 text-xs"
                          key={honor}
                        >
                          {honor}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div
            className="reveal translate-y-8 opacity-0 transition-all duration-700"
            style={{ transitionDelay: '0.1s' }}
          >
            <h3 className="mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-center font-bold text-2xl text-transparent">
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  className="hover:-translate-y-1 rounded-xl border border-cyan-600/10 bg-slate-800/50 p-6 transition-all duration-300 hover:border-cyan-600/30 hover:shadow-lg"
                  key={`cert-${cert.name}-${index}`}
                >
                  <h4 className="mb-2 font-semibold text-lg text-white">{cert.name}</h4>
                  <p className="mb-1 font-medium text-cyan-400">{cert.issuer}</p>
                  <p className="mb-2 text-slate-400 text-sm">
                    Issued:{' '}
                    {new Date(cert.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>

                  {cert.expiryDate && (
                    <p className="mb-2 text-slate-400 text-sm">
                      Expires:{' '}
                      {new Date(cert.expiryDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </p>
                  )}

                  {cert.credentialId && (
                    <p className="text-slate-500 text-xs">ID: {cert.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          {languages && (
            <div
              className="reveal translate-y-8 opacity-0 transition-all duration-700"
              style={{ transitionDelay: '0.2s' }}
            >
              <h3 className="mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-center font-bold text-2xl text-transparent">
                Languages
              </h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div
                    className="hover:-translate-y-1 rounded-xl border border-emerald-600/10 bg-slate-800/50 p-6 transition-all duration-300 hover:border-emerald-600/30 hover:shadow-lg"
                    key={`lang-${lang.name}-${index}`}
                  >
                    <h4 className="mb-2 font-semibold text-lg text-white">{lang.name}</h4>
                    <p className="font-medium text-emerald-400">
                      {CAREER_CONFIG.LANGUAGE_LEVELS[
                        lang.level as keyof typeof CAREER_CONFIG.LANGUAGE_LEVELS
                      ] || lang.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
