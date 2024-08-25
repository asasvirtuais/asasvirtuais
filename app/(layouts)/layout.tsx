import { Box } from '@chakra-ui/react'
import { zIndexEnum } from '@/app/theme/enums'
import Header from './header'

export default function TraditionalLayout({
  children,
  background,
}: Readonly<{
  children: React.ReactNode
  background: React.ReactNode
}>) {
  return (
    <>
      {background}
      <Box position='relative' zIndex={zIndexEnum.content}>
      <Header/>
      <main>
        {children}
      </main>
      <footer>
      </footer>
      </Box>
    </>
  )
}
