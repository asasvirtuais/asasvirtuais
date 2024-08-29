import { Container as ChakraContainer, ContainerProps } from '@chakra-ui/react'

export const Container = ({ children, ...props }: ContainerProps) => (
    <ChakraContainer maxW='full' {...props}>
        {children}
    </ChakraContainer>
)
export default Container
