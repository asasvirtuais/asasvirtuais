import React from 'react'
import DemoProviders from './providers'

export default function DemoLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DemoProviders>
            {children}
        </DemoProviders>
    )
}
