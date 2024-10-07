import { ChakraProvider } from '@chakra-ui/react'
import AirtableGallerySlider, { AirtableGallerySliderProps } from './airtable'

export default function ExportGallerySlider(props: AirtableGallerySliderProps) {
    return (
        <ChakraProvider>
            <AirtableGallerySlider {...props} />
        </ChakraProvider>
    )
}
