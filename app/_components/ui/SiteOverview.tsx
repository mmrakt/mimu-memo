import { ABOUT_SITE } from '@/config';

export function SiteOverview() {
  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-8 font-bold text-3xl text-slate-200 md:text-4xl">About this site</h2>
        <p className="mb-12 text-lg text-slate-400 leading-relaxed">
          {ABOUT_SITE[0]}
          <br className="hidden md:block" />
          {ABOUT_SITE[1]}
        </p>
      </div>
    </section>
  );
}
