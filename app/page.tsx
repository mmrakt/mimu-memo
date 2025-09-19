import AnimatedBackground from '@/_components/AnimatedBackground';
import { ExternalLinks, HeroSection, QuickNavigation, SiteOverview } from '@/_components/ui';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 text-slate-50">
      <AnimatedBackground variant="pulse" />
      <div className="relative z-10">
        <HeroSection />
        <SiteOverview />
        <QuickNavigation />
        <ExternalLinks />
      </div>
    </div>
  );
}
