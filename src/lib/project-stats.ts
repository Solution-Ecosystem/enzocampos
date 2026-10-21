/**
 * ILLUSTRATIVE performance numbers for each client project.
 * The owner will send the real view data from a video; replace `baseStats`
 * (and `growth`) with those numbers when they arrive. The UI labels these as
 * illustrative while `STATS_ARE_ILLUSTRATIVE` is true.
 */
export const STATS_ARE_ILLUSTRATIVE = true;

export type Period = '7d' | '30d' | '6m';

export const PERIODS: { id: Period; label: string; points: number; factor: number }[] = [
  { id: '7d', label: '7 dias', points: 7, factor: 0.24 },
  { id: '30d', label: '30 dias', points: 30, factor: 1 },
  { id: '6m', label: '6 meses', points: 6, factor: 5.4 },
];

type BaseStats = { views: number; reach: number; followers: number; engagement: number; growth: number };

/** Base values for a 30-day period (illustrative). */
export const baseStats: Record<string, BaseStats> = {
  alemao: { views: 4_820_000, reach: 2_140_000, followers: 18_400, engagement: 7.8, growth: 38 },
  dudu: { views: 12_600_000, reach: 6_350_000, followers: 64_200, engagement: 9.2, growth: 52 },
  bolo: { views: 624_000, reach: 318_000, followers: 3_920, engagement: 6.1, growth: 27 },
  fe: { views: 148_500, reach: 72_300, followers: 1_160, engagement: 8.4, growth: 44 },
  oguxhta: { views: 96_400, reach: 51_200, followers: 870, engagement: 5.7, growth: 31 },
};

const WEEKDAYS = ['Qui', 'Sex', 'Sáb', 'Dom', 'Seg', 'Ter', 'Qua'];
const MONTHS = ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];

function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

export type ProjectStats = {
  views: number; reach: number; followers: number; engagement: number; growth: number;
  series: { label: string; views: number }[];
};

/** Deterministic per client + period so server and browser render the same numbers. */
export function getProjectStats(clientId: string, period: Period): ProjectStats {
  const base: BaseStats = baseStats[clientId] ?? baseStats['oguxhta']!;
  const conf = PERIODS.find(p => p.id === period) ?? PERIODS[1]!;
  const views = Math.round(base.views * conf.factor);
  const rand = seeded(hash(`${clientId}-${period}`));
  const weights = Array.from({ length: conf.points }, (_, i) => (0.45 + (i / conf.points) * 1.1) * (0.78 + rand() * 0.44));
  const total = weights.reduce((sum, w) => sum + w, 0);
  const series = weights.map((w, i) => ({
    label: (period === '7d' ? WEEKDAYS[i] : period === '6m' ? MONTHS[i] : undefined) ?? String(i + 1).padStart(2, '0'),
    views: Math.round((w / total) * views),
  }));
  return {
    views,
    reach: Math.round(base.reach * conf.factor),
    followers: Math.round(base.followers * conf.factor),
    engagement: base.engagement,
    growth: base.growth,
    series,
  };
}

const full = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 });
const decimal = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const formatFull = (n: number) => full.format(Math.round(n));
export const formatCompact = (n: number) => compact.format(Math.round(n));
export const formatPercent = (n: number) => `${decimal.format(n)}%`;
