import gsheets from '@/app/google/sheets'
import { sheets_v4 } from 'googleapis'
import { rowToObject } from './util'

export const list = (spreadsheetId: string, options: sheets_v4.Params$Resource$Spreadsheets$Values$Get) => (
    gsheets().spreadsheets.values
        .get({ spreadsheetId, majorDimension: 'ROWS', ...options })
        .then(res => res.data.values || [])
        .then(([headers, ...rows]) => rows.map(rowToObject(headers)))
)

export const update = async (spreadsheetId: string, row: number, values: any[]) => {
    row = row + 2
    const headers = Object.keys(values)
    const range = `A${row}:J${row}`
    return gsheets().spreadsheets.values.update({
        spreadsheetId,
        range,
        requestBody: { range, values: [Object.values(values)] },
        valueInputOption: 'RAW',
    }).then(res => res.data.updatedData?.values?.map(rowToObject(headers)))
}

export const create = async (title: string) => (
    gsheets().spreadsheets.create({
        requestBody: {
            properties: { title },
            sheets: [{ properties: { title } }],
        }
    })
)