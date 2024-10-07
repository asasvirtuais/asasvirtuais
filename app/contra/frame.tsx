'use client'

import { chakra } from '@chakra-ui/react'

export default function Frame() {
    return <chakra.iframe src='https://asasvirtuais.contra.com'
        w='100dvw'
        h='100dvh'
        frameBorder={0}
    />
}