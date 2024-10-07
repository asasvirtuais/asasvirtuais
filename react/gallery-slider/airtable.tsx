import type { Attachment } from 'airtable'
import type { GalleryItem } from '.'
import { useEffect, useState } from 'react'
import { Center, Spinner } from '@chakra-ui/react'
import GallerySlider from '.'
import Airtable from 'airtable'

type Fields = {
    Title: string
    Image: Attachment[]
    Video: Attachment[]
    Description: string
    Link: string
    Date: string
}

export type AirtableGallerySliderProps = {
    token: string
    base: string
    table: string
    // viu que precisava
}

export default function AirtableGallerySlider({ token, base, table }: AirtableGallerySliderProps) {

    const [items, setItems] = useState<GalleryItem[]>()

    useEffect(() => {
        if (!token || !base || !table)
            return
        new Airtable({ apiKey: token }).base(base)<Fields>(table).select().all()
            .then(records => records.map(r => ({
                title: r.get('Title'),
                image: r.get('Image')?.[0]?.url,
                video: r.get('Video')?.[0]?.url,
                text: r.get('Description'),
                link: r.get('Link'),
                date: (new Date(r.get('Date')))
                    .toLocaleDateString('en-US', {
                        month: 'short', day: '2-digit'
                    }),
            })))
            .then(setItems)
    }, [token, base, table])

    if (!items)
        return (
            <Center minW='100dvw' minH='100dvh'>
                <Spinner />
            </Center>
        )

    return <GallerySlider items={items} />

}
