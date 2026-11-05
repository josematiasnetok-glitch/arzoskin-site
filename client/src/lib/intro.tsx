import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = { done: boolean; finish: () => void };
const IntroCtx = createContext<Ctx>({ done: true, finish: () => {} });

/** `done` vira true quando a abertura termina (ou é pulada). O hero espera esse sinal para animar. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);
  const value = useMemo(() => ({ done, finish }), [done, finish]);
  return <IntroCtx.Provider value={value}>{children}</IntroCtx.Provider>;
}
export const useIntro = () => useContext(IntroCtx);
