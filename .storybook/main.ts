import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: [
    '../app/**/*/story.tsx',
  ],
  addons: [
    // '@storybook/addon-onboarding',
    // '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@chromatic-com/storybook',
    // '@storybook/addon-interactions',
    '@chakra-ui/storybook-addon'
  ],
  features: {
    // @ts-expect-error
    emotionAlias: false,
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  // staticDirs: ['../public'],
  refs: {
    '@chakra-ui/react': {
      disable: true,
    },
  }
}
export default config
