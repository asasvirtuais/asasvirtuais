import { StackMenuProps, HMenu, MenuItem } from '@/app/components/stack/menu'
import { StackNavProps, HNav, NavItem, StackNav } from '@/app/components/stack/nav'
import { Button, Heading } from '@chakra-ui/react'

export const AppNav = (props: Omit<StackNavProps, 'children'>) => (
    <HNav {...props}>
        <NavItem href='/' hideBelow='md' >
            <Heading>Asas Virtuais</Heading>
        </NavItem>
        <NavItem href='#mobile-sidebar' hideFrom='md'
            _hover={{ textDecoration: 'none' }}>
            <Button variant='ghost' fontSize='xl' size='sm'>☰</Button>
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
