import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/i18n";
import { useLockScroll } from "@/lib/hooks";

export type Item =
  | { type: "img"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string; sound?: boolean };

export function Lightbox({ items, index, onIndex, onClose }: { items: Item[]; index: number | null; onIndex: (i: number) => void; onClose: () => void }) {
  const t = useT();
  const open = index !== null;
  const box = useRef<HTMLDivElement>(null);
  const last = useRef<Element | null>(null);
  const touch = useRef(0);
  useLockScroll(open);

  const go = (d: number) => index !== null && onIndex((index + d + items.length) % items.length);

  useEffect(() => {
    if (!open) return;
    last.current = document.activeElement;
    box.current?.querySelector<HTMLElement>("button")?.focus();
    return () => (last.current as HTMLElement | null)?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Tab") {
        const f = box.current?.querySelectorAll<HTMLElement>("button, video");
        if (!f?.length) return;
        const first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  if (index === null) return null;
  const it = items[index];

  return (
    <div
      ref={box} role="dialog" aria-modal="true" aria-label={it.alt}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4"
      onClick={onClose}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
      }}
    >
      <button onClick={onClose} aria-label={t.common.close} className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><X /></button>
      {items.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={t.common.prev} className="absolute left-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronLeft /></button>
          <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={t.common.next} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronRight /></button>
        </>
      )}
      <div onClick={(e) => e.stopPropagation()} className="max-h-[88vh] max-w-[92vw]">
        {it.type === "img" ? (
          <img src={it.src} alt={it.alt} className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain" />
        ) : (
          <video key={it.src} src={it.src} poster={it.poster} controls autoPlay playsInline muted={!it.sound} aria-label={it.alt} className="max-h-[88vh] max-w-[92vw] rounded-lg" />
        )}
      </div>
    </div>
  );
}
