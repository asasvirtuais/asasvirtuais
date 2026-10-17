'use client'

import { Box, Image } from '@mantine/core'

// The ">_" between the wings is dark ink on light backgrounds and light ink on dark ones, so each scheme gets its own file.
export function Logo({ h = 36, mark = false }: { h?: number, mark?: boolean }) {
  const file = mark ? 'mark' : 'logo'
  return (
    <Box style={{ display: 'inline-flex' }}>
      <Image src={`/brand/${file}-light.png`} alt="Asas Virtuais" h={h} w="auto" darkHidden />
      <Image src={`/brand/${file}-dark.png`} alt="Asas Virtuais" h={h} w="auto" lightHidden />
    </Box>
  )
}
