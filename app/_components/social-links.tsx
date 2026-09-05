import { GitHubIcon } from '@/_components/icons/github-icon';
import { LinkedInIcon } from '@/_components/icons/linkedin-icon';
import { XIcon } from '@/_components/icons/x-icon';
import { GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL, X_PROFILE_URL } from '@/config';

const socialLinks = [
  {
    ariaLabel: 'GitHub profile',
    href: GITHUB_PROFILE_URL,
    icon: GitHubIcon,
    name: 'GitHub',
  },
  {
    ariaLabel: 'LinkedIn profile',
    href: LINKEDIN_PROFILE_URL,
    icon: LinkedInIcon,
    name: 'LinkedIn',
  },
  {
    ariaLabel: 'X profile',
    href: X_PROFILE_URL,
    icon: XIcon,
    name: 'X',
  },
];

export default function SocialLinks() {
  return (
    <div className="mt-6 flex space-x-4">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            aria-label={social.ariaLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:bg-indigo-500 hover:shadow-indigo-500/30 hover:shadow-lg"
            href={social.href}
            key={social.name}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
}
