'use client'
import { Avatar, Box, Card, CardBody, CardHeader, HStack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Chat } from '.'

const MensageItem = ({ from, to }: Chat) => {

    const isMine = useMemo(() => from === 'me', [])

    return (
        <Card
            my={4}
            p={2}
            bg='white'
            >
            <HStack justifyContent={isMine ? 'flex-end' : 'flex-start'} alignItems='flex-start'>
                <VStack order={isMine ? 2 : 1}>
                    <CardHeader p={1} fontSize='xs' fontWeight='bold'>
                        {from}
                    </CardHeader>
                    <Avatar />
                </VStack>
                <VStack order={isMine ? 1 : 2}>
                    <CardBody fontSize='sm' p={2} >
                        {parts.map( (p, i) => (
                            <Text key={i}>{p}</Text>
                        ) )}
                    </CardBody>
                </VStack>
            </HStack>
        </Card>
    )
}

const useConversa = () => {
    const [mensagens, setMensagens] = useState([
        { id: '01', from: 'me', to: 'you', parts: ['Oi'] as string[] },
        { id: '02', from: 'you', to: 'me', parts: ['Olá']  as string[]},
        { id: '03', from: 'me', to: 'you', parts: ['Tudo bem?'] as string[] },
        { id: '04', from: 'you', to: 'me', parts: ['Tudo, e você?'] as string[] },
        { id: '05', from: 'me', to: 'you', parts: ['Bem também'] as string[] },
        { id: '04', from: 'you', to: 'me', parts: ['Com quantos pontos e virgulas se troca uma lampada?'] as string[] },
        { id: '05', from: 'me', to: 'you', parts: ['Nem um ponto e virgula troca uma lampada, mas não há pontos e nem virgulas o bastante para trocar uma lampada. Pois o ponto e virgula é inútil, mas o ponto e a virgula não são inúteis.'] as string[] },
    ] as const)
    return {
        mensagens,
        setMensagens
    }
}

export default function Conversa() {
    const { mensagens } = useConversa()

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current)
            ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [mensagens])

    return (
        <Box
            maxH='600px'
            overflowY='auto'
            sx={{'& *': { 'overflow-anchor': 'none' }}}
        >
            {mensagens.map(m => (
                <MensageItem key={m.id} {...m} />
            ))}
            <Box ref={ref} sx={{ 'overflow-anchor': 'auto' }} />
        </Box>
    )
}
