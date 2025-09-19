import AnimatedBackground from '@/_components/animated-background';
import { ExternalLinks } from '@/_components/ui/external-links';
import { HeroSection } from '@/_components/ui/hero-section';
import { QuickNavigation } from '@/_components/ui/quick-navigation';
import { SiteOverview } from '@/_components/ui/site-overview';

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
