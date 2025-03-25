/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 24/03/2025.
 */

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import NavbarLink from '@/components/ui/navbar/NavbarLink'
import { NextIntlClientProvider } from 'next-intl'

test('NavbarLink should be defined', () => {
  render(
    <NextIntlClientProvider locale="en">
      <NavbarLink/>
    </NextIntlClientProvider>,
  )
  expect(screen.getByTestId('navbar-link')).toBeDefined()
})

test('NavbarLink should render a default link component', () => {
  render(
    <NextIntlClientProvider locale="en">
      <NavbarLink/>
    </NextIntlClientProvider>,
  )
  expect(screen.getByTestId('link')).toBeDefined()
})

test('NavbarLink should render children components', () => {
  render(
    <NextIntlClientProvider locale="en">
      <NavbarLink>
        <span data-testid="foo">Bar</span>
      </NavbarLink>
    </NextIntlClientProvider>,
  )
  expect(screen.getByTestId('foo')).toBeDefined()
  expect(screen.getByTestId('foo').innerHTML).toEqual('Bar')
})

test(
  'NavbarLink should redirect to the requested page',
  () => {
    render(
      <NextIntlClientProvider locale="en">
        <NavbarLink href="/toto"/>
      </NextIntlClientProvider>,
    )
    expect(screen.getByTestId('link').getAttribute('href')).toBe('/en/toto')
  })
