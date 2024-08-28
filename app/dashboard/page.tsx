import { Box, Container as ChakraContainer, Center, GridItem, GridItemProps, HStack, Grid, VStack, ContainerProps, Button, List, ListProps, ListItem, ButtonProps, LinkProps, Link } from '@chakra-ui/react'

const Container = ({ children, ...props }: ContainerProps) => (
    <ChakraContainer maxW='full' {...props}>
        {children}
    </ChakraContainer>
)

type NavProps = ListProps

const Nav = ({ children, ...props }: NavProps) => (
    <List as='nav'
        // Remove defaults
        listStyleType='none' p={0} m={0}
        {...props}>{children}</List>
)

const VNav = ({ children, ...props }: NavProps) => {
    return (
        <Nav
            // Vertical Menu
            flexDir='column'
            // Alignment
            justifyContent='space-between'
            {...props}>{children}</Nav>
    )
}

const HNav = ({ children, ...props }: NavProps) => {
    return (
        <Nav
            // Horizontal Menu
            display='flex' flexDir='row'
            // Alignment
            justifyContent='space-between'
            {...props}>{children}</Nav>
    )
}

const NavItem = ({ children, ...props }: LinkProps) => (
    // ListItem is just boilerplate code, might want to replace it or apply role='link', not sure yet
    <ListItem>
        <Link size='sm' {...props}>
            {children}
        </Link>
    </ListItem>
)

type MenuProps = ListProps

const Menu = ({ children, ...props }: MenuProps) => (
    <List as='menu'
        // Remove defaults
        listStyleType='none' p={0} m={0}
        {...props}>{children}</List>
)

const VMenu = ({ children, ...props }: MenuProps) => {
    return (
        <Menu
            // Vertical Menu
            flexDir='column'
            // Alignment
            justifyContent='space-between'
            {...props}>{children}</Menu>
    )
}

const HMenu = ({ children, ...props }: MenuProps) => {
    return (
        <Menu
            // Horizontal Menu
            display='flex' flexDir='row'
            // Alignment
            justifyContent='space-between'
            {...props}>{children}</Menu>
    )
}

const MenuItem = ({ children, ...props }: ButtonProps) => (
    // ListItem is just boilerplate code, might want to replace it or apply role='button', not sure yet
    <ListItem>
        <Button size='sm' variant='ghost' {...props}>
            {children}
        </Button>
    </ListItem>
)
const Header = (props: Omit<GridItemProps, 'children'>) => (
    <GridItem as='header' {...props}>
        <Container>
            <HStack w='100%' justifyContent='space-between'>
                <HNav>
                    <NavItem>Link A</NavItem>
                    <NavItem>Link B</NavItem>
                    <NavItem>Link C</NavItem>
                </HNav>
                <HMenu>
                    <MenuItem>Menu A</MenuItem>
                    <MenuItem>Menu B</MenuItem>
                    <MenuItem>Menu C</MenuItem>
                </HMenu>
            </HStack>
        </Container>
    </GridItem>
)

const Main = (props: Omit<GridItemProps, 'children'>) => (
    <GridItem as='main' {...props}>
        <Center>
            <VStack>
                <h1>Main Content Title 1</h1>
                <h2>Main Content Title 2</h2>
                <h3>Main Content Title 3</h3>
                <h4>Main Content Title 3</h4>
                <h5>Main Content Title 3</h5>
                <h6>Main Content Title 3</h6>
            </VStack>
        </Center>
    </GridItem>
)

const Aside = ({ children, ...props }: GridItemProps) => (
    <GridItem as='aside' display='flex' flexDir='column' {...props}>
        {children}
    </GridItem>
)

const SideNav = (props: NavProps) => (
    <VNav {...props}>
        <NavItem>Nav item 1</NavItem>
        <NavItem>Nav item 2</NavItem>
        <NavItem>Nav item 3</NavItem>
    </VNav>
)

const SideMenu = () => (
    <HMenu>
        <MenuItem>Action 1</MenuItem>
        <MenuItem>Action 2</MenuItem>
        <MenuItem>Action 3</MenuItem>
    </HMenu>
)

const Footer = (props: Omit<GridItemProps, 'children'>) => (
    <GridItem as='footer' {...props}>
        <HMenu>
            <MenuItem>Action 1</MenuItem>
            <MenuItem>Action 2</MenuItem>
            <MenuItem>Action 3</MenuItem>
            <MenuItem>Action 4</MenuItem>
            <MenuItem>Action 5</MenuItem>
            <MenuItem>Action 6</MenuItem>
            <MenuItem>Action 7</MenuItem>
            <MenuItem>Action 8</MenuItem>
            <MenuItem>Action 9</MenuItem>
            <MenuItem>Action 10</MenuItem>
        </HMenu>
    </GridItem>
)

export default function DashboardPage() {
    return (
        <Grid gridTemplateColumns='auto 1fr' bg='#F4F4F4' minH='100vh' gridTemplateRows='auto 1fr auto'>
            <Header colSpan={2} bg='white' py={2} />
            <Aside minW='300px' rowSpan={2} bg='#D4D4D4' py={6} px={4} gap={4}>
                <SideNav spacing={4} />
                <SideMenu />
            </Aside>
            <Main />
            <Footer colStart={2} py={2} px={4} bg='#C4C4C4' />
        </Grid>
    )
}
