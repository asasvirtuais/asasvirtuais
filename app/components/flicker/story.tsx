import Flicker from '.'
import Panel from './panel'
import type { Meta } from '@storybook/react'

const meta = {
    title: 'Flicker',
    component: Flicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    }
} satisfies Meta<typeof Flicker>

export default meta

import type { StoryObj } from '@storybook/react'
type Story = StoryObj<typeof meta>
export const Story: Story = {
    render: () => (
        <Flicker>
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
        </Flicker>
    )
}
// export const StateB: Story = {}
