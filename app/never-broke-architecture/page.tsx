import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { Metadata } from 'next'
import { CaseStudy } from './case-study'

const title = 'Never Broke Architecture | asasvirtuais.dev'
const description = 'Case study: an autonomous coding agent built Guild RPG, a live multi-tenant platform, strictly within the asasvirtuais framework across 240 commits. The architecture never broke.'

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
