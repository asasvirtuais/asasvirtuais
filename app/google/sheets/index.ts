import { google } from 'googleapis'

const gsheets = () => google.sheets('v4')

export default gsheets