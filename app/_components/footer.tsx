import SocialLinks from '@/_components/social-links';
import { ABOUT_ME, MY_NAME } from '@/config';

export default function Footer() {
  return (
    <footer className="mt-auto border-indigo-500/20 border-t bg-gradient-to-b from-slate-800/50 to-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text font-bold text-transparent text-xl">
              About
            </h3>
            <p className="mb-6 text-slate-400 leading-relaxed">{ABOUT_ME.join(' ')}</p>
            <SocialLinks />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-indigo-500/10 border-t pt-8 text-center">
          <p className="text-slate-400 text-sm">&copy; 2025 {MY_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
