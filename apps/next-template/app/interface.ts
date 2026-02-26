import { firestoreInterface } from 'asasvirtuais-firebase/interface'
import { schema } from './schema'

export const {
    find,
    list,
    create,
    update,
    remove,
} = firestoreInterface<typeof schema, keyof typeof schema>()
