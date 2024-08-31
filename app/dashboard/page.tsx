import { Text, Container, Heading, Stack, HStack, Badge, VStack } from '@chakra-ui/react'

const DashboardSection = () => {
    return (
        <Stack as='section' pl={4} mt={6}>
        </Stack>
    )
}

export default function DashboardPage() {
    return (
        <Container maxW='container.lg' py={8}>
            <Stack alignItems='flex-start' maxW='container.md'>
                <Text fontSize='3xl'>Olá Dakini</Text>
                <Badge>{new Date().toLocaleDateString(undefined, {
                    dateStyle: 'full'
                })}</Badge>
            </Stack>
            <DashboardSection>
            </DashboardSection>
        </Container>
    )
}
