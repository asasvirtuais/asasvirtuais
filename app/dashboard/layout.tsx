import { Grid, GridItem, GridItemProps } from '@chakra-ui/react'
import { ContainerProps } from '@chakra-ui/react'

const Header = (props: GridItemProps) => (
    <GridItem as='header'
        // Spacing
        py={2}
        {...props} />
)

import { Container } from './container'

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
        {...props}>
        {children}
    </GridItem>
)

import { ReactNode } from 'react'
import { Divider } from '@chakra-ui/react'
import Aside from './aside'
import { AppNav, AppMenu, SideNav, SideMenu } from './menus'
import { userOrLogin } from '@/app/auth/actions'
import { layout } from '@/next'
import { DashboardProvider } from './context'

export default layout<{
    children: ReactNode,
    footer: ReactNode,
}>( async function DashboardLayout({
    children,
    footer
}) {

    await userOrLogin('/dashboard')

    return (
        <Grid
            gridTemplateColumns='auto 1fr'
            gridTemplateRows='auto 1fr auto'
            minH='100dvh' bg='#F4F4F4'
            maxW='dvw'
        >
            <DashboardProvider>

                <Header colSpan={2} bg='#C4C4C4'>
                    <Navbar>
                        <AppNav />
                        <AppMenu />
                    </Navbar>
                </Header>

                <Main colStart={2} colEnd={3} bg='#F4F4F4'
                    justifyContent='flex-start' alignItems='stretch'
                    maxW='100%' overflow='hidden' py={4} px={6} display='flex' flexDir='column' gap={2}>
                    {children}
                </Main>

                <Aside colStart={1} colEnd={2} rowStart={2} rowSpan={2} bg='#E4E4E4'>
                    <SideNav py={6} px={6} spacing={4} />
                    <Divider borderColor='gray.500' />
                    <SideMenu py={6} px={6} />
                </Aside>

                <Footer colStart={2} bg='#C4C4C4'
                        py={2} px={6}>
                    {footer}
                </Footer>

            </DashboardProvider>
        </Grid>
    )
} )