import { StackMenuProps, HMenu, MenuItem } from '@/app/components/stack/menu'
import { StackNavProps, HNav, NavItem, StackNav } from '@/app/components/stack/nav'

export const AppNav = (props: Omit<StackNavProps, 'children'>) => (
    <HNav {...props}>
        <NavItem>Link A</NavItem>
        <NavItem>Link B</NavItem>
        <NavItem>Link C</NavItem>
    </HNav>
)
export const AppMenu = (props: Omit<StackMenuProps, 'children'>) => (
    <HMenu {...props}>
        <MenuItem>Menu A</MenuItem>
        <MenuItem>Menu B</MenuItem>
        <MenuItem>Menu C</MenuItem>
    </HMenu>
)
export const SideNav = (props: Omit<StackNavProps, 'children'>) => (
    <StackNav {...props}>
        <NavItem>Nav item 1</NavItem>
        <NavItem>Nav item 2</NavItem>
        <NavItem>Nav item 3</NavItem>
    </StackNav>
)
export const SideMenu = (props: Omit<StackMenuProps, 'children'>) => (
    <HMenu {...props}>
        <MenuItem>Action 1</MenuItem>
        <MenuItem>Action 2</MenuItem>
    </HMenu>
)
export const ActionMenu = (props: Omit<StackMenuProps, 'children'>) => (
    <HMenu {...props}>
        <MenuItem>Action 1</MenuItem>
        <MenuItem>Action 2</MenuItem>
        <MenuItem>Action 3</MenuItem>
    </HMenu>
)
