'use client'

import { Paper, BoxProps } from '@mantine/core'

export const GlassCard = ({ children, padding = 'xl', ...props }: { children: React.ReactNode, padding?: any } & BoxProps) => (
  <Paper
    {...props}
    p={padding}
    style={{
      background: 'var(--site-card)',
      border: '1px solid var(--site-border)',
      borderRadius: 'var(--mantine-radius-lg)',
      boxShadow: 'var(--site-card-shadow)',
      ...props.style
    }}
  >
    {children}
  </Paper>
)
