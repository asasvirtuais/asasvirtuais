import React from 'react'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { ColorSchemeScript } from '@mantine/core'
import { Provider } from '@/components/ui/provider'
import { Analytics } from '@vercel/analytics/react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'asasvirtuais.dev | Ícaro C. Capobianco - Desenvolvedor Web',
  description: 'Desenvolvedor web que se importa com o seu negócio. Construindo software de forma honesta, transparente e sem amarras tecnológicas.',
  openGraph: {
    title: 'asasvirtuais.dev | Ícaro C. Capobianco - Desenvolvedor Web',
    description: 'Desenvolvedor web que se importa com o seu negócio. Construindo software de forma honesta, transparente e sem amarras tecnológicas.',
    images: [{ url: '/looking-dev.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'asasvirtuais.dev | Ícaro C. Capobianco - Desenvolvedor Web',
    description: 'Desenvolvedor web que se importa com o seu negócio. Construindo software de forma honesta, transparente e sem amarras tecnológicas.',
    images: ['/looking-dev.png'],
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
