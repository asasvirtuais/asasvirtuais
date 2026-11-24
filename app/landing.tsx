'use client'

import { useEffect, useRef, useState } from 'react'

const LINKS = {
  framework: 'https://github.com/asasvirtuais/asasvirtuais-framework',
  fastTrack: 'https://fasttrackbta.us',
  linkedin: 'https://www.linkedin.com/company/asasvirtuaiscom',
  x: '', // ex.: https://x.com/asasvirtuais
  email: 'mailto:icaro@asasvirtuais.dev?subject=Consultoria',
}

const COPY = {
  pt: {
    kicker: 'Consultoria em agentes de código aplicado',
    title: ['Arquitetura que', 'agentes de código', 'não quebram.'],
    framework: 'Framework',
    contact: 'Mande mensagem no LinkedIn',
    bta: 'Business Tools & Apps',
  },
  en: {
    kicker: 'Applied coding agents consulting',
    title: ['Architecture', 'coding agents', "can't break."],
    framework: 'Framework',
    contact: 'Message us on LinkedIn',
    bta: 'Business Tools & Apps',
  },
}

export default function Landing() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt')
  const t = COPY[lang]

  const socials = [
    { href: LINKS.linkedin, label: 'LinkedIn' },
    { href: LINKS.x, label: 'X' },
    { href: 'https://github.com/asasvirtuais', label: 'GitHub' },
  ].filter(s => s.href)

  return (
    <main className="av">
      <style>{css}</style>
      <Fabric />

      <header className="av-top">
        <a href="/" className="av-mark"><span className="av-code">&lt;/&gt;</span>ASAS VIRTUAIS</a>
        <button className="av-lang" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} aria-label="Idioma / Language">
          <span className={lang === 'pt' ? 'on' : ''}>PT</span>
          <span className="sep">/</span>
          <span className={lang === 'en' ? 'on' : ''}>EN</span>
        </button>
      </header>

      <section className="av-hero">
        <p className="av-kicker">{t.kicker}</p>
        <h1 className="av-title">
          {t.title.map((line, i) => <span key={i}>{line}</span>)}
        </h1>
        <nav className="av-links">
          <a href={LINKS.framework} target="_blank" rel="noreferrer">{t.framework}<i>↗</i></a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer">{t.contact}<i>↗</i></a>
        </nav>
      </section>

      <footer className="av-bottom">
        <div className="av-socials">
          {socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}
        </div>
        <a className="av-bta" href={LINKS.fastTrack} target="_blank" rel="noreferrer">
          Fast Track BTA <span>— {t.bta} ↗</span>
        </a>
      </footer>
    </main>
  )
}

/* A grid of dots that behaves like stretched fabric: the pointer is a ball pressing into it. */
function Fabric() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const GAP = 24
    const RADIUS = 190
    const PUSH = 34

    let w = 0, h = 0, dpr = 1
    let cols = 0, rows = 0, ox = 0, oy = 0
    const target = { x: -9999, y: -9999 }
    const ball = { x: -9999, y: -9999, s: 0 }
    let active = false
    let raf = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / GAP) + 2
      rows = Math.ceil(h / GAP) + 2
      ox = (w - (cols - 1) * GAP) / 2
      oy = (h - (rows - 1) * GAP) / 2
    }

    const move = (x: number, y: number) => {
      target.x = x
      target.y = y
      if (!active) { ball.x = x; ball.y = y }
      active = true
    }
    const onMouse = (e: PointerEvent) => move(e.clientX, e.clientY)
    const onLeave = () => { active = false }

    const frame = (time: number) => {
      ball.x += (target.x - ball.x) * 0.12
      ball.y += (target.y - ball.y) * 0.12
      ball.s += ((active ? 1 : 0) - ball.s) * 0.06

      ctx.clearRect(0, 0, w, h)
      const tt = time * 0.0004

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = ox + i * GAP
          let y = oy + j * GAP
          // a slow breathing wave so the cloth is alive without the pointer
          const wave = reduce ? 0 : Math.sin(i * 0.22 + tt * 3) * Math.cos(j * 0.18 - tt * 2)
          y += wave * 2.2

          const dx = x - ball.x
          const dy = y - ball.y
          const d = Math.sqrt(dx * dx + dy * dy)
          let depth = 0
          if (d < RADIUS && ball.s > 0.001) {
            const k = 1 - d / RADIUS
            depth = k * k * (3 - 2 * k) * ball.s // smoothstep
            const push = depth * PUSH
            const nd = d || 1
            x += (dx / nd) * push
            y += (dy / nd) * push
          }

          const r = 0.9 + depth * 1.6 + wave * 0.15
          const a = 0.14 + depth * 0.72 + (wave + 1) * 0.03
          ctx.fillStyle = `rgba(0,0,0,${a})`
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMouse)
    window.addEventListener('pointerdown', onMouse)
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMouse)
      window.removeEventListener('pointerdown', onMouse)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="av-fabric" aria-hidden />
}

const css = `
.av {
  position: fixed; inset: 0; overflow: hidden;
  background: #fff; color: #000;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  display: flex; flex-direction: column;
  -webkit-font-smoothing: antialiased;
}
.av a { color: inherit; text-decoration: none; }
.av-fabric { position: absolute; inset: 0; z-index: 0; }
.av-top, .av-hero, .av-bottom { position: relative; z-index: 1; pointer-events: none; }
.av-top a, .av-top button, .av-hero a, .av-bottom a { pointer-events: auto; }

.av-top {
  display: flex; justify-content: space-between; align-items: center;
  padding: clamp(20px, 3.2vw, 40px) clamp(20px, 4vw, 56px);
}
.av-mark {
  font-family: var(--font-montserrat), var(--font-inter), sans-serif;
  font-weight: 700; font-size: 14px; letter-spacing: 0.42em;
}
.av-mark { display: inline-flex; align-items: center; gap: 14px; }
.av-code { font-family: var(--font-inter), sans-serif; font-weight: 600; font-size: 18px; letter-spacing: 0; }
.av-lang {
  background: none; border: 0; color: #000; cursor: pointer;
  font: inherit; font-size: 12px; letter-spacing: 0.18em; padding: 6px 0;
}
.av-lang span { opacity: 0.35; transition: opacity .2s; }
.av-lang span.on { opacity: 1; }
.av-lang .sep { margin: 0 6px; opacity: 0.25; }

.av-hero {
  flex: 1; display: flex; flex-direction: column; justify-content: center;
  padding: 0 clamp(20px, 4vw, 56px);
}
.av-kicker {
  margin: 0 0 clamp(18px, 2.4vw, 28px);
  font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; opacity: 0.55;
}
.av-title {
  margin: 0; font-weight: 500;
  font-size: clamp(42px, 8.2vw, 128px); line-height: 0.95; letter-spacing: -0.045em;
}
.av-title span { display: block; }
.av-title span:last-child { color: transparent; -webkit-text-stroke: 1px #000; }

.av-links { display: flex; gap: clamp(20px, 3vw, 44px); margin-top: clamp(28px, 4vw, 52px); flex-wrap: wrap; }
.av-links a {
  font-size: 15px; letter-spacing: 0.04em; padding-bottom: 6px;
  border-bottom: 1px solid rgba(0,0,0,0.3); transition: border-color .25s;
}
.av-links a:hover { border-color: #000; }
.av-links i { font-style: normal; margin-left: 10px; display: inline-block; transition: transform .25s; }
.av-links a:hover i { transform: translateX(4px); }

.av-bottom {
  display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap;
  padding: clamp(20px, 3.2vw, 40px) clamp(20px, 4vw, 56px);
  font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
}
.av-socials { display: flex; gap: 24px; }
.av-socials a, .av-bta { opacity: 0.55; transition: opacity .2s; }
.av-socials a:hover, .av-bta:hover { opacity: 1; }
.av-bta span { opacity: 0.7; }

@media (max-width: 600px) {
  .av-bta span { display: none; }
}
`
