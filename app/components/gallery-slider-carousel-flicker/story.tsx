import GallerySliderCarouselFlicker from '@/app/components/gallery-slider-carousel-flicker'
import { Box } from '@chakra-ui/react'
import type { Meta } from '@storybook/react'

const meta = {
    title: 'GallerySliderCarouselFlicker',
    component: GallerySliderCarouselFlicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    }
} satisfies Meta<typeof GallerySliderCarouselFlicker>

export default meta

import type { StoryObj } from '@storybook/react'
type Story = StoryObj<typeof meta>
export const Story: Story = {
    render: () => (
        <Box w='100%' p={8} bg='black'>
            <GallerySliderCarouselFlicker />
        </Box>

    )
}
// export const StateB: Story = {}
