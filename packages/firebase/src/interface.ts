import z from 'zod'
import { firestore } from './admin'
import { DatabaseSchema, TableInterface } from 'asasvirtuais/interface'

export function firestoreInterface<Schema extends DatabaseSchema, T extends keyof Schema & string>(defaultTable?: T): TableInterface<z.infer<Schema[T]['readable']>, z.infer<Schema[T]['writable']>> {
  type Readable = z.infer<Schema[T]['readable']>
  type Writable = z.infer<Schema[T]['writable']>
  return {
    async find({ table = defaultTable, id }) {
      const docRef = firestore.collection(table as string).doc(id)
      const docSnap = await docRef.get()
      if (docSnap.exists) {
        return { id: docSnap.id, ...docSnap.data() } as Readable
      }
      throw new Error(`Record not found in ${table} with id ${id}`)
    },
    async list({ table = defaultTable, query: q }) {
      let queryRef: FirebaseFirestore.Query = firestore.collection(table as string)

      if (q) {
        for (const [key, value] of Object.entries(q)) {
            queryRef = queryRef.where(key, '==', value)
        }
      }

      const querySnapshot = await queryRef.get()
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Readable))
    },
    async create({ table = defaultTable, data }) {
      const docRef = await firestore.collection(table as string).add(data)
      return { id: docRef.id, ...data } as Readable
    },
    async update({ table = defaultTable, id, data }) {
      const docRef = firestore.collection(table as string).doc(id)
      await docRef.update(data)
      const updatedDoc = await docRef.get()
      return { id: updatedDoc.id, ...updatedDoc.data() } as Readable
    },
    async remove({ table = defaultTable, id }) {
      const docRef = firestore.collection(table as string).doc(id)
      const docSnap = await docRef.get()
      if (!docSnap.exists) {
        throw new Error(`Record not found in ${table} with id ${id}`)
      }
      const data = { id: docSnap.id, ...docSnap.data() } as Readable
      await docRef.delete()
      console.log(`[FIRESTORE] Record removed from ${table} with id ${id}`);
      return data
    },
  }
}
