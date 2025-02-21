import { LocalePrefixMode } from 'next-intl/routing'
import { Config } from '@/types/config'

const localePrefix: LocalePrefixMode = 'as-needed'

export const config: Config = {
    name: 'Website',
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    localePrefix,
}
