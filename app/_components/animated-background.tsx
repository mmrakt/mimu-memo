'use client';

type AnimatedBackgroundProps = {
  variant?: 'float' | 'pulse';
};

export default function AnimatedBackground({ variant = 'float' }: AnimatedBackgroundProps) {
  const animationClass = variant === 'pulse' ? 'animate-pulse-slow' : 'animate-float';

  return (
    <div className="fixed inset-0 z-0 opacity-5">
      <div
        className={`absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500 blur-3xl ${animationClass}`}
      />
      <div
        className={`absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-cyan-400 blur-3xl ${animationClass} animation-delay-1000`}
      />
      <div
        className={`absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-amber-500 blur-3xl ${animationClass} animation-delay-2000`}
      />
    </div>
  );
}
