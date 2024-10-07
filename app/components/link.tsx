'use client'
import { As, forwardRef } from '@chakra-ui/react'
import { Link as ChakraNextLink, LinkProps } from '@chakra-ui/next-js'

const Link = forwardRef<LinkProps, As>((props, ref) => (
    <ChakraNextLink ref={ref} {...props} />
))

export default Link
