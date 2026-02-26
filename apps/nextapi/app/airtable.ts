import AirtableInterface from 'asasvirtuais-airtable/interface'

export const { base, api } = AirtableInterface(process.env.AIRTABLE_TOKEN as string)
