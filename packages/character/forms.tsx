'use client'
import { CreateForm, UpdateForm, useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable, type Writable } from '.'
import { NameField, DefinitionField, DetailsField, AvatarField, SkillsField } from './fields'
import { useCharacters } from './provider'
import { Button, Stack, Group } from '@mantine/core'
import { GenerateCharacterButton } from '@/packages/skills/components'

export function CreateCharacter({ onSuccess, defaults, hideGenerate }: { onSuccess?: (character: Readable) => void, defaults?: Partial<Writable>, hideGenerate?: boolean }) {
    return (
        <CreateForm table="characters" schema={schema} onSuccess={onSuccess} defaults={defaults}>
            {(form) => (
                <form onSubmit={form.submit}>
                    <Stack gap="md">
                        {!hideGenerate && (
                            <Group justify="flex-end">
                                <GenerateCharacterButton onGenerate={form.setFields} />
                            </Group>
                        )}
                        <NameField />
                        <DefinitionField />
                        <DetailsField />
                        <AvatarField />
                        <SkillsField />
                        <Button type="submit" loading={form.loading}>
                            Create Character
                        </Button>
                    </Stack>
                </form>
            )}
        </CreateForm>
    )
}

export function UpdateCharacter({ onSuccess }: { onSuccess?: (character: Readable) => void }) {
    const { single, id } = useSingle('characters', schema)
    const character = single as Readable
    return (
        <UpdateForm
            table="characters"
            schema={schema}
            id={id}
            defaults={{
                name: character.name || '',
                definition: character.definition || '',
                details: character.details || '',
                avatar: character.avatar || '',
                skills: character.skills || [],
            }}
            onSuccess={onSuccess}
        >
            {(form) => (
                <form onSubmit={form.submit}>
                    <Stack gap="md">
                        <NameField />
                        <DefinitionField />
                        <DetailsField />
                        <AvatarField />
                        <SkillsField />
                        <Button type="submit" loading={form.loading}>
                            Save Changes
                        </Button>
                    </Stack>
                </form>
            )}
        </UpdateForm>
    )
}

export function DeleteCharacter({ onSuccess }: { onSuccess?: () => void }) {
    const { id } = useSingle('characters', schema)
    const { remove } = useCharacters()
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
            Delete Character
        </Button>
    )
}
