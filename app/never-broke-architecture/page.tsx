import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { Metadata } from 'next'
import { CaseStudy } from './case-study'

const title = 'Built by an agent. The architecture never broke. | asasvirtuais.dev'
const description = 'Case study: Guild RPG, a live multiplayer AI game built by Claude Code on the asasvirtuais framework in ten working days. 240 commits, 19 tables, and the architecture never broke.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [{ url: '/software/guild-rpg.png' }], type: 'article' },
  twitter: { card: 'summary_large_image', title, description, images: ['/software/guild-rpg.png'] },
}

export default async function GuildRPGCaseStudyPage() {
  const markdown = await readFile(path.join(process.cwd(), 'content/guild-rpg-case-study.md'), 'utf8')
  return <CaseStudy markdown={markdown} />
}
