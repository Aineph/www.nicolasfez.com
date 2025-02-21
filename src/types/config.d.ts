import { LocalePrefixMode } from 'next-intl/routing'

export type Locale = 'en' | 'fr'

export type Config = {
    name: string
    locales: Locale[]
    defaultLocale: Locale
    localePrefix: LocalePrefixMode
}
