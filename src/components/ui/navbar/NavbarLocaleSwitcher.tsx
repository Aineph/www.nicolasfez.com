/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 02/03/2025.
 */

import Menu, { MenuProps } from '@/components/ui/menu/Menu'
import MenuButton from '@/components/ui/menu/MenuButton'
import MenuItemList from '@/components/ui/menu/MenuItemList'
import MenuItem from '@/components/ui/menu/MenuItem'
import { config } from '@/utils/config'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import React from 'react'

export interface NavbarLocaleSwitcherProps {
  /**
   * Whether the locale menu should be opened by default
   */
  opened?: boolean
}

/**
 * A components that allows the user to change the current locale
 *
 * @param opened {boolean} Whether the locale menu should be opened by default
 *
 * @constructor
 */
const NavbarLocaleSwitcher: React.FunctionComponent<MenuProps> = ({ opened }) => {
  const t = useTranslations('Locales')
  const locale = useLocale()
  const pathname = usePathname() ?? '/'

  return (
    <div data-testid="navbar-locale-switcher">
      <Menu opened={opened}>
        <MenuButton>{t(locale)}</MenuButton>
        <MenuItemList>
          {config.locales.map((locale) => (
            <MenuItem key={locale}>
              <Link href={pathname} locale={locale}
                    data-testid="navbar-locale-switcher-link">
                {t(locale)}
              </Link>
            </MenuItem>
          ))}
        </MenuItemList>
      </Menu>
    </div>
  )
}

NavbarLocaleSwitcher.displayName = 'NavbarLocaleSwitcher'

export default NavbarLocaleSwitcher
