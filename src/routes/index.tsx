import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowUp, Menu, X, Check, Copy } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/red-editorial.jpg';
import moveImage from '@/assets/project-move.jpg';
import pausaImage from '@/assets/project-pausa.jpg';
import frequenciaImage from '@/assets/project-frequencia.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Enzo Campos — Social Media & Design Criativo' },
    { name: 'description', content: 'Portfólio de Enzo Campos. Estratégia, conteúdo e design para marcas que querem se conectar de verdade.' },
    { property: 'og:title', content: 'Enzo Campos — Portfólio 2026' },
    { property: 'og:description', content: 'Ideias que conectam. Design que faz sentir. Conheça o universo criativo de Enzo Campos.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});

const projects = [
  { id: 'move', name: 'MOVE — Além do movimento', category: 'Social Media', image: moveImage, tags: 'Direção de arte · Social media', description: 'Uma campanha conceitual que transforma a energia do esporte em comunicação visual. Contrastes fortes, fotografia em movimento e mensagens diretas criam uma presença que não passa despercebida.', deliverables: 'Conceito criativo, direção de arte e série de peças para redes sociais.' },
  { id: 'pausa', name: 'PAUSA — Café & conversa', category: 'Social Media', image: pausaImage, tags: 'Conteúdo · Design para redes', description: 'Um projeto conceitual sobre desacelerar. Uma linguagem visual acolhedora, tons orgânicos e narrativas sobre os pequenos encontros do dia a dia dão forma à comunicação de uma cafeteria imaginária.', deliverables: 'Universo visual, linha editorial e peças para redes sociais.' },
  { id: 'frequencia', name: 'Frequência — Cultura em movimento', category: 'Identidade Visual', image: frequenciaImage, tags: 'Identidade visual · Direção criativa', description: 'Identidade conceitual para um festival de música e cultura. Tipografia expressiva, azul elétrico e elementos cromados traduzem a conexão entre pessoas, arte e novos sons.', deliverables: 'Identidade visual, cartazes e aplicações digitais.' },
];
const filters = ['Todos', 'Social Media', 'Identidade Visual'];
const services = [
  { name: 'Estratégia de conteúdo', description: 'Posicionamento, planejamento editorial e ideias que aproximam a marca das pessoas certas.' },
  { name: 'Design para redes sociais', description: 'Posts, carrosséis e campanhas com identidade, intenção e uma linguagem visual consistente.' },
  { name: 'Identidade visual', description: 'Um universo visual próprio para traduzir a essência da sua marca em cada ponto de contato.' },
];

function Portfolio() {
  const [filter, setFilter] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [service, setService] = useState('Estratégia de conteúdo');
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const brief = `Olá, Enzo! Gostaria de conversar sobre um projeto de ${service.toLowerCase()} para a minha marca. Podemos conversar?`;
  async function copyBrief() {
    try { await navigator.clipboard.writeText(brief); setCopied(true); setCopyFailed(false); }
    catch { setCopyFailed(true); }
  }
  function openContact() { setContactOpen(true); setCopied(false); setCopyFailed(false); }
  return (
    <>
      <header className="site-header" id="inicio">
        <a className="wordmark" href="#inicio" aria-label="Enzo Campos, início">enzo campos<span>®</span></a>
        <nav className="desktop-nav" aria-label="Navegação principal"><a href="#projetos">Projetos</a><a href="#sobre">Sobre mim</a><a href="#servicos">O que eu faço</a></nav>
        <a href="#contato" className="header-contact">Vamos conversar <ArrowUpRight /></a>
        <Button className="mobile-menu" variant="ghost" size="icon" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Navegação móvel">{[['Projetos', 'projetos'], ['Sobre mim', 'sobre'], ['O que eu faço', 'servicos'], ['Vamos conversar', 'contato']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      <main>
        <section className="hero" aria-label="Portfólio Enzo Campos">
          <img src={heroImage} alt="Composição editorial em tecido vermelho com luz e movimento" className="hero-image" width={1920} height={1024} fetchPriority="high" />
          <div className="hero-content">
            <div className="hero-topline"><span className="status-dot" /> Criatividade com intenção. Conexões de verdade.</div>
            <div className="hero-name-row"><div className="hero-name">Enzo Campos<br />Social Media & Designer</div><span className="hero-year">SELEÇÃO DE TRABALHOS / 2026</span></div>
            <h1>PORTFÓLIO</h1>
            <div className="hero-bottom"><p className="hero-description">Transformo ideias em conteúdo.<br />E conteúdo em conexões que ficam.</p><span className="hero-specialty">ESTRATÉGIA + DESIGN + CONTEÚDO<br />UM OLHAR CRIATIVO PARA A SUA MARCA.</span></div>
            <div className="hero-actions"><a href="#projetos">Explore os projetos <ArrowDown /></a><a href="#sobre">Um pouco sobre mim <ArrowUpRight /></a></div>
          </div>
          <div className="pattern-strip" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <i key={i} />)}</div>
        </section>
        <div className="ticker" aria-hidden="true"><div className="ticker-track">{['Social media', 'Design criativo', 'Estratégia de conteúdo', 'Identidade visual', 'Conexões reais'].map(text => <span className="contents" key={text}><span>{text}</span><span className="ticker-star">✳</span></span>)}</div></div>
        <section className="section" id="projetos">
          <div className="section-eyebrow">01 / Projetos selecionados</div>
          <div className="section-heading"><h2 className="section-title">Criatividade que<br /><em>sai do feed.</em></h2><p>Um encontro entre estratégia e estética.<br />Explore algumas possibilidades criativas.</p></div>
          <div className="filters" role="group" aria-label="Filtrar projetos">{filters.map(item => <Button key={item} variant="ghost" className="filter-button" data-active={filter === item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'Todos' ? ' (03)' : ''}</Button>)}</div>
          <div className="project-grid">{projects.filter(project => filter === 'Todos' || project.category === filter).map(project => <article className="project-card" key={project.id}>
            <Button className="project-open" variant="ghost" onClick={() => setSelectedProject(project)} aria-label={`Ver projeto ${project.name}`}><img src={project.image} alt={`Peças do projeto conceitual ${project.name}`} width={1200} height={912} loading="lazy" /><span className="project-image-arrow"><ArrowUpRight /></span></Button>
            <div className="project-caption"><div><h3>{project.name}</h3><p>{project.tags}</p></div><span>CONCEITO / 2026</span></div>
          </article>)}</div>
          <p className="work-note">Estudos autorais e projetos conceituais. Marcas e campanhas apresentadas são fictícias.</p>
        </section>
        <section className="about-band" id="sobre"><div className="section about-layout"><div><div className="section-eyebrow">02 / Por trás das ideias</div><h2 className="section-title">Muito prazer,<br />sou o Enzo<span className="text-primary">.</span></h2><div className="about-symbol" aria-hidden="true">✳</div></div><div><p className="about-copy"><strong>Entre uma boa ideia e uma conexão de verdade, existe intenção.</strong> É nesse espaço que eu crio: unindo estratégia, design e conteúdo para dar personalidade à presença digital de cada marca.</p><p className="about-copy">Meu olhar vai além de um feed bonito. Acredito em uma comunicação que tem o que dizer, sabe com quem está falando e encontra a sua própria forma de fazer isso.</p><div className="about-tags"><span>Olhar estratégico</span><span>Essência criativa</span><span>Conexões reais</span></div></div></div></section>
        <section className="section" id="servicos"><div className="section-eyebrow">03 / O que eu faço</div><div className="section-heading"><h2 className="section-title">Da ideia à<br /><em>presença digital.</em></h2><p>Estratégia e criatividade trabalhando juntas, em cada detalhe da sua marca.</p></div><div className="service-list">{services.map((item, i) => <div className="service-row" key={item.name}><span className="service-number">0{i + 1}</span><h3>{item.name}</h3><p>{item.description}</p><ArrowUpRight /></div>)}</div></section>
        <section className="contact-section" id="contato"><div className="section"><div className="section-eyebrow">04 / Próxima conexão</div><div className="contact-top"><div><h2>Sua marca tem uma história.<br /><span>Vamos contar?</span></h2><p>O próximo projeto pode começar com uma boa conversa.</p></div><Button variant="outline" className="contact-circle" onClick={openContact} aria-label="Começar uma conversa"><ArrowUpRight /></Button></div><Button variant="link" className="p-0 mt-5 text-xs" onClick={openContact}>Vamos criar algo juntos <ArrowUpRight /></Button></div></section>
      </main>
      <footer><span>© 2026 Enzo Campos. Feito com intenção.</span><a href="#inicio">De volta ao topo <ArrowUp size={13} /></a></footer>
      <Dialog.Root open={selectedProject !== null} onOpenChange={open => { if (!open) setSelectedProject(null); }}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content"><Dialog.Close asChild><Button variant="secondary" size="icon" className="dialog-close" aria-label="Fechar projeto"><X /></Button></Dialog.Close>{selectedProject && <><img className="dialog-project-image" src={selectedProject.image} alt={selectedProject.name} width={1200} height={912} /><div className="section-eyebrow">Projeto conceitual / 2026</div><Dialog.Title>{selectedProject.name}</Dialog.Title><Dialog.Description>{selectedProject.description}</Dialog.Description><p><strong>Entregas</strong><br />{selectedProject.deliverables}</p><Button onClick={() => { setSelectedProject(null); openContact(); }}>Quero criar um projeto <ArrowUpRight /></Button></>}</Dialog.Content></Dialog.Portal></Dialog.Root>
      <Dialog.Root open={contactOpen} onOpenChange={setContactOpen}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content contact-dialog"><Dialog.Close asChild><Button variant="ghost" size="icon" className="dialog-close" aria-label="Fechar conversa"><X /></Button></Dialog.Close><div className="section-eyebrow">Uma nova ideia começa aqui</div><Dialog.Title>Vamos criar juntos?</Dialog.Title><Dialog.Description>Os canais de contato de Enzo serão adicionados em breve. Você já pode preparar a sua mensagem.</Dialog.Description><label htmlFor="service">O que você tem em mente?</label><select id="service" value={service} onChange={event => { setService(event.target.value); setCopied(false); }}>{services.map(item => <option key={item.name}>{item.name}</option>)}<option>Um projeto completo</option></select><div className="brief-preview">{brief}</div><Button onClick={copyBrief}>{copied ? <Check /> : <Copy />}{copied ? 'Mensagem copiada' : 'Copiar mensagem'}</Button><p role="status">{copyFailed ? 'Selecione e copie o texto da mensagem acima.' : copied ? 'Sua mensagem está pronta para compartilhar com Enzo.' : 'Nenhuma mensagem será enviada automaticamente.'}</p></Dialog.Content></Dialog.Portal></Dialog.Root>
    </>
  );
}
