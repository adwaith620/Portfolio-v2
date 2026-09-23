import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, Menu as MenuIcon, Volume2, VolumeX, X } from 'lucide-react'
import { experience, profile, projects } from './data'

function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const start = performance.now()
    const tick = (now) => {
      const next = Math.min(100, Math.round((now - start) / 22))
      setProgress(next)
      if (next < 100) requestAnimationFrame(tick)
      else setTimeout(onDone, 500)
    }
    requestAnimationFrame(tick)
  }, [onDone])
  return <div className="loader" aria-label="Loading portfolio"><div className="loader-name">PORTFOLIO<span>/ADWAITH</span></div><div className="loader-bottom"><span>LOADING EXPERIENCE</span><strong>{progress}%</strong></div><div className="loader-bar"><i style={{ width: `${progress}%` }} /></div></div>
}

function Menu({ open, close }) {
  return <div className={`menu-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
    <div className="menu-top"><span>MENU / 2026</span><button onClick={close} aria-label="Close menu"><X size={20} /></button></div>
    <nav className="menu-links"><a href="#about" onClick={close}>About <sup>01</sup></a><a href="#work" onClick={close}>Work <sup>02</sup></a><a href="#experience" onClick={close}>Experience <sup>03</sup></a><a href="#contact" onClick={close}>Contact <sup>04</sup></a></nav>
    <div className="menu-footer"><span>LET'S MAKE SOMETHING USEFUL</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
  </div>
}

function ProjectCard({ project, index }) {
  return <article className="project reveal" style={{ '--accent': project.color }}>
    <a className="project-media" href={project.url} aria-label={`View ${project.title}`}>
      <img src={project.image} alt="" loading="lazy" />
      <span className="project-number">0{index + 1}</span><span className="project-arrow"><ArrowUpRight size={18} /></span>
      <span className="project-shade" />
    </a>
    <div className="project-meta"><div><span className="eyebrow">{project.tag}</span><h3>{project.title}</h3></div><span className="year">{project.year}</span></div>
  </article>
}

export function App() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sound, setSound] = useState(true)
  const revealRef = useRef(null)

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.12 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [loading])

  useEffect(() => {
    document.body.style.overflow = loading || menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading, menuOpen])

  if (loading) return <Loader onDone={() => setLoading(false)} />

  return <>
    <Menu open={menuOpen} close={() => setMenuOpen(false)} />
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Home"><span>AK</span><small>ADWAITH<br />KRISHNA</small></a>
      <div className="header-right"><button className="sound" onClick={() => setSound(!sound)}>{sound ? <Volume2 size={16} /> : <VolumeX size={16} />} SOUND — {sound ? 'ON' : 'OFF'}</button><button className="menu-button" onClick={() => setMenuOpen(true)}>MENU <MenuIcon size={17} /></button></div>
    </header>

    <main id="top">
      <section className="hero section-pad" id="about">
        <div className="hero-top"><span className="mono">{profile.location}</span><span className="mono">{profile.coordinates}</span><span className="hero-index">01 — 04</span></div>
        <div className="hero-copy"><p className="kicker reveal">{profile.role}</p><h1 className="reveal">Designing<br /><em>clearer</em> futures<span className="period">.</span></h1><p className="hero-intro reveal">{profile.intro}</p></div>
        <div className="hero-bottom"><span className="scroll-cue"><span className="scroll-dot" /> Scroll down</span><span className="mono">© 2026 / {profile.shortName.toUpperCase()}</span></div>
      </section>

      <section className="statement section-pad reveal"><div className="section-label"><span>01</span><span>ABOUT</span></div><div className="statement-copy"><p className="huge">I make digital things feel <span>simple</span>, <span>human</span>, and a little more alive.</p><div className="statement-aside"><p>{profile.note}</p><a href="#contact" className="text-link">Let's talk <ArrowUpRight size={17} /></a></div></div></section>

      <section className="tools section-pad"><div className="section-label"><span>02</span><span>TOOLKIT</span></div><div className="tool-grid">{['Figma', 'Framer', 'Notion', 'Photoshop', 'Illustrator', 'After Effects'].map((tool, i) => <div className="tool reveal" key={tool}><span>0{i + 1}</span><strong>{tool}</strong><span className="tool-mark">↗</span></div>)}</div></section>

      <section className="work section-pad" id="work"><div className="section-label"><span>03</span><span>SNAP-SHOTS</span></div><div className="work-heading"><h2>Selected<br /><em>work</em></h2><p>Small selection of recent collaborations, experiments, and interfaces.</p></div><div className="project-grid">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}</div></section>

      <section className="experience section-pad" id="experience"><div className="section-label"><span>04</span><span>EXPERIENCE</span></div><div className="experience-heading"><h2>Where I've<br /><em>been</em></h2><p>Learning from teams, clients, and every version in between.</p></div><div className="experience-list">{experience.map((item, i) => <details className="experience-row reveal" key={item.company} open={i === 0}><summary><span className="exp-num">0{i + 1}</span><span className="exp-company">{item.company}</span><span className="exp-role">{item.role}</span><span className="exp-date">{item.dates}</span><ChevronDown size={19} /></summary><div className="exp-description"><p>{item.description}</p></div></details>)}</div></section>

      <section className="contact section-pad" id="contact"><div className="contact-line"><span className="mono">HAVE A GOOD ONE?</span><span className="mono">05 — CONTACT</span></div><h2>Let's make<br /><em>something</em><br />useful<span className="period">.</span></h2><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={25} /></a></section>
    </main>

    <footer className="footer section-pad"><div className="footer-top"><span>© 2026 {profile.name}</span><a href="#top">Back to top ↑</a></div><div className="footer-links"><div><small>CONNECT</small><a href={profile.links.linkedin}>LinkedIn</a><a href={profile.links.github}>GitHub</a><a href={profile.links.instagram}>Instagram</a></div><div><small>ELSEWHERE</small><a href={profile.links.dribbble}>Dribbble</a><a href={profile.cv}>Download CV</a></div><div className="footer-note">Built with curiosity<br />and a lot of coffee.</div></div></footer>
  </>
}
