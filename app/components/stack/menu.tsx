'use client'
import { As, forwardRef } from '@chakra-ui/react'
import { StackList, VList, HList, StackListProps } from '@/app/components/stack/list'
import useForwardAs from '@/app/hooks/useForwardAs'

export const StackMenu = forwardRef<StackListProps, typeof StackList>(({ children, as, ...props }, ref) => (
    <StackList ref={ref}
        // @ts-expect-error
        as={as ? useForwardAs(as, 'menu') : 'menu'}
        // List Defaults
        p={0} m={0} listStyleType='none'
        // Alignment
        justifyContent='space-between'
        {...props}>{children}</StackList>
))

export const HMenu = forwardRef<StackListProps, typeof HList>(({ children, ...props }, ref) => (
    <StackMenu ref={ref} as={HList} {...props}>{children}</StackMenu>
))

export const VMenu = forwardRef<StackListProps, typeof VList>(({ children, ...props }, ref) => (
    <StackMenu ref={ref} as={VList} {...props}>{children}</StackMenu>
))

// Menu Item, keep it here in this file
import { ListItem, Button, ButtonProps } from '@chakra-ui/react'

export interface MenuItemProps extends ButtonProps { }
export const MenuItem = forwardRef<MenuItemProps, As>(({ children, ...props }, ref) => (
    // ListItem is just boilerplate code, might want to replace it or apply role='button', not sure yet
    <ListItem>
        <Button ref={ref} size='sm' variant='ghost' {...props}>
            {children}
        </Button>
    </ListItem>
))
