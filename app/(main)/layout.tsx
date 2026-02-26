import React from 'react'
import AppProviders from './providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProviders>
      {children}
    </AppProviders>
  )
}
