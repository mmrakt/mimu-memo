'use client';

import { useEffect, useId } from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  const mainId = useId();

  useEffect(() => {
    // Update any skip links to point to the generated ID
    const skipLinks = document.querySelectorAll('a[href="#main-content"]');
    skipLinks.forEach((link) => {
      (link as HTMLAnchorElement).href = `#${mainId}`;
    });
  }, [mainId]);

  return (
    <main id={mainId} className="flex-1 pt-16">
      {children}
    </main>
  );
}
