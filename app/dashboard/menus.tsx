import { StackMenuProps, HMenu, MenuItem } from '@/app/components/stack/menu'
import { StackNavProps, HNav, NavItem, StackNav } from '@/app/components/stack/nav'
import { Heading } from '@chakra-ui/react'

export const AppNav = (props: Omit<StackNavProps, 'children'>) => (
    <HNav {...props}>
        <NavItem href='/'>
            <Heading>Asas Virtuais</Heading>
        </NavItem>
    </HNav>
)
export const AppMenu = (props: Omit<StackMenuProps, 'children'>) => (
    <HMenu {...props}>
        <MenuItem variant='solid' colorScheme='gray' >Logout</MenuItem>
    </HMenu>
)
export const SideNav = (props: Omit<StackNavProps, 'children'>) => (
    <StackNav {...props}>
        <NavItem href='/dashboard/credentials'>Access Credentials</NavItem>
    </StackNav>
)
export const SideMenu = (props: Omit<StackMenuProps, 'children'>) => (
    <HMenu {...props}>
        <MenuItem></MenuItem>
        <MenuItem></MenuItem>
    </HMenu>
)
export const ActionMenu = (props: Omit<StackMenuProps, 'children'>) => (
    <HMenu {...props}>
        <MenuItem></MenuItem>
        <MenuItem></MenuItem>
        <MenuItem></MenuItem>
    </HMenu>
)
