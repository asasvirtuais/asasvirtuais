'use client'
import { CreateForm, UpdateForm, useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '.'
import { TitleField, CircumstancesField, ToolsField } from './fields'
import { useVenues } from './provider'
import { Button, Stack } from '@mantine/core'

export function CreateVenue({ onSuccess }: { onSuccess?: (venue: Readable) => void }) {
    return (
        <CreateForm table="venues" schema={schema} onSuccess={onSuccess}>
            {(form) => (
                <form onSubmit={form.submit}>
                    <Stack gap="md">
                        <TitleField />
                        <CircumstancesField />
                        <ToolsField />
                        <Button type="submit" loading={form.loading}>
                            Create Venue
                        </Button>
                    </Stack>
                </form>
            )}
        </CreateForm>
    )
}

export function UpdateVenue({ onSuccess }: { onSuccess?: (venue: Readable) => void }) {
    const { single, id } = useSingle('venues', schema)
    const venue = single as Readable
    return (
        <UpdateForm
            table="venues"
            schema={schema}
            id={id}
            defaults={{
                title: venue.title || '',
                circumstances: venue.circumstances || '',
                tools: venue.tools || [],
            }}
            onSuccess={onSuccess}
        >
            {(form) => (
                <form onSubmit={form.submit}>
                    <Stack gap="md">
                        <TitleField />
                        <CircumstancesField />
                        <ToolsField />
                        <Button type="submit" loading={form.loading}>
                            Save Changes
                        </Button>
                    </Stack>
                </form>
            )}
        </UpdateForm>
    )
}

export function DeleteVenue({ onSuccess }: { onSuccess?: () => void }) {
    const { id } = useSingle('venues', schema)
    const { remove } = useVenues()
    return (
        <Button
            color="red"
            variant="light"
            onClick={async () => {
                await remove.trigger({ id })
                onSuccess?.()
            }}
            loading={remove.loading}
        >
            Delete Venue
        </Button>
    )
}
