/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 23/03/2025.
 */

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Link from '@/components/ui/Link'
import { NextIntlClientProvider } from 'next-intl'

test('Link should be defined', () => {
  render(
    <NextIntlClientProvider locale="en">
      <Link/>
    </NextIntlClientProvider>,
  )
  expect(screen.getByTestId('link')).toBeDefined()
})

test('Link should redirect to the current page by default',
  () => {
    render(
      <NextIntlClientProvider locale="en">
        <Link/>
      </NextIntlClientProvider>,
    )

    expect(screen.getByTestId('link').getAttribute('href')).toBe('#')
  })

test('Link should redirect to the requested page with the correct locale',
  () => {
    render(
      <NextIntlClientProvider locale="fr">
        <Link href="/toto"/>
      </NextIntlClientProvider>,
    )

    expect(screen.getByTestId('link').getAttribute('href')).toBe('/fr/toto')
  })

test('Link should redirect in the current tab by default',
  () => {
    render(
      <NextIntlClientProvider locale="en">
        <Link/>
      </NextIntlClientProvider>,
    )

    expect(screen.getByTestId('link').getAttribute('target')).toBe('_self')
  })

test('Link should redirect in another tab if requested',
  () => {
    render(
      <NextIntlClientProvider locale="en">
        <Link target="_blank"/>
      </NextIntlClientProvider>,
    )

    expect(screen.getByTestId('link').getAttribute('target')).toBe('_blank')
  })
