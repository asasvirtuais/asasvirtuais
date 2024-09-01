import { useBreakpointValue } from '@chakra-ui/react'

export const useIsMobile = () => (
    useBreakpointValue({ base: true, md: false })
)