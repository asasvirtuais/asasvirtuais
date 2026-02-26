'use client'
import { CreateForm, UpdateForm, useSingle } from 'asasvirtuais/react-interface'
import { Button, Stack, Group } from '@mantine/core'
import { schema, type Readable, type Writable } from '.'
import { TitleField, InstructionsField, TemperatureField, ModelField, ToolsField } from './fields'
import { useChats } from './provider'
import { GenerateChatButton } from '@/packages/generation/components'

export function CreateChat({ onSuccess, defaults, hideGenerate }: { onSuccess?: (item: Readable) => void, defaults?: Partial<Writable>, hideGenerate?: boolean }) {
    return (
        <CreateForm table='chats' schema={schema} onSuccess={onSuccess} defaults={defaults}>
            {form => (
                <form onSubmit={form.submit}>
                    <Stack>
                        {!hideGenerate && (
                            <Group justify="flex-end">
                                <GenerateChatButton onGenerate={form.setFields} />
                            </Group>
                        )}
                        <TitleField />
                        <ModelField />
                        <TemperatureField />
                        <InstructionsField />
                        <ToolsField />
                        <Button type='submit' loading={form.loading} fullWidth>
                            Save Chat
                        </Button>
                    </Stack>
                </form>
            )}
        </CreateForm>
    )
}

export function UpdateChat({ onSuccess }: { onSuccess?: (item: Readable) => void }) {
    const { single, id } = useSingle('chats', schema)
    const item = single as Readable

    return (
        <UpdateForm
            table='chats'
            schema={schema}
            id={id}
            defaults={{
                title: item.title || '',
                instructions: item.instructions || '',
                temperature: item.temperature ?? 0.7,
                model: item.model || 'gemini-3.0-flash-preview',
                tools: item.tools || [],
            }}
            onSuccess={onSuccess}
        >
            {form => (
                <form onSubmit={form.submit}>
                    <Stack>
                        <TitleField />
                        <ModelField />
                        <TemperatureField />
                        <InstructionsField />
                        <ToolsField />
                        <Button type='submit' loading={form.loading} fullWidth>
                            Update Chat
                        </Button>
                    </Stack>
                </form>
            )}
        </UpdateForm>
    )
}

export function DeleteChat({ onSuccess }: { onSuccess?: () => void }) {
    const { id } = useSingle('chats', schema)
    const { remove } = useChats()

    return (
        <Button
            variant='light'
            color='red'
            onClick={async () => {
                await remove.trigger({ id })
                onSuccess?.()
            }}
            loading={remove.loading}
        >
            Delete Chat
        </Button>
    )
}
