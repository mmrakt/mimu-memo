import { MapPin } from 'lucide-react';
import { GitHubIcon } from '@/_components/icons/github-icon';
import { XIcon } from '@/_components/icons/x-icon';
import { CAREER_CONFIG } from '@/career/config/constants';
import type { RawCareerData } from '@/career/types';

type PersonalInfoProps = {
  personalInfo: RawCareerData['personalInfo'];
};

export function PersonalInfo({ personalInfo }: PersonalInfoProps) {
  return (
    <div
      className="mt-16 animate-fadeInUp text-center"
      style={{ animationDelay: CAREER_CONFIG.ANIMATION.HERO_DELAY }}
    >
      {/* Location */}
      <div className="mb-6 flex items-center justify-center gap-2 text-slate-400">
        <MapPin className="h-4 w-4" />
        <span>{personalInfo.contact.location}</span>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          aria-label="View GitHub profile"
          className="text-cyan-400 transition-colors hover:text-cyan-300"
          href={personalInfo.contact.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHubIcon className="h-5 w-5" />
        </a>
        {personalInfo.contact.x && (
          <a
            aria-label="Follow on X"
            className="text-cyan-400 transition-colors hover:text-cyan-300"
            href={personalInfo.contact.x}
            rel="noopener noreferrer"
            target="_blank"
          >
            <XIcon className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
}
