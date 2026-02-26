'use client'
import { CreateForm, UpdateForm, useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '.'
import { ChatField, InstructionsField, CharacterField, VenueField } from './fields'
import { useScenarios } from './provider'
import { Button, Stack } from '@mantine/core'

export function CreateScenario({ onSuccess }: { onSuccess?: (scenario: Readable) => void }) {
    return (
        <CreateForm table="scenarios" schema={schema} onSuccess={onSuccess}>
            {(form) => (
                <form onSubmit={form.submit}>
                    <Stack gap="md">
                        <CharacterField />
                        <VenueField />
                        <ChatField />
                        <InstructionsField />
                        <Button type="submit" loading={form.loading}>
                            Create Scenario
                        </Button>
                    </Stack>
                </form>
            )}
        </CreateForm>
    )
}

export function UpdateScenario({ onSuccess }: { onSuccess?: (scenario: Readable) => void }) {
    const { single, id } = useSingle('scenarios', schema)
    const scenario = single as Readable
    return (
        <UpdateForm
            table="scenarios"
            schema={schema}
            id={id}
            defaults={{
                chat: scenario.chat || '',
                instructions: scenario.instructions || '',
                character: scenario.character || '',
                venue: scenario.venue || '',
            }}
            onSuccess={onSuccess}
        >
            {(form) => (
                <form onSubmit={form.submit}>
                    <Stack gap="md">
                        <CharacterField />
                        <VenueField />
                        <ChatField />
                        <InstructionsField />
                        <Button type="submit" loading={form.loading}>
                            Save Changes
                        </Button>
                    </Stack>
                </form>
            )}
        </UpdateForm>
    )
}

export function DeleteScenario({ onSuccess }: { onSuccess?: () => void }) {
    const { id } = useSingle('scenarios', schema)
    const { remove } = useScenarios()
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
            Delete Scenario
        </Button>
    )
}
