'use client'
import { Button, Stack } from '@mantine/core'
import { CreateForm, UpdateForm, useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '.'
import { GoogleApiKeyField } from './fields'

export function CreateSetting({ onSuccess }: { onSuccess?: (setting: Readable) => void }) {
    return (
        <CreateForm table='settings' schema={schema} onSuccess={onSuccess}>
            {form => (
                <form onSubmit={form.submit}>
                    <Stack>
                        <GoogleApiKeyField />
                        <Button type='submit' loading={form.loading}>
                            Save Settings
                        </Button>
                    </Stack>
                </form>
            )}
        </CreateForm>
    )
}

export function UpdateSetting({ onSuccess }: { onSuccess?: (setting: Readable) => void }) {
    const { single, id } = useSingle('settings', schema)
    const setting = single as Readable

    if (!setting) return null

    return (
        <UpdateForm
            table='settings'
            schema={schema}
            id={id}
            defaults={{
                google_api_key: setting.google_api_key || '',
            }}
            onSuccess={onSuccess}
        >
            {form => (
                <form onSubmit={form.submit}>
                    <Stack>
                        <GoogleApiKeyField />
                        <Button type='submit' loading={form.loading}>
                            Update Settings
                        </Button>
                    </Stack>
                </form>
            )}
        </UpdateForm>
    )
}
