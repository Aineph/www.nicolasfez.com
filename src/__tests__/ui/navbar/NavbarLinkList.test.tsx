/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 24/03/2025.
 */

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import NavbarLinkList from '@/components/ui/navbar/NavbarLinkList'
import en from '@/messages/en.json'
import fr from '@/messages/fr.json'
import { SECTIONS_LIST } from '@/constants/sections'

test('NavbarLinkList should be defined', () => {
  render(
    <NextIntlClientProvider locale="en" messages={en}>
      <NavbarLinkList/>
    </NextIntlClientProvider>,
  )
  expect(screen.getByTestId('navbar-link-list')).toBeDefined()
})

test('NavbarLinkList should contain links for each declared section', () => {
  render(
    <NextIntlClientProvider locale="fr" messages={fr}>
      <NavbarLinkList/>
    </NextIntlClientProvider>,
  )

  const links = screen.getAllByTestId('navbar-link-title')

  for (const sectionIndex in SECTIONS_LIST) {
    const key = SECTIONS_LIST[sectionIndex].name as keyof typeof fr.Sections

    expect(links[sectionIndex].innerHTML).
      toBe(fr.Sections[key])
  }
})

test('NavbarLinkList links should redirect to the requested pages', () => {
  render(
    <NextIntlClientProvider locale="en" messages={en}>
      <NavbarLinkList/>
    </NextIntlClientProvider>,
  )

  const links = screen.getAllByTestId('link')

  for (const sectionIndex in SECTIONS_LIST) {
    expect(links[sectionIndex].getAttribute('href')).
      toBe(`/en${SECTIONS_LIST[sectionIndex].route.replace('/#', '#')}`)
  }
})

test('NavbarLinkList should contain a navbar locale switcher', () => {
  render(
    <NextIntlClientProvider locale="en" messages={en}>
      <NavbarLinkList/>
    </NextIntlClientProvider>,
  )

  expect(screen.getByTestId('navbar-locale-switcher')).toBeDefined()
})

test('NavbarLinkList should not be visible when not expanded', () => {
  render(
    <NextIntlClientProvider locale="en" messages={en}>
      <NavbarLinkList expanded={false}/>
    </NextIntlClientProvider>,
  )

  expect(screen.getByTestId('navbar-link-list').
    classList.contains('scale-y-0')).toBeTruthy()
})
