'use client'
import { useState } from 'react'
import { Button, Modal, Textarea, Stack, Group, Text, Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSparkles } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { generateCharacter, generateVenue, generateChat } from './action'
import { CreateCharacter } from '@/packages/character/forms'
import { CreateVenue } from '@/packages/venue/forms'
import { CreateChat } from '@/packages/chat/forms'

interface GenerateProps<T> {
    label: string
    title: string
    description: string
    onGenerate: (data: T) => void
    action: (prompt: string) => Promise<T>
    CreateForm: any
}

function GenerateButton<T>({ label, title, description, onGenerate, action, CreateForm }: GenerateProps<T>) {
    const [opened, { open, close }] = useDisclosure(false)
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const [generatedData, setGeneratedData] = useState<T | null>(null)

    const handleGenerate = async () => {
        if (!prompt.trim()) return
        setLoading(true)
        try {
            const data = await action(prompt)
            setGeneratedData(data)
            notifications.show({
                title: 'Draft Generated',
                message: `AI generated a draft for ${label}. Please review and save.`,
                color: 'blue'
            })
        } catch (error) {
            console.error(error)
            notifications.show({
                title: 'Error',
                message: `Failed to generate ${label}.`,
                color: 'red'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        close()
        setPrompt('')
        setGeneratedData(null)
    }

    return (
        <>
            <Button
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
                leftSection={<IconSparkles size={18} />}
                onClick={open}
            >
                Generate {label}
            </Button>

            <Modal opened={opened} onClose={handleClose} title={generatedData ? `Review Generated ${label}` : title} centered size="lg">
                <Stack>
                    {!generatedData ? (
                        <>
                            <Text size="sm" c="dimmed">
                                {description}
                            </Text>
                            <Textarea
                                placeholder="e.g. A grumpy pirate programmer who loves grog and typescript"
                                label="Description"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                minRows={3}
                                autosize
                            />
                            <Group justify="flex-end">
                                <Button variant="light" onClick={handleClose}>Cancel</Button>
                                <Button
                                    loading={loading}
                                    onClick={handleGenerate}
                                    variant="gradient"
                                    gradient={{ from: 'indigo', to: 'cyan' }}
                                >
                                    Generate
                                </Button>
                            </Group>
                        </>
                    ) : (
                        <Box>
                            <CreateForm defaults={generatedData} hideGenerate onSuccess={(result: any) => {
                                onGenerate(result)
                                handleClose()
                            }} />
                            <Button variant="subtle" fullWidth mt="sm" onClick={() => setGeneratedData(null)}>
                                Back to Prompt
                            </Button>
                        </Box>
                    )}
                </Stack>
            </Modal>
        </>
    )
}

export function GenerateCharacterButton({ onGenerate }: { onGenerate: (data: any) => void }) {
    return (
        <GenerateButton
            label="Character"
            title="Generate Character"
            description="Describe the persona, style, and skills of the character you want to create."
            action={generateCharacter}
            onGenerate={onGenerate}
            CreateForm={CreateCharacter}
        />
    )
}

export function GenerateVenueButton({ onGenerate }: { onGenerate: (data: any) => void }) {
    return (
        <GenerateButton
            label="Venue"
            title="Generate Venue"
            description="Describe the location, circumstances, and available tools of the venue."
            action={generateVenue}
            onGenerate={onGenerate}
            CreateForm={CreateVenue}
        />
    )
}

export function GenerateChatButton({ onGenerate }: { onGenerate: (data: any) => void }) {
    return (
        <GenerateButton
            label="Chat"
            title="Generate Chat"
            description="Describe the purpose and configuration of the chat session."
            action={generateChat}
            onGenerate={onGenerate}
            CreateForm={CreateChat}
        />
    )
}
