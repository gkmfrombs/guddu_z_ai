export const brand = { violet: '#8b5cf6', cyan: '#22d3ee', pink: '#ff4fa3', orange: '#ffb454', green: '#4ade80' };

export const palettes = {
  dark: { bg: '#07021a', text: '#f6f3ff', mut: '#b9b2e0', glass: 'rgba(255,255,255,0.12)', line: 'rgba(255,255,255,0.22)' },
  light: { bg: '#efe9ff', text: '#1d1550', mut: '#5b4fa0', glass: 'rgba(255,255,255,0.60)', line: 'rgba(80,60,180,0.20)' },
};
export type Mode = keyof typeof palettes;
export type Palette = (typeof palettes)[Mode];

// Font family names registered in App.tsx (useFonts).
export const FONT = { head: 'Fraunces', body: 'Newsreader', semi: 'NewsreaderSemi', italic: 'NewsreaderItalic' } as const;

// Per-corner radii: this gives the "cut" angular look from the demo.
export const corner = (tl: number, tr: number, br: number, bl: number) => ({
  borderTopLeftRadius: tl,
  borderTopRightRadius: tr,
  borderBottomRightRadius: br,
  borderBottomLeftRadius: bl,
});

export const GRAD = {
  user: [brand.violet, brand.pink] as const,
  send: [brand.pink, brand.violet] as const,
  tab: [brand.violet, brand.pink] as const,
  card: ['rgba(139,92,246,0.55)', 'rgba(255,79,163,0.45)'] as const,
};
