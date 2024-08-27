'use client'
import { forwardRef } from 'react'
import { PropsWithChildren } from 'react'
import Flicking from '@egjs/react-flicking'

export default forwardRef<Flicking, PropsWithChildren>(({ children }, ref) => {
    return (
        <Flicking
            ref={ref}
            bound
            // circular
            align='prev'
            onSelect={
                e => e.panel.focus(0)
                // .then(() => e.panel.element.focus())
            }
            preventClickOnDrag
            preventEventsBeforeInit
            resizeDebounce={201}
        >
            {children}
        </Flicking>
    )
})
