'use client'
import { Box, Card, CardBody, CardHeader, HStack, Stack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'

type Mensagem = {
    id: string
    text: string
    from: string
    to: string
}

const Mensagem = ({ from, to, text }: Mensagem) => {

    const isMine = useMemo(() => from === 'me', [])

    return (
        <Card
            my={4}
            ml={isMine ? 4 : 'auto'}
            mr={isMine ? 'auto' : 4}
            minW='200px'
            bg='white'
            >
            <CardHeader p={1} fontSize='xs' fontWeight='bold'>
                {from}
            </CardHeader>
            <CardBody fontSize='sm' p={2} >
                {text}
            </CardBody>
        </Card>
    )
}

const useConversa = () => {
    const [mensagens, setMensagens] = useState([
        { id: '01', from: 'me', to: 'you', text: 'Oi' },
        { id: '02', from: 'you', to: 'me', text: 'Olá' },
        { id: '03', from: 'me', to: 'you', text: 'Tudo bem?' },
        { id: '04', from: 'you', to: 'me', text: 'Tudo, e você?' },
        { id: '05', from: 'me', to: 'you', text: 'Bem também' },
        { id: '04', from: 'you', to: 'me', text: 'Com quantos pontos e virgulas se troca uma lampada?' },
        { id: '05', from: 'me', to: 'you', text: 'Nem um ponto e virgula troca uma lampada, mas não há pontos e nem virgulas o bastante para trocar uma lampada. Pois o ponto e virgula é inútil, mas o ponto e a virgula não são inúteis.' },
    ])
    return {
        mensagens,
        setMensagens
    }
}

export default function Conversa() {
    const { mensagens } = useConversa()

    return (
        <Box px={[1, 2, 4, 6]}>
            {mensagens.map(m => (
                <Mensagem key={m.id} {...m} />
            ))}
        </Box>
    )
}
