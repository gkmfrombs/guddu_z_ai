import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { palettes, type Mode, type Palette } from './theme';

type Ctx = { mode: Mode; setMode: (m: Mode) => void; p: Palette };
const ThemeCtx = createContext<Ctx>({ mode: 'dark', setMode: () => {}, p: palettes.dark });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('dark');
  const value = useMemo(() => ({ mode, setMode, p: palettes[mode] }), [mode]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}
export const useTheme = () => useContext(ThemeCtx);
