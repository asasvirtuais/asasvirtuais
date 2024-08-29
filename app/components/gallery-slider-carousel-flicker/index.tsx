'use client'
import '@egjs/flicking-plugins/dist/arrow.css'
import '@egjs/react-flicking/dist/flicking.css'
import Flicking from '@egjs/react-flicking'
import Panel from './panel'
import { useState } from 'react'

export type GalleryItem = {
    title?: string
    image?: string
    text?: string
}

type Props = {
    items?: GalleryItem[]
}

export default function GallerySliderCarouselFlicker({ items = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] }: Props) {
    const [open, setOpen] = useState<number>()
    return (
        <Flicking
            bound
            align='prev'
            onSelect={e => {
                setOpen(e.panel.index)
                e.panel.focus(600).then(() => e.currentTarget.resize())
            }}
            preventClickOnDrag
            preventEventsBeforeInit
            moveType='strict'
        >
            {items.map((item, i) => (
                <Panel key={i} open={i === open} {...item} />
            ))}
        </Flicking>
    )
}
