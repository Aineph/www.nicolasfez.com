/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 24/03/2025.
 */

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import NavbarBrand from '@/components/ui/navbar/NavbarBrand'
import { NextIntlClientProvider } from 'next-intl'

test('NavbarBrand should be defined', () => {
  render(
    <NextIntlClientProvider locale="en">
      <NavbarBrand/>
    </NextIntlClientProvider>,
  )
  expect(screen.getByTestId('navbar-brand')).toBeDefined()
})

test('NavbarBrand should contain 3 images', () => {
  render(
    <NextIntlClientProvider locale="en">
      <NavbarBrand/>
    </NextIntlClientProvider>,
  )
  expect(screen.getAllByRole('img')).toHaveLength(3)
})

test('NavbarBrand should contain a link', () => {
  render(
    <NextIntlClientProvider locale="en">
      <NavbarBrand/>
    </NextIntlClientProvider>,
  )

  expect(screen.getByRole('link')).toBeDefined()
})

test('NavbarBrand link should redirect to the root with the current locale',
  () => {
    render(
      <NextIntlClientProvider locale="en">
        <NavbarBrand/>
      </NextIntlClientProvider>,
    )

    expect(screen.getByRole('link').getAttribute('href')).toBe('/en')
  })
