'use server'
import { authenticate } from 'asasvirtuais/auth0'
import { firestoreInterface } from './firestore-interface'
import { schema } from './schema'

const rootInterface = firestoreInterface<typeof schema, keyof typeof schema>(schema)

export const find = (async (props) => {
    const user = (await authenticate()).id
    return rootInterface.find({ ...props, user })
}) as typeof rootInterface.find

export const list = (async (props) => {
    const user = (await authenticate()).id
    return rootInterface.list({ ...props, user })
}) as typeof rootInterface.list

export const create = (async (props) => {
    const user = (await authenticate()).id
    return rootInterface.create({ ...props, user })
}) as typeof rootInterface.create

export const update = (async (props) => {
    const user = (await authenticate()).id
    return rootInterface.update({ ...props, user })
}) as typeof rootInterface.update

export const remove = (async (props) => {
    const user = (await authenticate()).id
    return rootInterface.remove({ ...props, user })
}) as typeof rootInterface.remove
