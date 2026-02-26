import z from 'zod'
import { firestore } from 'asasvirtuais-firebase/admin'
import { DatabaseSchema, TableInterface } from 'asasvirtuais/interface'

declare module 'asasvirtuais/interface' {
    interface FindProps { user?: string }
    interface ListProps { user?: string }
    interface CreateProps { user?: string }
    interface UpdateProps { user?: string }
    interface RemoveProps { user?: string }
}


export function firestoreInterface<Schema extends DatabaseSchema, T extends keyof Schema & string>(
    schema: Schema,
    defaultTable?: T
): TableInterface<z.infer<Schema[T]['readable']>, z.infer<Schema[T]['writable']>> {
    type Readable = z.infer<Schema[T]['readable']>
    type Writable = z.infer<Schema[T]['writable']>

    const getCollection = (table: string, user?: string) => {
        if (table === 'users') {
            return firestore.collection(table)
        }
        if (!user) {
            throw new Error(`The "user" property is required for user-centric table: ${table}`)
        }
        return firestore.collection('users').doc(user).collection(table)
    }

    return {
        async find({ table = defaultTable, id, user }) {
            const t = table as string
            if (!t) throw new Error('Table is required')

            const docRef = getCollection(t, user).doc(id)
            const docSnap = await docRef.get()
            if (docSnap.exists) {
                return { id: docSnap.id, ...docSnap.data() } as Readable
            }
            throw new Error(`Record not found in ${t} with id ${id}`)
        },

        async list({ table = defaultTable, query: q, user }) {
            const t = table as string
            if (!t) throw new Error('Table is required')

            let queryRef: FirebaseFirestore.Query = getCollection(t, user)

            if (q) {
                for (const [key, value] of Object.entries(q)) {
                    // Simplistic query mapping for basic operators
                    queryRef = queryRef.where(key, '==', value)
                }
            }

            const querySnapshot = await queryRef.get()
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Readable))
        },

        async create({ table = defaultTable, data, user }) {
            const t = table as string
            if (!t) throw new Error('Table is required')

            const docRef = await getCollection(t, user).add(data)
            return { id: docRef.id, ...data } as Readable
        },

        async update({ table = defaultTable, id, data, user }) {
            const t = table as string
            if (!t) throw new Error('Table is required')

            const docRef = getCollection(t, user).doc(id)
            await docRef.update(data)
            const updatedDoc = await docRef.get()
            return { id: updatedDoc.id, ...updatedDoc.data() } as Readable
        },

        async remove({ table = defaultTable, id, user }) {
            const t = table as string
            if (!t) throw new Error('Table is required')

            const docRef = getCollection(t, user).doc(id)
            const docSnap = await docRef.get()
            if (!docSnap.exists) {
                throw new Error(`Record not found in ${t} with id ${id}`)
            }
            const data = { id: docSnap.id, ...docSnap.data() } as Readable
            await docRef.delete()
            console.log(`[FIRESTORE] Record removed from ${t} with id ${id}`)
            return data
        },
    }
}
