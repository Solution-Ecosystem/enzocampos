import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowUp, Menu, X, Instagram, MessageCircle, Copyright, PenLine, Scissors, CalendarDays, ShieldAlert, Video, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCase, type CaseClient } from '@/components/ProjectCase';
import heroImage from '@/assets/red-editorial.jpg';
import sealImage from '@/assets/seal-check.png';
import kmposLogo from '@/assets/clients/kmpos-logo.png.asset.json';
import enzoPhoto from '@/assets/clients/enzo-campos-2.jpg.asset.json';
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, AGENCY_URL, WHATSAPP_DISPLAY, openExternal, whatsappUrl } from '@/lib/contact';
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

const clients: CaseClient[] = [
  { id: 'alemao', name: 'Alemão Luiz', handle: '@oalemaoluiz', category: 'Influenciadores', role: 'Influenciador · Lifestyle, humor e futebol', audience: '406 mil seguidores', url: 'https://www.instagram.com/oalemaoluiz/', images: [alemao1.url, alemao3.url, alemao4.url], accent: 'blue', description: 'Social media completo para um influenciador de lifestyle, humor e futebol: roteiros, edições e cronograma pensados para manter a constância e fortalecer a conexão com o público.' },
  { id: 'dudu', name: 'Dudu Footz', handle: '@dudufootz', category: 'Influenciadores', role: 'Influenciador · Humor e futebol', audience: '2 milhões de seguidores', url: 'https://www.instagram.com/dudufootz/', images: [dudu1.url, dudu4.url, dudu3.url], accent: 'green', description: 'Estratégia de conteúdo para um perfil de humor e futebol com milhões de seguidores: posicionamento, roteiros com ganchos fortes e edição no ritmo das redes.' },
  { id: 'bolo', name: 'Menina do Bolo', handle: '@meninadobolo_oficial', category: 'Doceria', role: 'Doceria · Confeitaria artesanal', audience: '35 mil seguidores', url: 'https://www.instagram.com/meninadobolo_oficial/', images: [bolo1.url, bolo4.url, bolo6.url], accent: 'pink', description: 'Presença digital para uma confeitaria artesanal: apresentação atrativa dos produtos, cronograma de postagens e uma identidade clara e consistente no feed.' },
  { id: 'fe', name: 'Fe Castro', handle: '@eufecastroo', category: 'Cantores', role: 'Cantor · Compositor', audience: '2,9 mil seguidores', url: 'https://www.instagram.com/eufecastroo/', images: [fe3.url, fe1.url, fe6.url], accent: 'sun', description: 'Posicionamento artístico para cantor e compositor: narrativa do perfil, divulgação de lançamentos e conteúdos que aproximam o artista de quem escuta.' },
  { id: 'oguxhta', name: 'Oguxhta', handle: '@oguxhta', category: 'Cantores', role: 'Cantor', images: [], accent: 'primary', description: 'Social media para cantor: roteiros, edições e estratégia de redes para dar voz e alcance à carreira musical.' },
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
  { label: 'Captação', Icon: Video },
];
const experience = [
  ['Roteiro e edição', 'Alemão Luiz / Influenciador'],
  ['Gestão de perfil', 'Dudu Footz / Influenciador'],
  ['Conteúdo e cronograma', 'Menina do Bolo / Doceria'],
  ['Social media', 'Fe Castro / Cantor'],
  ['Social media', 'Oguxhta / Cantor'],
];
const skills = ['Captação de vídeo', 'Edição dinâmica', 'Roteiros sob medida', 'Artes para marca', 'Cronogramas de postagem', 'Posicionamento nas redes', 'Gerenciamento de crise', 'Grupo de ação e UP'];
const offers = ['Captação de vídeo', 'Edição que prende do início ao fim', 'Roteiros sob medida para qualquer nicho', 'Artes com a cara da sua marca', 'Cronograma de postagens'];
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
          <div className="case-list">{visibleClients.map(client => <ProjectCase key={client.id} client={client} index={clients.indexOf(client)} total={clients.length} />)}</div>
          <p className="work-note">Trabalho de social media no Instagram. Imagens: publicações em destaque de cada perfil.</p>
        </section>
        <section className="about-stage" id="sobre"><div className="section">
          <div className="section-eyebrow">02 / Por trás das ideias</div>
          <div className="about-panel">
            <figure className="about-photo">
              <img src={enzoPhoto.url} alt="Enzo Campos" width={640} height={641} loading="lazy" />
              <figcaption>Enzo<br />Kmpos</figcaption>
              <img className="about-seal" src={sealImage} alt="" aria-hidden="true" width={816} height={816} loading="lazy" />
            </figure>
            <div className="about-info">
              <p className="about-kicker">SOBRE <strong>MIM</strong></p>
              <h2 className="about-hello">OLÁ!</h2>
              <p className="about-lead">Transformo perfis parados ou começando do zero em presença online de verdade.</p>
              <div className="about-grid">
                <div>
                  <h3>NAS REDES</h3>
                  <p><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, INSTAGRAM_URL)}>{INSTAGRAM_HANDLE}</a><br />3,6 mil seguidores<br />Cristo · Lifestyle · Humor</p>
                  <h3>FOCO</h3>
                  <div className="about-tools">{focusAreas.map(({ label, Icon }) => <span key={label} title={label}><Icon aria-hidden="true" /><small>{label}</small></span>)}</div>
                </div>
                <div>
                  <h3>EXPERIÊNCIA</h3>
                  <ul className="about-list">{experience.map(([role, who]) => <li key={who}><span>{role} <small>Instagram</small></span>{who}</li>)}</ul>
                </div>
              </div>
              <div className="about-grid about-grid-bottom">
                <div>
                  <h3>HABILIDADES</h3>
                  <ul className="about-skills">{skills.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h3>IDIOMAS</h3>
                  <p>Português</p>
                </div>
              </div>
              <AgencyBadge />
            </div>
          </div>
          <div className="about-texts"><p><strong>Sua marca merece ser vista. E lembrada.</strong> Sou Enzo Campos, da Kmpos Agency. Pego perfis parados, perdidos ou começando do zero e transformo em presença online de verdade.</p><p><strong>Por que isso importa?</strong> Antes de ligar ou comprar, o cliente te procura no Instagram. Posicionamento é a diferença entre ser mais uma opção e ser a escolha.</p></div>
        </div></section>
        <section className="section" id="servicos"><div className="section-eyebrow">03 / O que eu faço</div><div className="section-heading"><h2 className="section-title">Da ideia à<br /><em>presença digital.</em></h2><p>Tudo o que eu faço com meus clientes, do roteiro ao gerenciamento de crise.</p></div><div className="offer-block"><div><h3>O que eu faço por você</h3><ul>{offers.map(item => <li key={item}>{item}</li>)}</ul></div><p><strong>Nichos atendidos:</strong> advocacia, contabilidade, doceria, eventos corporativos, chá de bebê, aniversários, jogos esportivos e influenciadores. Cada nicho tem sua linguagem, e eu aprendo a falar a sua.</p></div><div className="service-list">{services.map((item, i) => <div className="service-row" key={item.name}><span className="service-number">0{i + 1}</span><h3>{item.name}</h3><p>{item.description}</p><ArrowUpRight /></div>)}</div></section>
        <section className="about-band" id="redes"><div className="section">
          <div className="section-eyebrow">04 / Redes sociais</div>
          <div className="section-heading"><h2 className="section-title">Me acompanhe<br /><em>no Instagram.</em></h2><Button asChild variant="outline" className="social-button"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, INSTAGRAM_URL)}><Instagram /> {INSTAGRAM_HANDLE} <ArrowUpRight /></a></Button></div>
          <div className="reel-grid">{reels.map((id, i) => <div className="reel-frame" key={id}><iframe src={`https://www.instagram.com/reel/${id}/embed/`} title={`Reel ${i + 1} de Enzo Campos no Instagram`} loading="lazy" allow="encrypted-media; picture-in-picture; clipboard-write" allowFullScreen /></div>)}</div>
        </div></section>
        <section className="contact-section" id="contato"><div className="section"><div className="section-eyebrow">05 / Próxima conexão</div><div className="contact-top"><div><h2>Bora tirar sua ideia<br /><span>do papel?</span></h2><p>O primeiro passo é uma conversa rápida, sem compromisso.</p><p>WhatsApp: <strong className="text-foreground">{WHATSAPP_DISPLAY}</strong> · E-mail: <a className="text-foreground underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></p></div><Button asChild variant="outline" className="contact-circle"><a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, whatsapp)} aria-label="Conversar com Enzo no WhatsApp"><ArrowUpRight /></a></Button></div><Button asChild className="mt-5"><a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, whatsapp)}><MessageCircle /> Vamos conversar no WhatsApp</a></Button></div></section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><a className="wordmark" href="#inicio">enzokmpos<span>®</span></a><span>Enzo Campos · Social Media</span></div>
          <nav className="footer-links" aria-label="Redes e contato"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, INSTAGRAM_URL)}><Instagram size={14} /> Instagram</a><a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, whatsapp)}><MessageCircle size={14} /> WhatsApp {WHATSAPP_DISPLAY}</a><a href={`mailto:${EMAIL}`}><Mail size={14} /> {EMAIL}</a></nav>
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

function AgencyBadge() {
  const inner = <>
    <img src={kmposLogo.url} alt="Logo da Kmpos Agency" width={600} height={600} loading="lazy" />
    <span><small>Faz parte da</small><strong>KMPOS AGENCY</strong><em>Social media, conteúdo e posicionamento para marcas que querem ser lembradas.</em></span>
    {AGENCY_URL && <ArrowUpRight aria-hidden="true" />}
  </>;
  return AGENCY_URL
    ? <a className="agency-badge" href={AGENCY_URL} target="_blank" rel="noopener noreferrer" onClick={e => openExternal(e, AGENCY_URL)} aria-label="Visitar o site da Kmpos Agency">{inner}</a>
    : <div className="agency-badge">{inner}</div>;
}
