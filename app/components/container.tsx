/** Usually used to contain the width of :
 * - Navbars
 * - Sections
 * - Footer
 * For websites with full width sections, it is not recommended to use this directly after the body, or to wrap main with it
 */
import { Container as ChakraContainer, ContainerProps } from '@chakra-ui/react'

export default function Container({children, ...props}: ContainerProps) {
    return (
        <ChakraContainer maxW='container.xl' {...props}>
            {children}
        </ChakraContainer>
    )
}