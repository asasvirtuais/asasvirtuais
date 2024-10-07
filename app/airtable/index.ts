import Airtable from 'airtable'

const airtable = (apiKey: string) => new Airtable({ apiKey })

export default airtable
