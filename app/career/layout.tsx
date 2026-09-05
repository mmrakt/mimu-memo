import type { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'Professional journey and experience as a full-stack developer specializing in modern web technologies.',
  openGraph: {
    description:
      'Professional journey and experience as a full-stack developer specializing in modern web technologies.',
    title: 'Career | mimu-memo',
    type: 'website',
  },
  title: 'Career | mimu-memo',
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
