'use client'
import { useMemo } from 'react'
import { useHash } from 'react-use/esm/useHash'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import { Button, Center, GridItem, GridItemProps, Link } from '@chakra-ui/react'

const Aside = ({ children, ...props }: GridItemProps) => {
    const [hash] = useHash()
    const isMobile = useIsMobile()
    const isMobileOpen = useMemo(() => isMobile && hash === '#mobile-sidebar', [isMobile, hash])
    return (
        <GridItem as='aside'
            // Alignment
            display='flex' flexDir='column'
            // Spacing
            gap={6}
            // Misc
            overflow='hidden'
            width={{
                base: isMobileOpen ? '100dvw' : '0px',
                md: '300px'
            }}
            minH='100dvh'
            position={{
                base: 'fixed',
                md: 'relative'
            }} top='0px' left='0px'
            {...props}>
            <Link href='#' hidden={!isMobileOpen} position='absolute' right='0px'>
                <Button as={Center} variant='outline' rounded='none' borderLeft='1px' borderBottom='1px'>✖</Button>
            </Link>
            {children}
        </GridItem>
    )

}
export default Aside