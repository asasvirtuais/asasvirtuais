import React from 'react'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { ColorSchemeScript } from '@mantine/core'
import { Provider } from '@/components/ui/provider'
import { Auth0Provider } from '@auth0/nextjs-auth0/client'
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
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
