'use client';

import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import React from 'react'

const theme = createTheme({
  primaryColor: 'sun',
  primaryShade: { light: 7, dark: 3 },
  autoContrast: true,
  colors: {
    // Amber to burnt orange: the sun Ícaro flew toward
    sun: ['#fff4e2', '#ffe7c2', '#ffcf85', '#ffb547', '#ffa01f', '#f28c0f', '#d97706', '#b45309', '#92400e', '#78350f'],
    // Navy night sky; dark[2] is the dimmed text color in dark mode
    dark: ['#f3ede2', '#c3c9d6', '#9aa3b5', '#6e7890', '#4b546b', '#323b52', '#222a3e', '#161d2f', '#0f1626', '#0a0f1b'],
    // Warm stone; gray[6] is the dimmed text color in light mode
    gray: ['#faf8f4', '#f3efe8', '#e8e2d8', '#dad2c5', '#c2b8a8', '#a3988a', '#6b6458', '#5a5348', '#433d35', '#2c2823'],
  },
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Outfit, sans-serif',
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
