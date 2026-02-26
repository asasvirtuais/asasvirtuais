'use client'
import { CreateForm, UpdateForm, useSingle } from 'asasvirtuais/react-interface'
import { Button, Stack, Group } from '@mantine/core'
import { schema, type Readable } from '.'
import { ContentField, RoleField, ChatField, MetadataField } from './fields'
import { useMessages } from './provider'

export function CreateMessage({
    onSuccess,
    defaults
}: {
    onSuccess?: (item: Readable) => void
    defaults?: Partial<Readable>
}) {
    return (
        <CreateForm table='messages' schema={schema} onSuccess={onSuccess} defaults={defaults}>
            {form => (
                <form onSubmit={form.submit}>
                    <Stack gap='md'>
                        <ChatField />
                        <RoleField />
                        <ContentField />
                        <MetadataField />
                        <Button type='submit' loading={form.loading}>
                            Create Message
                        </Button>
                    </Stack>
                </form>
            )}
        </CreateForm>
    )
}

export function UpdateMessage({ onSuccess }: { onSuccess?: (item: Readable) => void }) {
    const { single, id } = useSingle('messages', schema)
    const message = single as Readable

    return (
        <UpdateForm
            table='messages'
            schema={schema}
            id={id}
            defaults={{
                chat: message.chat,
                Role: message.Role,
                Content: message.Content || '',
                Metadata: message.Metadata || {},
            }}
            onSuccess={onSuccess}
        >
            {form => (
                <form onSubmit={form.submit}>
                    <Stack gap='md'>
                        <RoleField />
                        <ContentField />
                        <MetadataField />
                        <Button type='submit' loading={form.loading}>
                            Save Changes
                        </Button>
                    </Stack>
                </form>
            )}
        </UpdateForm>
    )
}

export function DeleteMessage({ onSuccess }: { onSuccess?: () => void }) {
    const { id } = useSingle('messages', schema)
    const { remove } = useMessages()

    return (
        <Button
            color='red'
            variant='light'
            loading={remove.loading}
            onClick={async () => {
                await remove.trigger({ id })
                onSuccess?.()
            }}
        >
            Delete Message
        </Button>
    )
}
