/** Goal: combine List (which has context) with Stack (which is more geared towards CSS for Flex utility)
 * Issue: <StackList as='menu'/> the as prop overwrites the as={Stack}
 * Solution: The as prop has to be reapplied, so inside StackList as={<Stack as={as}}} />
 *  Issue: That prevents props from being passed to Stack
 *  Solution: use forwardRef as={forwardRef(({as, ...props}, ref) => <Stack ref={ref} as={as} {...props} /> )}
 *   Issue: This is clearly a case to apply recursion.
 *   Issue: as={forwardRef(...)} results in components being created dynamically, which might cause undesired rerenders
 * 
 */
import { useMemo } from 'react'
import { As, forwardRef, ChakraComponent } from '@chakra-ui/react'

export default function useForwardAs<C extends ChakraComponent<A>, A extends As>(Component: C, AsComponent?: A) {

    return useMemo(() => (
        forwardRef((props, ref) => {
            if (AsComponent)
                if (typeof AsComponent === 'string')
                    // @ts-expect-error
                    return <Component ref={ref} {...props} as={AsComponent} />
                else
                    // @ts-expect-error
                    return <AsComponent ref={ref} {...props} as={Component} />
            else
                // @ts-expect-error
                return <Component ref={ref} {...props} />
        })
    ), [AsComponent]) as C
}
