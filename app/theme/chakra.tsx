'use client'
import { ChakraProvider } from '@chakra-ui/provider'
import { extendTheme } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { title, body } from './fonts'

const theme = extendTheme({
    fonts: {
        body: body.style.fontFamily,
        heading: title.style.fontFamily
    },
    colors: {
        candy: {
            yummy: '#4A3FA3',
            tasty: '#7B6F6F',
            smelly: '#8E8282',
            slicky: '#8F8D8E',
            slipery: '#A5A5A5'
        }
    }
})

export default function({ children }: PropsWithChildren) {
    return (
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
    )
}
