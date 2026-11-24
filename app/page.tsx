import type { Metadata } from 'next'
import Landing from './landing'

export const metadata: Metadata = {
  title: 'ASAS VIRTUAIS',
  description: 'Consultoria em agentes de código aplicado. Arquitetura que agentes de código não quebram.',
  openGraph: {
    title: 'ASAS VIRTUAIS',
    description: 'Arquitetura que agentes de código não quebram.',
    url: 'https://asasvirtuais.com',
  },
}

export default function Home() {
  return <Landing />
}
