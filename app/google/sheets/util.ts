
export const rowToObject = (headers: string[]) => (
    (row: string[]) => Object.fromEntries(
        headers.map(
            (header, i) => [header, row[i]]
        )
    )
)
