'use client'

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const getHash = () => (typeof window !== 'undefined' ? window.location.hash : undefined)

/** https://github.com/vercel/next.js/discussions/49465#discussioncomment-10040050 */
export default function useHash() {
    const params = useParams()
    const path = usePathname()
    const search = useSearchParams()
    const router = useRouter()

    const [isClient, setIsClient] = useState(false)
    const [hash, setHash] = useState(getHash())

    useEffect(() => {
        setIsClient(true)
        setHash(getHash())
    }, [params])

    const removeHash = () => {
        setHash('')
        let newPath = path
        if (search) newPath += `?${search.toString()}`
        router.replace(newPath, { scroll: false })
    }

    return { hash: isClient ? hash : null, removeHash }
}