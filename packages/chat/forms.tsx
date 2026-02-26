'use client'
import { CreateForm, UpdateForm, useSingle } from 'asasvirtuais/react-interface'
import { Button, Stack } from '@mantine/core'
import { schema, type Readable } from '.'
import { TitleField, InstructionsField, TemperatureField, ModelField, ToolsField } from './fields'
import { useChats } from './provider'

export function CreateChat({ onSuccess }: { onSuccess?: (item: Readable) => void }) {
    return (
        <CreateForm table='chats' schema={schema} onSuccess={onSuccess}>
            {form => (
                <form onSubmit={form.submit}>
                    <Stack>
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
                model: item.model || 'gemini-2.0-flash',
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
