'use client'
import '@egjs/flicking-plugins/dist/arrow.css'
import '@egjs/react-flicking/dist/flicking.css'
import Flicking, { SelectEvent } from '@egjs/react-flicking'
import Panel from './panel'
import { useCallback, useState } from 'react'
import { Box, useBoolean } from '@chakra-ui/react'
import mock from './mock.json'

export type GalleryItem = {
    title?: string
    image?: string
    text?: string
}

type Props = {
    items?: GalleryItem[]
}

export default function GallerySliderCarouselFlicker({ items = mock }: Props) {
    const [open, setOpen] = useState<number>()
    const [isLoading, { on: wait, off: goon }] = useBoolean()
    const onSelect = useCallback(async (e: SelectEvent) => {
        // 
        wait()

        e.currentTarget.panels.forEach(p => p.setSize({ width: 300 }))
        e.panel.setSize({ width: 500 })
        setOpen(e.panel.index)

        const timeout = setTimeout(async () => {
            await e.currentTarget.resize()
            await e.panel.focus(500)
            await e.currentTarget.resize()
            goon()
        }, 550)
        return () => {
            clearTimeout(timeout)
            goon()
        }
    }, [isLoading])
    return (
        <Box sx={{
            '.flicking-camera': {
                px: 1, gap: 2, my: 12
            }
        }}
            cursor={isLoading ? 'wait' : 'unset'}
        >
            <Flicking
                bound
                circular
                align='prev'
                onMoveStart={wait}
                onMoveEnd={goon}
                onSelect={onSelect}
                moveType='strict'
                preventClickOnDrag
                preventDefaultOnDrag
                preventEventsBeforeInit
            >
                {items.map((item, i) => (
                    <Panel key={i}
                        open={i === open}
                        style={{ width: '300px' }}
                        cursor={isLoading ? 'wait' : 'pointer'}
                        {...item} />
                ))}
            </Flicking>
        </Box>
    )
}
