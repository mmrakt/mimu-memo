'use client';

import { Download, Eraser, Pencil, Trash2, Undo2 } from 'lucide-react';
import { type MouseEvent, type TouchEvent, useCallback, useEffect, useRef, useState } from 'react';
import PageHeader from '@/_components/page-header';

type DrawingTool = 'pencil' | 'eraser';

const CANVAS_BG_COLOR = '#0f172a';

const PALETTE = [
  { value: '#6366f1', label: 'インディゴ' },
  { value: '#22d3ee', label: 'シアン' },
  { value: '#f59e0b', label: 'アンバー' },
  { value: '#a78bfa', label: 'バイオレット' },
  { value: '#34d399', label: 'エメラルド' },
  { value: '#f87171', label: 'レッド' },
  { value: '#ffffff', label: 'ホワイト' },
  { value: '#94a3b8', label: 'スレート' },
] as const;

const STROKE_WIDTHS = [2, 4, 8, 16] as const;
const MAX_HISTORY = 20;

export default function DrawClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const [tool, setTool] = useState<DrawingTool>('pencil');
  const [color, setColor] = useState<string>(PALETTE[0].value);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTHS[0]);
  const [history, setHistory] = useState<ImageData[]>([]);

  const canUndo = history.length > 0;

  const getContext = useCallback(
    (): CanvasRenderingContext2D | null => canvasRef.current?.getContext('2d') ?? null,
    []
  );

  const getCanvasPos = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return null;
      }
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!(canvas && container)) {
      return;
    }

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.fillStyle = CANVAS_BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const saveToHistory = useCallback(() => {
    const ctx = getContext();
    const canvas = canvasRef.current;
    if (!(ctx && canvas)) {
      return;
    }
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-(MAX_HISTORY - 1)), snapshot]);
  }, [getContext]);

  const beginDraw = useCallback(
    (clientX: number, clientY: number) => {
      const pos = getCanvasPos(clientX, clientY);
      if (!pos) {
        return;
      }

      saveToHistory();
      isDrawingRef.current = true;
      lastPosRef.current = pos;

      const ctx = getContext();
      if (!ctx) {
        return;
      }

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, strokeWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = tool === 'eraser' ? CANVAS_BG_COLOR : color;
      ctx.fill();
    },
    [color, strokeWidth, tool, saveToHistory, getContext, getCanvasPos]
  );

  const continueDraw = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDrawingRef.current) {
        return;
      }
      const pos = getCanvasPos(clientX, clientY);
      const lastPos = lastPosRef.current;
      if (!(pos && lastPos)) {
        return;
      }

      const ctx = getContext();
      if (!ctx) {
        return;
      }

      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = tool === 'eraser' ? CANVAS_BG_COLOR : color;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      lastPosRef.current = pos;
    },
    [color, strokeWidth, tool, getContext, getCanvasPos]
  );

  const endDraw = useCallback(() => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  }, []);

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => {
      beginDraw(e.clientX, e.clientY);
    },
    [beginDraw]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => {
      continueDraw(e.clientX, e.clientY);
    },
    [continueDraw]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) {
        return;
      }
      beginDraw(touch.clientX, touch.clientY);
    },
    [beginDraw]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) {
        return;
      }
      continueDraw(touch.clientX, touch.clientY);
    },
    [continueDraw]
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) {
      return;
    }
    const ctx = getContext();
    const canvas = canvasRef.current;
    if (!(ctx && canvas)) {
      return;
    }

    const lastState = history.at(-1);
    if (lastState) {
      ctx.putImageData(lastState, 0, 0);
    }
    setHistory((prev) => prev.slice(0, -1));
  }, [history, getContext]);

  const handleClear = useCallback(() => {
    saveToHistory();
    const ctx = getContext();
    const canvas = canvasRef.current;
    if (!(ctx && canvas)) {
      return;
    }
    ctx.fillStyle = CANVAS_BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [saveToHistory, getContext]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  return (
    <section className="flex flex-col items-center gap-6 px-4 py-8">
      <PageHeader description="フリーハンドで自由に描こう" title="Draw" />

      <div
        aria-label="描画ツール"
        className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-indigo-500/20 bg-slate-800/50 p-4"
        role="toolbar"
      >
        {/* ツール選択 */}
        <fieldset className="m-0 flex gap-2 border-0 p-0">
          <legend className="sr-only">描画ツール選択</legend>
          <button
            aria-label="ペンシルツール"
            aria-pressed={tool === 'pencil'}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-sm transition-colors ${
              tool === 'pencil'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            onClick={() => setTool('pencil')}
            type="button"
          >
            <Pencil size={16} />
            ペンシル
          </button>
          <button
            aria-label="消しゴムツール"
            aria-pressed={tool === 'eraser'}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-sm transition-colors ${
              tool === 'eraser'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            onClick={() => setTool('eraser')}
            type="button"
          >
            <Eraser size={16} />
            消しゴム
          </button>
        </fieldset>

        <div aria-hidden="true" className="h-8 w-px bg-slate-600" />

        {/* カラーパレット */}
        <fieldset className="m-0 flex gap-2 border-0 p-0">
          <legend className="sr-only">色選択</legend>
          {PALETTE.map(({ value, label }) => (
            <button
              aria-label={`${label}を選択`}
              aria-pressed={color === value && tool === 'pencil'}
              className={`h-7 w-7 rounded-full transition-transform hover:scale-110 ${
                color === value && tool === 'pencil'
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800'
                  : ''
              }`}
              key={value}
              onClick={() => {
                setColor(value);
                setTool('pencil');
              }}
              style={{ backgroundColor: value }}
              type="button"
            />
          ))}
        </fieldset>

        <div aria-hidden="true" className="h-8 w-px bg-slate-600" />

        {/* 線の太さ */}
        <fieldset className="m-0 flex items-center gap-2 border-0 p-0">
          <legend className="sr-only">線の太さ選択</legend>
          {STROKE_WIDTHS.map((w) => (
            <button
              aria-label={`太さ${w}px`}
              aria-pressed={strokeWidth === w}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                strokeWidth === w ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-600'
              }`}
              key={w}
              onClick={() => setStrokeWidth(w)}
              type="button"
            >
              <div
                aria-hidden="true"
                className="rounded-full bg-white"
                style={{
                  width: `${Math.min(w * 1.5, 20)}px`,
                  height: `${Math.min(w * 1.5, 20)}px`,
                }}
              />
            </button>
          ))}
        </fieldset>

        <div aria-hidden="true" className="h-8 w-px bg-slate-600" />

        {/* アクション */}
        <div className="flex gap-2">
          <button
            aria-label="元に戻す"
            className="flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 font-medium text-slate-300 text-sm transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canUndo}
            onClick={handleUndo}
            type="button"
          >
            <Undo2 size={16} />
            Undo
          </button>
          <button
            aria-label="キャンバスをクリア"
            className="flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 font-medium text-slate-300 text-sm transition-colors hover:bg-slate-600"
            onClick={handleClear}
            type="button"
          >
            <Trash2 size={16} />
            クリア
          </button>
          <button
            aria-label="描画をPNG形式でダウンロード"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 px-3 py-2 font-medium text-sm text-white transition-all hover:from-indigo-500 hover:to-cyan-500"
            onClick={handleDownload}
            type="button"
          >
            <Download size={16} />
            保存
          </button>
        </div>
      </div>

      {/* キャンバス */}
      <div
        className="h-[60vh] w-full max-w-4xl overflow-hidden rounded-xl border border-indigo-500/20"
        ref={containerRef}
      >
        <canvas
          aria-label="描画キャンバス"
          className={`block h-full w-full ${tool === 'pencil' ? 'cursor-crosshair' : 'cursor-cell'}`}
          onMouseDown={handleMouseDown}
          onMouseLeave={endDraw}
          onMouseMove={handleMouseMove}
          onMouseUp={endDraw}
          onTouchEnd={endDraw}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          ref={canvasRef}
          role="img"
        />
      </div>
    </section>
  );
}
