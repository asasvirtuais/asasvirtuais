import type { ElementType } from 'react'
import { useMemo } from 'react'
import { forwardRef, ChakraComponent } from '@chakra-ui/react'

/**
 * The `useForwardAs` hook is designed to allow the combination of multiple "as" props.
 * It takes two arguments: `Component` and `AsComponent`.
 * It returns a memoized forwardRef component that conditionally renders either `Component` or `AsComponent`.
 */
export default function useForwardAs<C extends ChakraComponent<A>, A extends ElementType>(Component: C, AsComponent?: A) {

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
