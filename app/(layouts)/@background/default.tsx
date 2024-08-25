'use client'
import { zIndexEnum } from '@/app/theme/enums'
import { Box } from '@chakra-ui/react'
export default function Background() {
    return (
        <Box
            position='fixed'
            pointerEvents='none'
            zIndex={zIndexEnum.background}
            backgroundImage={`url(/vectors/background.svg)`}
            w='100vw' h='100vh' top={0} bottom={0} left={0} right={0}
        />
    )
}