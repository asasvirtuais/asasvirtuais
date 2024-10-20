'use client'

import { Paragraph } from '.'
import { useParagraphs } from './contex'

export const ParagraphComponent = ( p: Paragraph ) => (
    <>
    </>
)

export const ParagraphsComponent = () => {

    const { paragraphs } = useParagraphs()

    return (
        <></>
    )
}
