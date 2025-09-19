import Link from 'next/link';
import AnimatedBackground from '@/_components/animated-background';

export default function NotFound() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-6xl text-indigo-500">404</h1>
          <h2 className="mb-4 font-semibold text-2xl text-slate-100">記事が見つかりません</h2>
          <p className="mb-8 text-slate-400">
            お探しのブログ記事は存在しないか、削除された可能性があります。
          </p>
          <Link
            className="inline-flex items-center rounded-lg bg-indigo-500 px-6 py-3 text-white transition-colors duration-300 hover:bg-indigo-600"
            href="/memo"
          >
            Back to memo page
          </Link>
        </div>
      </div>
    </div>
  );
}
