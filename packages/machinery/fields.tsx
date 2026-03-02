'use client'
import { useFields } from 'asasvirtuais/fields'
import { TextInput, Select, Stack, Text } from '@mantine/core'
import { Writable } from '.'

export function EmailField() {
    const { fields, setField } = useFields<Writable>()
    return (
        <TextInput
            label="Business Email"
            placeholder="name@company.com"
            type="email"
            value={fields.email || ''}
            onChange={e => setField('email', e.target.value)}
        />
    )
}

export function PhoneField() {
    const { fields, setField } = useFields<Writable>()
    return (
        <TextInput
            label="Phone"
            placeholder="+1 (555) 123-4567"
            type="tel"
            value={fields.phone || ''}
            onChange={e => setField('phone', e.target.value)}
        />
    )
}

// Filter fields for the submitted leads list
export function CategoryFilter() {
    const { fields, setField } = useFields<{ query: Writable }>()
    return (
        <Select
            label="Category"
            placeholder="All categories"
            data={[
                { value: 'CRM', label: 'CRM' },
                { value: 'Analytics', label: 'Analytics' },
                { value: 'Marketing', label: 'Marketing' },
                { value: 'Infrastructure', label: 'Infrastructure' },
            ]}
            value={fields.query?.category || ''}
            onChange={val => setField('query', { ...fields.query, category: val || undefined })}
            clearable
        />
    )
}

export function CompanySizeFilter() {
    const { fields, setField } = useFields<{ query: Writable }>()
    return (
        <Select
            label="Company Tier"
            placeholder="All tiers"
            data={[
                { value: 'Startup', label: 'Startup' },
                { value: 'Mid-Market', label: 'Mid-Market' },
                { value: 'Enterprise', label: 'Enterprise' },
            ]}
            value={fields.query?.companySize || ''}
            onChange={val => setField('query', { ...fields.query, companySize: val || undefined })}
            clearable
        />
    )
}
