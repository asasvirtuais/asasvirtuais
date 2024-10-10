'use client'
import type { ElementType } from 'react'
import { forwardRef } from '@chakra-ui/react'
import { Link as ChakraNextLink, LinkProps } from '@chakra-ui/next-js'

const Link = forwardRef<LinkProps, ElementType>((props, ref) => (
    <ChakraNextLink ref={ref} {...props} />
))

export default Link
