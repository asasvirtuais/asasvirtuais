import React from 'react'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { ColorSchemeScript } from '@mantine/core'
import { Provider } from '@/components/ui/provider'
import { Auth0Provider } from '@auth0/nextjs-auth0/client'
import { Analytics } from '@vercel/analytics/react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'asasvirtuais.dev | Ícaro C. Capobianco - Desenvolvedor Web',
  description: 'Desenvolvedor web focado em entrega rápida e autonomia do cliente. Software robusto sem aprisionamento tecnológico (vendor lock-in).',
  openGraph: {
    title: 'asasvirtuais.dev | Ícaro C. Capobianco - Desenvolvedor Web',
    description: 'Desenvolvedor web focado em entrega rápida e autonomia do cliente. Software robusto sem aprisionamento tecnológico (vendor lock-in).',
    images: [{ url: '/looking-dev.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'asasvirtuais.dev | Ícaro C. Capobianco - Desenvolvedor Web',
    description: 'Desenvolvedor web focado em entrega rápida e autonomia do cliente. Software robusto sem aprisionamento tecnológico (vendor lock-in).',
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
        <Auth0Provider>
          <Provider>
            {children}
          </Provider>
        </Auth0Provider>
        <Analytics />
      </body>
    </html>
  )
}
