'use client' // Temporary until I figure out forwardRef
import { As, forwardRef } from '@chakra-ui/react'
import { List, ListProps } from '@chakra-ui/react'

export interface MenuProps extends ListProps { }

const Menu = forwardRef<MenuProps, 'menu'>(({ children, ...props }, ref) => (
    <List as='menu' ref={ref}
        // Remove defaults
        listStyleType='none' p={0} m={0}
        {...props}>{children}</List>
))

// Exports HMenu with HStack and VMenu with VStack, sharing StackProps
import { StackProps } from '@chakra-ui/react'
// HMenu for clarity
import { HStack } from '@chakra-ui/react'
export const HMenu = forwardRef<MenuProps & StackProps, 'menu'>(({ children, ...props }) => (
    <Menu
        // Horizontal Menu
        as={HStack}
        // Alignment
        justifyContent='space-between'
        {...props}>{children}</Menu>
))
// VMenu for clarity
import { VStack } from '@chakra-ui/react'
export const VMenu = forwardRef<MenuProps & StackProps, 'menu'>(({ children, ...props }) => (
    <Menu
        // Vertical Menu
        as={VStack}
        // Default Alignment
        justifyContent='space-between'
        {...props}>{children}</Menu>
))

// Menu Item, keep it here in this file
import { ListItem, Button, ButtonProps } from '@chakra-ui/react'

export interface MenuItemProps extends ButtonProps { }
export const MenuItem = forwardRef<MenuItemProps, As>(({ children, ...props }) => (
    // ListItem is just boilerplate code, might want to replace it or apply role='button', not sure yet
    <ListItem>
        <Button size='sm' variant='ghost' {...props}>
            {children}
        </Button>
    </ListItem>
))
