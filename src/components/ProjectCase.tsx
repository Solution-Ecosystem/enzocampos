import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { ArrowUpRight, Instagram, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/use-in-view';
import { openExternal } from '@/lib/contact';
import { PERIODS, STATS_ARE_ILLUSTRATIVE, formatCompact, formatFull, formatPercent, getProjectStats, type Period } from '@/lib/project-stats';

export type CaseClient = {
  id: string; name: string; handle: string; category: string; role: string;
  audience?: string; url?: string; images: string[]; accent: string; description: string;
  /** Label of the main tag above the description; defaults to "Social media". */
  chip?: string;
  /** Instagram reel ids shown instead of the photos. */
  reels?: string[];
  /** Per-image links (e.g. reel URLs); defaults to the profile url. */
  links?: string[];
};

function CountUp({ value, active, format }: { value: number; active: boolean; format: (n: number) => string }) {
  const [display, setDisplay] = useState(0);
  const current = useRef(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { current.current = value; setDisplay(value); return; }
    const from = current.current;
    const duration = started.current ? 800 : 1900;
    started.current = true;
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const v = from + (value - from) * (1 - Math.pow(1 - p, 3));
      current.current = v;
      setDisplay(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, active]);
  return <>{format(display)}</>;
}

export function ProjectCase({ client, index, total }: { client: CaseClient; index: number; total: number }) {
  const { ref, inView } = useInView<HTMLElement>(0.15);
  const [period, setPeriod] = useState<Period>('30d');
  const [live, setLive] = useState(0);
  const stats = useMemo(() => getProjectStats(client.id, period), [client.id, period]);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => setLive(v => v + Math.max(3, Math.round(stats.views * 0.00003 * (0.4 + Math.random())))), 2600);
    return () => clearInterval(timer);
  }, [inView, stats.views]);

  const series = useMemo(() => stats.series.map((point, i) => i === stats.series.length - 1 ? { ...point, views: point.views + live } : point), [stats.series, live]);
  const words = client.name.split(' ');
  const open = (e: React.MouseEvent) => client.url && openExternal(e, client.url);

  return (
    <article ref={ref} className="case" id={`projeto-${client.id}`} style={{ '--case-accent': `var(--${client.accent})` } as CSSProperties} data-inview={inView}>
      <div className="case-head">
        <div className="case-intro">
          <span className="case-index">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {client.category}</span>
          <h3 className="case-title">{words.map(word => <span key={word}>{word}</span>)}</h3>
          <div className="case-chips" aria-hidden="true"><span className="case-chip-main">{client.chip ?? 'Social media'}</span><span className="case-chip-alt">{client.category}</span></div>
          <p className="case-description">{client.description}</p>
          <div className="case-meta">
            <span>{client.handle}</span>
            {client.audience && <span>{client.audience}</span>}
            {client.url && <a href={client.url} target="_blank" rel="noopener noreferrer" onClick={open} className="case-link"><Instagram /> Ver Instagram <ArrowUpRight /></a>}
          </div>
        </div>

        <div className="case-panel">
          <div className="case-panel-top">
            <span className="case-live"><i /> Ao vivo</span>
            <div className="case-periods" role="group" aria-label={`Período dos dados de ${client.name}`}>
              {PERIODS.map(p => <Button key={p.id} variant="ghost" className="case-period" data-active={period === p.id} aria-pressed={period === p.id} onClick={() => setPeriod(p.id)}>{p.label}</Button>)}
            </div>
          </div>
          <div className="case-stats">
            <div className="case-stat case-stat-main">
              <small>Visualizações</small>
              <strong><CountUp value={stats.views + live} active={inView} format={formatFull} /></strong>
              <span className="case-growth"><TrendingUp /> +{stats.growth}% vs. período anterior</span>
            </div>
            <div className="case-stat"><small>Alcance</small><strong><CountUp value={stats.reach} active={inView} format={formatCompact} /></strong></div>
            <div className="case-stat"><small>Novos seguidores</small><strong>+<CountUp value={stats.followers} active={inView} format={formatFull} /></strong></div>
            <div className="case-stat"><small>Engajamento</small><strong><CountUp value={stats.engagement} active={inView} format={formatPercent} /></strong></div>
          </div>
          <div className="case-chart" aria-label={`Gráfico de visualizações de ${client.name}`} role="img">
            {inView && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`fill-${client.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--case-accent)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--case-accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 6" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} interval={period === '30d' ? 4 : 0} />
                  <Tooltip cursor={{ stroke: 'var(--case-accent)', strokeDasharray: '3 3' }} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 11, color: 'var(--foreground)' }} labelStyle={{ color: 'var(--muted-foreground)' }} formatter={(v: number) => [formatFull(v), 'Visualizações']} />
                  <Area key={period} type="monotone" dataKey="views" stroke="var(--case-accent)" strokeWidth={2.5} fill={`url(#fill-${client.id})`} animationDuration={1600} isAnimationActive />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          {STATS_ARE_ILLUSTRATIVE && <p className="case-note">Prévia ilustrativa · os números reais de visualização entram em breve.</p>}
        </div>
      </div>

      <div className={client.reels?.length ? 'case-posters case-posters-reels' : 'case-posters'}>
        {client.reels?.length
          ? client.reels.map((id, i) => (
            <div key={id} className={id === 'DWztCyihR1L' ? 'case-poster case-reel case-reel-wide' : 'case-poster case-reel'}>
              <iframe src={`https://www.instagram.com/reel/${id}/embed/`} title={`Reel ${i + 1} de ${client.name} no Instagram`} loading="lazy" allow="encrypted-media; picture-in-picture; clipboard-write" allowFullScreen scrolling="no" />
            </div>
          ))
          : client.images.length > 0
          ? client.images.map((src, i) => (
            <a key={src} href={client.links?.[i] ?? client.url} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, client.links?.[i] ?? client.url!)} className="case-poster" aria-label={`Abrir o Instagram de ${client.name}`}>
              <img src={src} alt={`Publicação em destaque ${i + 1} de ${client.name} no Instagram`} width={480} height={600} loading="lazy" />
            </a>
          ))
          : Array.from({ length: 3 }, (_, i) => <div key={i} className="case-poster case-poster-empty" aria-hidden="true"><span>{client.name}</span></div>)}
      </div>
    </article>
  );
}
