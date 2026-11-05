export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <circle cx="32" cy="32" r="29" strokeWidth="1.6" />
      <path d="M21 45 32 19l11 26M26 37.5h12" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 leading-none ${light ? "text-cream" : "text-ink"} ${className}`}>
      <Mark className={`h-7 w-7 sm:h-9 sm:w-9 ${light ? "text-gold" : "text-goldDeep"}`} />
      <span className="font-display text-[20px] font-medium tracking-[0.18em] sm:text-[26px] sm:tracking-[0.22em]">ARZOSKIN</span>
    </span>
  );
}
