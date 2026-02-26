'use server'
import { firestoreInterface } from './firestore-interface'
import { schema } from './schema'

const rootInterface = firestoreInterface<typeof schema, keyof typeof schema>(schema)

export const find = (async (props) => {
    return rootInterface.find(props)
}) as typeof rootInterface.find

export const list = (async (props) => {
    return rootInterface.list(props)
}) as typeof rootInterface.list

export const create = (async (props) => {
    return rootInterface.create(props)
}) as typeof rootInterface.create

export const update = (async (props) => {
    return rootInterface.update(props)
}) as typeof rootInterface.update

export const remove = (async (props) => {
    return rootInterface.remove(props)
}) as typeof rootInterface.remove
