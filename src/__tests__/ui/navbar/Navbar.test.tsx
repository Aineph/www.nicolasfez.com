/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 25/03/2025.
 */

import { expect, test, vi } from 'vitest'
import { screen, render } from '@testing-library/react'
import Navbar from '@/components/ui/navbar/Navbar'
import { NextIntlClientProvider } from 'next-intl'
import en from '@/messages/en.json'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

test('Navbar should be defined', () => {
  render(
    <NextIntlClientProvider locale="en" messages={en}>
      <Navbar/>
    </NextIntlClientProvider>,
  )

  expect(screen.getByTestId('navbar')).toBeDefined()
})

test('Navbar should render a navbar brand component', () => {
  render(
    <NextIntlClientProvider locale="en" messages={en}>
      <Navbar/>
    </NextIntlClientProvider>,
  )

  expect(screen.getByTestId('navbar-brand')).toBeDefined()
})

test('Navbar should render two navbar link list component', () => {
  render(
    <NextIntlClientProvider locale="en" messages={en}>
      <Navbar/>
    </NextIntlClientProvider>,
  )

  expect(screen.getAllByTestId('navbar-link-list')).toHaveLength(2)
})

test('Navbar should render a navbar theme switcher component',
  () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <Navbar/>
      </NextIntlClientProvider>,
    )

    expect(screen.getByTestId('navbar-theme-switcher')).toBeDefined()
  })

test('Navbar should render a navbar theme switcher component',
  () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <Navbar/>
      </NextIntlClientProvider>,
    )

    expect(screen.getByTestId('navbar-theme-switcher')).toBeDefined()
  })
