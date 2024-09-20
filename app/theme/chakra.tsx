import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

/** Just some colors I like */
export const candy = {
    yummy: '#4A3FA3',
    tasty: '#7B6F6F',
    smelly: '#8E8282',
    slicky: '#8F8D8E',
    slipery: '#A5A5A5'
}

export default function ({ children }: PropsWithChildren) {
    return (
        <ChakraProvider value={defaultSystem}>
            {children}
        </ChakraProvider>
    )
}
