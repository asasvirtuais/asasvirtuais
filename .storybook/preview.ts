import type { Preview } from '@storybook/react'
import { theme } from '@chakra-ui/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    chakra: {
      theme
    }
  },
}

export default preview
// .storybook/preview.tsx
