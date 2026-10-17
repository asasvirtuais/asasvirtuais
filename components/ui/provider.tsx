'use client';

import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import React from 'react'

const theme = createTheme({
  primaryColor: 'brand',
  primaryShade: { light: 7, dark: 5 },
  autoContrast: true,
  colors: {
    // The logo's orange wing; brand[5] is the logo color
    brand: ['#fff1e6', '#ffdcc4', '#ffbb8f', '#ff9655', '#fb7a2c', '#f1620f', '#d9540c', '#b4440a', '#8f3709', '#6e2a07'],
    // The logo's navy background (dark[7]); dark[2] is the dimmed text color in dark mode
    dark: ['#eef0f4', '#c9ccd4', '#a6aab5', '#7d8292', '#565c6c', '#3a404f', '#2a303d', '#1b202c', '#151a24', '#0f131b'],
    // Cool neutral over white; gray[6] is the dimmed text color in light mode
    gray: ['#f8f9fb', '#f1f3f6', '#e6e8ed', '#d5d9e0', '#b9bec9', '#9aa0ad', '#5e6473', '#4b5160', '#363b47', '#1b202c'],
  },
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'var(--font-montserrat), Montserrat, system-ui, sans-serif',
    fontWeight: '700',
  },
})

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
      {children}
    </MantineProvider>
  )
}
