import type { Preview } from '@storybook/react'
import '../src/app/globals.css'
import { withThemeByClassName } from '@storybook/addon-themes'
import nextIntl from './next-intl'

const preview: Preview = {
  initialGlobals: {
    locale: 'en',
    locales: {
      en: { icon: '🇺🇸', title: 'English', right: 'EN' },
      fr: { icon: '🇫🇷', title: 'Français', right: 'FR' },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextIntl,
  },

  decorators: [
    withThemeByClassName({
      themes: {
        // nameOfTheme: 'classNameForTheme',
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
