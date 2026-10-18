import React from 'react'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './theme.css'
import { ColorSchemeScript } from '@mantine/core'
import { Provider } from '@/components/ui/provider'
import { Analytics } from '@vercel/analytics/react'

import { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'

// Montserrat matches the logo wordmark; Inter carries the body text.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-montserrat', display: 'swap' })

const title = 'Asas Virtuais | Software para startups e pequenos negócios'
const description = 'Assessoria técnica e apoio no desenvolvimento para startups. Sistemas sob medida para pequenos negócios, pensados para cada caso e por um preço justo.'

export const metadata: Metadata = {
  metadataBase: new URL('https://asasvirtuais.dev'),
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: '/og/asas-virtuais.png', width: 1200, height: 630, alt: 'Asas Virtuais' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og/asas-virtuais.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
          <Provider>
            {children}
          </Provider>
        <Analytics />
      </body>
    </html>
  )
}
