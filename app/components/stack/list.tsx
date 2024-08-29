'use client'
import { HStack, PropsOf, VStack, forwardRef } from '@chakra-ui/react'
import { List, ListProps } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import useForwardAs from '@/app/hooks/useForwardAs'

export const StackList = forwardRef<ListProps, typeof Stack>(({ as, ...props }, ref) => (
    <List ref={ref} as={useForwardAs(Stack, as)} styleType='upper-roman' stylePosition='inside'
        {...props} />
))

export type StackListProps = PropsOf<typeof StackList>

export const HList = forwardRef<ListProps, typeof HStack>(({ as, ...props }, ref) => (
    <StackList ref={ref} as={useForwardAs(HStack, as)} {...props} />
))

export const VList = forwardRef<ListProps, typeof HStack>(({ as, ...props }, ref) => (
    <StackList ref={ref} as={useForwardAs(VStack, as)} {...props} />
))
