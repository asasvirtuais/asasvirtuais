import Airtable from 'airtable'

const airtable = new Airtable({
	apiKey: process.env.AIRTABLE_TOKEN
})

export default airtable