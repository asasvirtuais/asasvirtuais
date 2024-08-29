import { forwardRef } from 'react'
import { LinkProps, Link, ComponentWithAs } from '@chakra-ui/react'
import { List, ListProps, ListItem } from '@chakra-ui/react'
import { VStack, HStack, StackProps } from '@chakra-ui/react'

export interface NavProps extends ListProps { }
export type NavComponent = ComponentWithAs<'nav', NavProps>

const Nav = forwardRef<NavComponent, NavProps>(({ children, ...props }, ref) => (
    <List ref={ref} as='nav'
        // Remove defaults
        listStyleType='none' p={0} m={0}
        {...props}>{children}</List>
))

export const VNav = forwardRef<NavComponent, NavProps & StackProps>(({ children, ...props }, ref) => (
    <Nav ref={ref} as={VStack}
        // Alignment
        justifyContent='space-between'
        {...props}>{children}</Nav>
))
export const HNav = forwardRef<NavComponent, NavProps & StackProps>(({ children, ...props }, ref) => (
    <Nav ref={ref}
        as={HStack}
        // Alignment
        justifyContent='space-between'
        {...props}>{children}</Nav>
))

export const NavItem = ({ children, ...props }: LinkProps) => (
    // ListItem is just boilerplate code, might want to replace it or apply role='link', not sure yet
    <ListItem>
        <Link size='sm' {...props}>
            {children}
        </Link>
    </ListItem>
)
