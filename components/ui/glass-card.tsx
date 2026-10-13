'use client'

import { Paper, BoxProps } from '@mantine/core'

export const GlassCard = ({ children, padding = 'xl', ...props }: { children: React.ReactNode, padding?: any } & BoxProps) => (
  <Paper
    {...props}
    p={padding}
    style={{
      background: 'var(--site-surface)',
      backdropFilter: 'blur(12px)',
      border: '1px solid var(--site-border)',
      borderRadius: 'var(--mantine-radius-lg)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      ...props.style
    }}
  >
    {children}
  </Paper>
)
