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
            onSelect={e => e.panel.focus(200)}
            preventClickOnDrag
            preventEventsBeforeInit
            resizeDebounce={550}
            useFractionalSize
        >
            {children}
        </Flicking>
    )
})
