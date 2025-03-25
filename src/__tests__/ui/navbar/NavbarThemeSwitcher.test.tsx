/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 25/03/2025.
 */

import { expect, test, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import NavbarThemeSwitcher from '@/components/ui/navbar/NavbarThemeSwitcher'
import { userEvent } from '@storybook/test'

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

test('NavbarThemeSwitcher should be defined', () => {
  render(
    <NavbarThemeSwitcher/>,
  )

  expect(screen.getByTestId('navbar-theme-switcher')).toBeDefined()
})

test('NavbarThemeSwitcher should render a default button component', () => {
  render(
    <NavbarThemeSwitcher/>,
  )

  expect(screen.getByTestId('button')).toBeDefined()
})

test('NavbarThemeSwitcher should be set to light by default', () => {
  render(
    <NavbarThemeSwitcher/>,
  )

  expect(screen.getByTestId('navbar-theme-switcher-sun')).toBeDefined()
})

test('NavbarThemeSwitcher should switch to dark after clicking', async () => {
  render(
    <NavbarThemeSwitcher/>,
  )

  const button = screen.getByTestId('button')

  await act(async () => {
    await userEvent.click(button)
  })

  expect(screen.getByTestId('navbar-theme-switcher-moon')).toBeDefined()
})
