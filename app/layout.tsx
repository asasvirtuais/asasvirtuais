import React from 'react'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { ColorSchemeScript } from '@mantine/core'
import { Provider } from '@/components/ui/provider'
import { Analytics } from '@vercel/analytics/react'

import { Metadata } from 'next'

const title = 'Ícaro C. Capobianco | asasvirtuais.dev'
const description = 'Engenheiro de software, dono do framework open-source asasvirtuais e mantenedor do Guild RPG. Eu torno codebases sustentáveis por agentes.'

export const metadata: Metadata = {
  metadataBase: new URL('https://asasvirtuais.dev'),
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: '/software/guild-rpg.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/software/guild-rpg.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
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
