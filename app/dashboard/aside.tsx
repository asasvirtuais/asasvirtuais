'use client'
import { useMemo } from 'react'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import { Button, Center, GridItem, GridItemProps, Link } from '@chakra-ui/react'
import useHash from '@/app/hooks/useHash'

const Aside = ({ children, ...props }: GridItemProps) => {
    const { hash, removeHash } = useHash()
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
            position={{
                base: 'fixed',
                md: 'relative'
            }} top='0px' left='0px'
            {...props}>
            <Button
                as={Center}
                onClick={removeHash}
                variant='outline'
                rounded='none'
                hidden={!isMobileOpen} position='absolute' right='0px'
                borderLeft='1px' borderBottom='1px'>✖</Button>
            {children}
        </GridItem>
    )

}
export default Aside