import React from 'react'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './theme.css'
import { ColorSchemeScript } from '@mantine/core'
import { Provider } from '@/components/ui/provider'
import { Analytics } from '@vercel/analytics/react'

import { Metadata } from 'next'

const title = 'Asas Virtuais | Sistemas sob medida em uma semana'
const description = 'Software sob medida para pequenos negócios, por menos de R$ 2.000, pronto em uma semana. Conectado às ferramentas que você já usa, e o código é seu na entrega.'

export const metadata: Metadata = {
  metadataBase: new URL('https://asasvirtuais.dev'),
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
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
