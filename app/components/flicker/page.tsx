import Flicker from '.'
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
