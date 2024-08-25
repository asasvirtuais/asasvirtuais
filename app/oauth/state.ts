
type State = {
    provider: string,
    returnTo: string,
}

export const serialize = (state: State) => (
    (new URLSearchParams(state)).toString()
)

export const unserialize = (serialized: string) => (
    Object.fromEntries(
        new URLSearchParams(serialized)
    )
)

export const encodeState = (state: State): string => (
    Buffer.from(
        serialize(state)
    ).toString('base64')
)

export const decodeState = (state: string) => (
    unserialize(
        Buffer.from(state, 'base64').toString() as string
    )
)
