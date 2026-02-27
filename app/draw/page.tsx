import type { Metadata } from 'next';
import DrawClient from '@/draw/draw-client';

export const metadata: Metadata = {
  title: 'Draw | mimu-memo',
  description: 'フリーハンドで自由に描けるドローイングツール',
};

export default function DrawPage() {
  return <DrawClient />;
}
