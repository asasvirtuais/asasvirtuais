'use client'
import { PropsOf, forwardRef, MergeWithAs, ListItemProps } from '@chakra-ui/react'
import { StackList, VList, HList, StackListProps } from '@/app/components/stack/list'
import useForwardAs from '@/app/hooks/useForwardAs'

export const StackNav = forwardRef<StackListProps, typeof StackList>(({ children, as, ...props }, ref) => (
    <StackList ref={ref}
        // @ts-expect-error
        as={as ? useForwardAs(as, 'nav') : 'nav'}
        // List Defaults
        p={0} m={0} listStyleType='none'
        // Alignment
        justifyContent='space-between'
        {...props}>{children}</StackList>
))

export type StackNavProps = PropsOf<typeof StackNav>

export const HNav = forwardRef<StackListProps, typeof HList>(({ children, ...props }, ref) => (
    <StackNav ref={ref} as={HList} {...props}>{children}</StackNav>
))

export const VNav = forwardRef<StackListProps, typeof VList>(({ children, ...props }, ref) => (
    <StackNav ref={ref} as={VList} {...props}>{children}</StackNav>
))

import { Link, ListItem } from '@chakra-ui/react'

export const NavItem = forwardRef<ListItemProps, typeof Link>(({ children, as, ...props }, ref) => (
    <ListItem ref={ref} size='sm' as={useForwardAs(Link, as)} {...props}>
        {children}
    </ListItem>
))
