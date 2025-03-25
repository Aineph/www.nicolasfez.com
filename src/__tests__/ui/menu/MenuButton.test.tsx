/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 23/03/2025.
 */

import { expect, test, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import MenuButton from '@/components/ui/menu/MenuButton'
import { MenuContext } from '@/components/ui/menu/Menu'
import { userEvent } from '@storybook/test'

test('MenuButton should be defined', () => {
  render(<MenuButton/>)
  expect(screen.getByTestId('menu-button')).toBeDefined()
})

test('MenuButton should render a default button component', () => {
  render(<MenuButton/>)
  expect(screen.getByTestId('button')).toBeDefined()
})

test('MenuButton should render children components', () => {
  render(
    <MenuButton>
      <span data-testid="foo">Bar</span>
    </MenuButton>,
  )
  expect(screen.getByTestId('foo')).toBeDefined()
  expect(screen.getByTestId('foo').innerHTML).toEqual('Bar')
})

test('MenuButton should open the menu when clicked', async () => {
  const onMenuOpen = vi.fn()
  const onMenuClose = vi.fn()

  render(
    <MenuContext.Provider value={{
      isHovering: false,
      isOpen: false,
      onMenuOpen,
      onMenuClose,
    }}>
      <MenuButton/>
    </MenuContext.Provider>,
  )

  const button = screen.getByTestId('button')

  await act(async () => {
    await userEvent.click(button)
  })

  expect(onMenuOpen).toHaveBeenCalled()
  expect(onMenuClose).not.toHaveBeenCalled()
})

test('MenuButton should close the menu when clicked', async () => {
  const onMenuOpen = vi.fn()
  const onMenuClose = vi.fn()

  render(
    <MenuContext.Provider value={{
      isHovering: false,
      isOpen: true,
      onMenuOpen,
      onMenuClose,
    }}>
      <MenuButton/>
    </MenuContext.Provider>,
  )

  const button = screen.getByTestId('button')

  await act(async () => {
    await userEvent.click(button)
  })

  expect(onMenuOpen).not.toHaveBeenCalled()
  expect(onMenuClose).toHaveBeenCalled()
})
