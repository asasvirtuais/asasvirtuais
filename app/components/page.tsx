import { GridItem, Text, ListItem, SimpleGrid } from '@chakra-ui/react'
import { MenuItem, StackMenu, HMenu, VMenu } from './stack/menu'
import { StackList, HList, VList } from './stack/list'
import { HNav, NavItem, StackNav, VNav } from './stack/nav'

export default function () {
    return (
        <SimpleGrid w='full' columns={3} minH='100dvh' gap={8} my={12}>
            <GridItem p={8} bg='#F4F4F4'>
                <Text>Stack Menu</Text>
                <StackMenu fontSize='xx-large' outline='1px dashed lightblue'>
                    <MenuItem>Stack Menu Item 1</MenuItem>
                    <MenuItem>Stack Menu Item 2</MenuItem>
                    <MenuItem>Stack Menu Item 3</MenuItem>
                    <MenuItem>Stack Menu Item 4</MenuItem>
                </StackMenu>
            </GridItem>
            <GridItem p={8} bg='#F4F4F4'>
                <Text>Stack List</Text>
                <StackList outline='1px dashed lightblue'>
                    <ListItem>Stack List Item 1</ListItem>
                    <ListItem>Stack List Item 2</ListItem>
                    <ListItem>Stack List Item 3</ListItem>
                    <ListItem>Stack List Item 4</ListItem>
                </StackList>
            </GridItem>
            <GridItem p={8} bg='#F4F4F4'>
                <Text>Stack Nav</Text>
                <StackNav outline='1px dashed lightblue'>
                    <NavItem>Stack Nav Item 1</NavItem>
                    <NavItem>Stack Nav Item 2</NavItem>
                    <NavItem>Stack Nav Item 3</NavItem>
                    <NavItem>Stack Nav Item 4</NavItem>
                </StackNav>
            </GridItem>
            <GridItem p={8} bg='#F4F4F4'>
                <Text>Vertical Stack Menu</Text>
                <VMenu outline='1px dashed lightblue'>
                    <MenuItem>Menu Item 1</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                    <MenuItem>Menu Item 3</MenuItem>
                    <MenuItem>Menu Item 4</MenuItem>
                </VMenu>
            </GridItem>
            <GridItem p={8} bg='#F4F4F4'>
                <Text>Vertical Stack List</Text>
                <VList outline='1px dashed lightblue'>
                    <ListItem>List Item 1</ListItem>
                    <ListItem>List Item 2</ListItem>
                    <ListItem>List Item 3</ListItem>
                    <ListItem>List Item 4</ListItem>
                </VList>
            </GridItem>
            <GridItem p={8} bg='#F4F4F4'>
                <Text>Vertical Stack Nav</Text>
                <VNav outline='1px dashed lightblue'>
                    <NavItem>Vertical Stack Nav Item 1</NavItem>
                    <NavItem>Vertical Stack Nav Item 2</NavItem>
                    <NavItem>Vertical Stack Nav Item 3</NavItem>
                    <NavItem>Vertical Stack Nav Item 4</NavItem>
                </VNav>
            </GridItem>
            <GridItem colSpan={3} p={8} bg='#F4F4F4'>
                <Text>Horizontal Stack Menu</Text>
                <HMenu outline='1px dashed lightblue'>
                    <MenuItem> Horizontal Stack Menu Item 1</MenuItem>
                    <MenuItem> Horizontal Stack Menu Item 2</MenuItem>
                </HMenu>
            </GridItem>
            <GridItem colSpan={3} p={8} bg='#F4F4F4'>
                <Text>Horizontal Stack List</Text>
                <HList outline='1px dashed lightblue'>
                    <ListItem> Horizontal Stack List Item 1</ListItem>
                    <ListItem> Horizontal Stack List Item 2</ListItem>
                </HList>
            </GridItem>
            <GridItem colSpan={3} p={8} bg='#F4F4F4'>
                <Text>Horizontal Stack Nav</Text>
                <HNav outline='1px dashed lightblue'>
                    <NavItem>Horizontal Stack Nav Item 1</NavItem>
                    <NavItem>Horizontal Stack Nav Item 2</NavItem>
                </HNav>
            </GridItem>
        </SimpleGrid>
    )
}