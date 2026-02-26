import React from 'react'
import { Provider } from '@/components/ui/provider'
import { Auth0Provider } from '@auth0/nextjs-auth0/client'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Auth0Provider>
          <Provider>
            {children}
          </Provider>
        </Auth0Provider>
      </body>
    </html>
  )
}
