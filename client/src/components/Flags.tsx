export const FlagUS = () => (
  <svg viewBox="0 0 24 16" width="20" height="14" aria-hidden="true" className="rounded-[2px]">
    <rect width="24" height="16" fill="#fff" />
    {[0, 2, 4, 6, 8, 10, 12].map((i) => (
      <rect key={i} y={i * 1.2308} width="24" height="1.2308" fill="#B22234" />
    ))}
    <rect width="10" height="8.6" fill="#3C3B6E" />
  </svg>
);
export const FlagBR = () => (
  <svg viewBox="0 0 24 16" width="20" height="14" aria-hidden="true" className="rounded-[2px]">
    <rect width="24" height="16" fill="#009C3B" />
    <path d="M12 2l9 6-9 6-9-6z" fill="#FFDF00" />
    <circle cx="12" cy="8" r="3.2" fill="#002776" />
  </svg>
);
