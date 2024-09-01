import { Grid, GridItem, GridItemProps, VStack } from '@chakra-ui/react'

import { Divider } from '@chakra-ui/react'
import { Container } from './container'

import { ContainerProps } from '@chakra-ui/react'
import { AppNav, AppMenu, SideNav, SideMenu, ActionMenu } from './menus'
import { PropsWithChildren } from 'react'
import Aside from './aside'

const Header = (props: GridItemProps) => (
    <GridItem as='header'
        // Spacing
        py={2}
        {...props} />
)
const Navbar = (props: ContainerProps) => (
    <Container
        // Alignment
        display='flex' maxW='full' justifyContent='space-between'
        {...props} />
)
const Main = (props: GridItemProps) => (
    <GridItem as='main' {...props} />
)
const Footer = ({ children, ...props }: GridItemProps) => (
    <GridItem as='footer'
        // Spacing
        py={2} px={4}
        {...props}>
        {children}
    </GridItem>
)
export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <Grid
            gridTemplateColumns='auto 1fr'
            gridTemplateRows='auto 1fr auto'
            minH='100dvh' bg='#F4F4F4'>

            <Header colSpan={2} bg='#C4C4C4'>
                <Navbar>
                    <AppNav />
                    <AppMenu />
                </Navbar>
            </Header>

            <Main colStart={2} colEnd={3} bg='#F4F4F4'>
                {children}
            </Main>

            <Aside colStart={1} colEnd={2} rowStart={2} rowSpan={2} bg='#E4E4E4'>
                <SideNav py={6} px={6} spacing={4} />
                <Divider borderColor='gray.500' />
                <SideMenu py={6} px={6} />
            </Aside>

            <Footer colStart={2} bg='#C4C4C4'>
                <ActionMenu />
            </Footer>
        </Grid>
    )
}


