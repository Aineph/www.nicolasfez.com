/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 25/03/2025.
 */

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import en from '@/messages/en.json'
import fr from '@/messages/fr.json'
import NavbarLocaleSwitcher from '@/components/ui/navbar/NavbarLocaleSwitcher'
import { config } from '@/utils/config'

test('NavbarLocaleSwitcher should be defined', () => {
  render(
    <NextIntlClientProvider locale="en" messages={en}>
      <NavbarLocaleSwitcher/>
    </NextIntlClientProvider>,
  )
  expect(screen.getByTestId('navbar-locale-switcher')).toBeDefined()
})

test('NavbarLocaleSwitcher should render a default menu component', () => {
  render(
    <NextIntlClientProvider locale="en" messages={en}>
      <NavbarLocaleSwitcher/>
    </NextIntlClientProvider>,
  )

  expect(screen.getByTestId('menu')).toBeDefined()
})

test('NavbarLocaleSwitcher should contain links for each declared locale',
  () => {
    render(
      <NextIntlClientProvider locale="fr" messages={fr}>
        <NavbarLocaleSwitcher/>
      </NextIntlClientProvider>,
    )

    const links = screen.getAllByTestId('navbar-locale-switcher-link')

    for (const localeIndex in config.locales) {
      const key = config.locales[localeIndex] as keyof typeof fr.Locales

      expect(links[localeIndex].innerHTML).toBe(fr.Locales[key])
    }
  })

test('NavbarLocaleSwitcher links should redirect to the requested locales',
  () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <NavbarLocaleSwitcher/>
      </NextIntlClientProvider>,
    )

    const links = screen.getAllByTestId('navbar-locale-switcher-link')

    for (const localeIndex in config.locales) {
      expect(links[localeIndex].getAttribute('href')).
        toBe(`/${config.locales[localeIndex]}`)
    }
  })
