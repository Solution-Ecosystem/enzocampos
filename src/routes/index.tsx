import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowUp, Menu, X, Instagram, MessageCircle, Copyright, PenLine, Scissors, CalendarDays, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/red-editorial.jpg';
import sealImage from '@/assets/seal-check.png';
import enzoPhoto from '@/assets/clients/enzo-campos.jpg.asset.json';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, openExternal, whatsappUrl } from '@/lib/contact';
import alemao1 from '@/assets/clients/oalemaoluiz-1.jpg.asset.json';
import alemao3 from '@/assets/clients/oalemaoluiz-3.jpg.asset.json';
import alemao4 from '@/assets/clients/oalemaoluiz-4.jpg.asset.json';
import dudu1 from '@/assets/clients/dudufootz-1.jpg.asset.json';
import dudu3 from '@/assets/clients/dudufootz-3.jpg.asset.json';
import dudu4 from '@/assets/clients/dudufootz-4.jpg.asset.json';
import bolo1 from '@/assets/clients/meninadobolo-oficial-1.jpg.asset.json';
import bolo4 from '@/assets/clients/meninadobolo-oficial-4.jpg.asset.json';
import bolo6 from '@/assets/clients/meninadobolo-oficial-6.jpg.asset.json';
import fe1 from '@/assets/clients/eufecastroo-1.jpg.asset.json';
import fe3 from '@/assets/clients/eufecastroo-3.jpg.asset.json';
import fe6 from '@/assets/clients/eufecastroo-6.jpg.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Enzo Campos (@enzokmpos) — Social Media' },
    { name: 'description', content: 'Portfólio de Enzo Campos: social media, roteiros, cronogramas, edições, posicionamento e gerenciamento de crise para influenciadores, artistas e marcas.' },
    { property: 'og:title', content: 'Enzo Campos — Portfólio de Social Media' },
    { property: 'og:description', content: 'Social media para Alemão Luiz, Dudu Footz, Menina do Bolo, Oguxhta e Fe Castro. Conheça o trabalho de @enzokmpos.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});

type Client = { id: string; name: string; handle: string; category: string; role: string; audience?: string; url?: string; images: string[] };

const clients: Client[] = [
  { id: 'alemao', name: 'Alemão Luiz', handle: '@oalemaoluiz', category: 'Influenciadores', role: 'Influenciador · Lifestyle, humor e futebol', audience: '406 mil seguidores', url: 'https://www.instagram.com/oalemaoluiz/', images: [alemao1.url, alemao3.url, alemao4.url] },
  { id: 'dudu', name: 'Dudu Footz', handle: '@dudufootz', category: 'Influenciadores', role: 'Influenciador · Humor e futebol', audience: '2 milhões de seguidores', url: 'https://www.instagram.com/dudufootz/', images: [dudu1.url, dudu4.url, dudu3.url] },
  { id: 'bolo', name: 'Menina do Bolo', handle: '@meninadobolo_oficial', category: 'Doceria', role: 'Doceria · Confeitaria artesanal', audience: '35 mil seguidores', url: 'https://www.instagram.com/meninadobolo_oficial/', images: [bolo1.url, bolo4.url, bolo6.url] },
  { id: 'fe', name: 'Fe Castro', handle: '@eufecastroo', category: 'Cantores', role: 'Cantor · Compositor', audience: '2,9 mil seguidores', url: 'https://www.instagram.com/eufecastroo/', images: [fe3.url, fe1.url, fe6.url] },
  { id: 'oguxhta', name: 'Oguxhta', handle: '@oguxhta', category: 'Cantores', role: 'Cantor', images: [] },
];
const filters = ['Todos', 'Influenciadores', 'Doceria', 'Cantores'];
const services = [
  { name: 'Social media', description: 'Gestão completa do perfil: planejamento, publicação e acompanhamento do dia a dia nas redes.' },
  { name: 'Roteiros', description: 'Roteiros para reels e vídeos pensados para prender a atenção nos primeiros segundos.' },
  { name: 'Cronogramas', description: 'Calendário de conteúdo organizado para manter constância e frequência nas postagens.' },
  { name: 'Edições', description: 'Edição de vídeos com ritmo, cortes e linguagem que conversam com cada público.' },
  { name: 'Posicionamento nas redes', description: 'Definição de tom, estética e narrativa para o perfil ser lembrado pelo que realmente é.' },
  { name: 'Gerenciamento de crise', description: 'Resposta rápida e estratégica para proteger a imagem em momentos delicados.' },
  { name: 'Grupo de ação e UP', description: 'Mobilização de grupos de engajamento para dar “up” nas publicações e ampliar o alcance.' },
];
const focusAreas = [
  { label: 'Roteiro', Icon: PenLine },
  { label: 'Edição', Icon: Scissors },
  { label: 'Cronograma', Icon: CalendarDays },
  { label: 'Crise', Icon: ShieldAlert },
];
const reels = ['DduYEoCB6qZ', 'DdKb0NMhaCy', 'DczJzTrhOBB'];

function Portfolio() {
  const [filter, setFilter] = useState('Todos');
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsapp = whatsappUrl();
  const visibleClients = clients.filter(client => filter === 'Todos' || client.category === filter);
  return (
    <>
      <header className="site-header" id="inicio">
        <a className="wordmark" href="#inicio" aria-label="enzokmpos, início">enzokmpos<span>®</span></a>
        <nav className="desktop-nav" aria-label="Navegação principal"><a href="#projetos">Projetos</a><a href="#sobre">Sobre mim</a><a href="#servicos">O que eu faço</a><a href="#redes">Redes sociais</a></nav>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, whatsapp)} className="header-contact">Vamos conversar <ArrowUpRight /></a>
        <Button className="mobile-menu" variant="ghost" size="icon" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Navegação móvel">{[['Projetos', 'projetos'], ['Sobre mim', 'sobre'], ['O que eu faço', 'servicos'], ['Redes sociais', 'redes']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={e => { setMenuOpen(false); openExternal(e, whatsapp); }}>Vamos conversar</a></nav>}
      <main>
        <section className="hero" aria-label="Portfólio Enzo Campos">
          <img src={heroImage} alt="Composição editorial em tecido vermelho com luz e movimento" className="hero-image" width={1920} height={1024} fetchPriority="high" />
          <div className="hero-content">
            <div className="hero-topline"><span className="status-dot" /> Criatividade com intenção. Conexões de verdade.</div>
            <div className="hero-name-row"><div className="hero-name">Enzo Campos<br />Social Media</div><span className="hero-year">SELEÇÃO DE TRABALHOS / 2026</span></div>
            <h1>PORTFÓLIO</h1>
            <div className="hero-bottom"><p className="hero-description">Transformo ideias em conteúdo.<br />E conteúdo em conexões que ficam.</p><span className="hero-specialty">ROTEIRO + EDIÇÃO + POSICIONAMENTO<br />ESTRATÉGIA PARA QUEM VIVE DAS REDES.</span></div>
            <div className="hero-actions"><a href="#projetos">Explore os projetos <ArrowDown /></a><a href="#sobre">Um pouco sobre mim <ArrowUpRight /></a></div>
          </div>
          <div className="pattern-strip" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <i key={i} />)}</div>
        </section>
        <div className="ticker" aria-hidden="true"><div className="ticker-track">{['Social media', 'Roteiros', 'Edições', 'Posicionamento', 'Gerenciamento de crise'].map(text => <span className="contents" key={text}><span>{text}</span><span className="ticker-star">✳</span></span>)}</div></div>
        <section className="section" id="projetos">
          <div className="section-eyebrow">01 / Projetos selecionados</div>
          <div className="section-heading"><h2 className="section-title">Social media para<br /><em>quem vive das redes.</em></h2><p>Influenciadores, artistas e marcas que confiam no meu trabalho de social media no Instagram.</p></div>
          <div className="filters" role="group" aria-label="Filtrar projetos">{filters.map(item => <Button key={item} variant="ghost" className="filter-button" data-active={filter === item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'Todos' ? ` (0${clients.length})` : ''}</Button>)}</div>
          <div className="project-grid">{visibleClients.map(client => <ClientCard key={client.id} client={client} />)}</div>
          <p className="work-note">Trabalho de social media no Instagram. Imagens: publicações em destaque de cada perfil.</p>
        </section>
        <section className="about-stage" id="sobre"><div className="section">
          <div className="section-eyebrow">02 / Por trás das ideias</div>
          <div className="about-panel">
            <figure className="about-photo">
              <img src={enzoPhoto.url} alt="Enzo Campos" width={360} height={640} loading="lazy" />
              <figcaption>THE<br />REAL ONE</figcaption>
              <img className="about-seal" src={sealImage} alt="" aria-hidden="true" width={816} height={816} loading="lazy" />
            </figure>
            <div className="about-info">
              <p className="about-kicker">SOBRE <strong>MIM</strong></p>
              <h2 className="about-hello">OLÁ!</h2>
              <div className="about-grid">
                <div>
                  <h3>NAS REDES</h3>
                  <p><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, INSTAGRAM_URL)}>{INSTAGRAM_HANDLE}</a><br />3,6 mil seguidores<br />Cristo · Lifestyle · Humor</p>
                  <h3>FOCO</h3>
                  <div className="about-tools">{focusAreas.map(({ label, Icon }) => <span key={label} title={label}><Icon aria-hidden="true" /><small>{label}</small></span>)}</div>
                </div>
                <div>
                  <h3>EXPERIÊNCIA</h3>
                  <ul className="about-list">{clients.map(client => <li key={client.id}><span>Social media <small>Instagram</small></span>{client.name} / {client.role.split(' · ')[0]}</li>)}</ul>
                </div>
              </div>
              <div className="about-grid about-grid-bottom">
                <div>
                  <h3>HABILIDADES</h3>
                  <ul className="about-skills">{services.map(item => <li key={item.name}>{item.name}</li>)}</ul>
                </div>
                <div>
                  <h3>IDIOMAS</h3>
                  <p>Português</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-texts"><p><strong>Entre uma boa ideia e uma conexão de verdade, existe intenção.</strong> É nesse espaço que eu crio: unindo estratégia, roteiro e edição para dar personalidade à presença digital de cada cliente.</p><p>Meu olhar vai além de um feed bonito. Acredito em uma comunicação que tem o que dizer, sabe com quem está falando e encontra a sua própria forma de fazer isso.</p></div>
        </div></section>
        <section className="section" id="servicos"><div className="section-eyebrow">03 / O que eu faço</div><div className="section-heading"><h2 className="section-title">Da ideia à<br /><em>presença digital.</em></h2><p>Tudo o que eu faço com meus clientes, do roteiro ao gerenciamento de crise.</p></div><div className="service-list">{services.map((item, i) => <div className="service-row" key={item.name}><span className="service-number">0{i + 1}</span><h3>{item.name}</h3><p>{item.description}</p><ArrowUpRight /></div>)}</div></section>
        <section className="about-band" id="redes"><div className="section">
          <div className="section-eyebrow">04 / Redes sociais</div>
          <div className="section-heading"><h2 className="section-title">Me acompanhe<br /><em>no Instagram.</em></h2><Button asChild variant="outline" className="social-button"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, INSTAGRAM_URL)}><Instagram /> {INSTAGRAM_HANDLE} <ArrowUpRight /></a></Button></div>
          <div className="reel-grid">{reels.map((id, i) => <div className="reel-frame" key={id}><iframe src={`https://www.instagram.com/reel/${id}/embed/`} title={`Reel ${i + 1} de Enzo Campos no Instagram`} loading="lazy" allow="encrypted-media; picture-in-picture; clipboard-write" allowFullScreen /></div>)}</div>
        </div></section>
        <section className="contact-section" id="contato"><div className="section"><div className="section-eyebrow">05 / Próxima conexão</div><div className="contact-top"><div><h2>Sua marca tem uma história.<br /><span>Vamos contar?</span></h2><p>O próximo projeto pode começar com uma conversa no WhatsApp: <strong className="text-foreground">{WHATSAPP_DISPLAY}</strong></p></div><Button asChild variant="outline" className="contact-circle"><a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, whatsapp)} aria-label="Conversar com Enzo no WhatsApp"><ArrowUpRight /></a></Button></div><Button asChild className="mt-5"><a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, whatsapp)}><MessageCircle /> Vamos conversar no WhatsApp</a></Button></div></section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><a className="wordmark" href="#inicio">enzokmpos<span>®</span></a><span>Enzo Campos · Social Media</span></div>
          <nav className="footer-links" aria-label="Redes e contato"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, INSTAGRAM_URL)}><Instagram size={14} /> Instagram</a><a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, whatsapp)}><MessageCircle size={14} /> WhatsApp {WHATSAPP_DISPLAY}</a></nav>
          <a href="#inicio" className="back-to-top">De volta ao topo <ArrowUp size={13} /></a>
        </div>
        <div className="footer-legal">
          <Copyright aria-hidden="true" />
          <p>© 2026 Solution Ecosystem. Todos os direitos reservados. Este site e seu conteúdo são protegidos pela Lei nº 9.610/98 (Lei de Direitos Autorais). É proibida a reprodução, distribuição ou uso, total ou parcial, sem autorização prévia. Para solicitações de uso, entre em contato com a Solution Ecosystem.</p>
        </div>
      </footer>
    </>
  );
}

function ClientCard({ client }: { client: Client }) {
  const body = <>
    {client.images.length > 0
      ? <div className="client-media">{client.images.map((src, i) => <img key={src} src={src} alt={`Publicação em destaque ${i + 1} de ${client.name} no Instagram`} width={360} height={640} loading="lazy" />)}</div>
      : <div className="client-media client-media-empty" aria-hidden="true"><span>{client.name}</span></div>}
    {client.url && <span className="project-image-arrow"><ArrowUpRight /></span>}
  </>;
  const content = <>
    <div className="project-open">{body}</div>
    <div className="project-caption"><div><h3>{client.name}</h3><p>{client.handle} · {client.role}</p></div><div className="project-meta"><span>{client.audience ?? 'SOCIAL MEDIA'}</span>{client.url && <span className="project-cta"><Instagram /> Ver Instagram</span>}</div></div>
  </>;
  return (
    <article className="project-card">
      {client.url
        ? <a className="project-link" href={client.url} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, client.url!)} aria-label={`Ver o Instagram de ${client.name} (${client.handle})`}>{content}</a>
        : content}
    </article>
  );
}
