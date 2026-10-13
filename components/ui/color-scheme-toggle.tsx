'use client'

import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { useMounted } from '@mantine/hooks'
import { FaMoon, FaSun } from 'react-icons/fa'

export function ColorSchemeToggle({ lightLabel = 'Light mode', darkLabel = 'Dark mode' }: { lightLabel?: string, darkLabel?: string }) {
  const { setColorScheme } = useMantineColorScheme()
  const computed = useComputedColorScheme('dark', { getInitialValueInEffect: true })
  // The saved scheme is only known in the browser; render the server's default until mounted so hydration matches.
  const mounted = useMounted()
  const isDark = !mounted || computed === 'dark'
  const label = isDark ? lightLabel : darkLabel

  return (
    <Tooltip label={label}>
      <ActionIcon
        variant="subtle"
        color="gray"
        size="lg"
        onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
        aria-label={label}
      >
        {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
      </ActionIcon>
    </Tooltip>
  )
}
