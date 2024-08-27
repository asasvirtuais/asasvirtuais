import Flicker from '.'

import '@egjs/flicking-plugins/dist/arrow.css'
import '@egjs/react-flicking/dist/flicking.css'

import { Box } from '@chakra-ui/react'
import Panel from './panel'

export default function () {
    return (
        <Box w='100%' p={8} bg='black'>
            <Flicker>
                <Panel />
                <Panel />
                <Panel />
                <Panel />
                <Panel />
                <Panel />
                <Panel />
                <Panel />
                <Panel />
                <Panel />
                <Panel />
                <Panel />
            </Flicker>
        </Box>
    )
}
