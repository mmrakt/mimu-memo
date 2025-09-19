'use client';

import { useEffect, useId } from 'react';

type MainContentProps = {
  children: React.ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  const mainId = useId();

  useEffect(() => {
    // Update any skip links to point to the generated ID
    const skipLinks = document.querySelectorAll('a[href="#main-content"]');
    for (const link of skipLinks) {
      (link as HTMLAnchorElement).href = `#${mainId}`;
    }
  }, [mainId]);

  return (
    <main className="flex-1 pt-16" id={mainId}>
      {children}
    </main>
  );
}
