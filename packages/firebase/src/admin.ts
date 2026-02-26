import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export const account = JSON.parse(process.env.SERVICE_ACCOUNT_JSON as string)

export const app = getApps()[0] ?? initializeApp({
    credential: cert(account),
    projectId: 'asasvirtuais',
})

export const firestore = getFirestore(app, 'asasvirtuais')
