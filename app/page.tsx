import type { Metadata } from 'next'
import Landing from './landing'

const title = 'ASAS VIRTUAIS'
const description = "Applied coding agents consulting. Architecture your coding agents can't break."
const image = { url: 'https://asasvirtuais.com/og/asasvirtuais-com.png', width: 1200, height: 630, alt: 'Asas Virtuais' }

export const metadata: Metadata = {
  metadataBase: new URL('https://asasvirtuais.com'),
  title,
  description,
  alternates: { canonical: 'https://asasvirtuais.com' },
  openGraph: { title, description, url: 'https://asasvirtuais.com', siteName: 'Asas Virtuais', type: 'website', images: [image] },
  twitter: { card: 'summary_large_image', title, description, images: [image.url] },
}

export default function Home() {
  return <Landing />
}
