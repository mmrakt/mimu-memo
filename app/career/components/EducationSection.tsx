'use client';

import { CAREER_CONFIG } from '@/career/config/constants';
import type { CertificationItem, EducationItem } from '@/career/types';
import { formatDateRangeForDisplay } from '@/career/utils/date';

interface EducationSectionProps {
  education: EducationItem[];
  certifications: CertificationItem[];
  languages?: Array<{ name: string; level: string }>;
}

export function EducationSection({ education, certifications, languages }: EducationSectionProps) {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 reveal opacity-0 translate-y-8 transition-all duration-1000">
          Education & Recognition
        </h2>

        <div
          className={`grid grid-cols-1 ${languages ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}
        >
          {/* Education */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700">
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={`edu-${edu.institution}-${index}`}
                  className="bg-slate-800/50 p-6 rounded-xl border border-purple-600/10 hover:border-purple-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {edu.degree} in {edu.field}
                  </h4>
                  <p className="text-purple-400 font-medium mb-1">{edu.institution}</p>
                  <p className="text-slate-400 text-sm mb-2">{edu.location}</p>
                  <p className="text-slate-400 text-sm mb-3">
                    {formatDateRangeForDisplay(edu.dateRange)}
                  </p>

                  {edu.gpa && (
                    <div className="text-emerald-400 text-sm font-medium mb-2">GPA: {edu.gpa}</div>
                  )}

                  {edu.honors && edu.honors.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {edu.honors.map((honor) => (
                        <span
                          key={honor}
                          className="px-3 py-1 bg-purple-600/20 rounded-full text-xs border border-purple-600/30 text-purple-300"
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
            className="reveal opacity-0 translate-y-8 transition-all duration-700"
            style={{ transitionDelay: '0.1s' }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={`cert-${cert.name}-${index}`}
                  className="bg-slate-800/50 p-6 rounded-xl border border-cyan-600/10 hover:border-cyan-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <h4 className="text-lg font-semibold text-white mb-2">{cert.name}</h4>
                  <p className="text-cyan-400 font-medium mb-1">{cert.issuer}</p>
                  <p className="text-slate-400 text-sm mb-2">
                    Issued:{' '}
                    {new Date(cert.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>

                  {cert.expiryDate && (
                    <p className="text-slate-400 text-sm mb-2">
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
              className="reveal opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: '0.2s' }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Languages
              </h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div
                    key={`lang-${lang.name}-${index}`}
                    className="bg-slate-800/50 p-6 rounded-xl border border-emerald-600/10 hover:border-emerald-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2">{lang.name}</h4>
                    <p className="text-emerald-400 font-medium">
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
