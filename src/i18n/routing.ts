import { defineRouting } from 'next-intl/routing'
import { config } from '@/utils/config'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
    locales: config.locales,
    defaultLocale: config.defaultLocale,
    localePrefix: config.localePrefix,
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation()
