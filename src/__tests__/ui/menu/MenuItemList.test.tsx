/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 23/03/2025.
 */

import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import MenuItemList from '@/components/ui/menu/MenuItemList'
import { MenuContext } from '@/components/ui/menu/Menu'

test('MenuItemList should be defined', () => {
  render(<MenuItemList/>)
  expect(screen.getByTestId('menu-item-list')).toBeDefined()
})

test('MenuItemList should render children components', () => {
  render(
    <MenuItemList>
      <span data-testid="foo">Bar</span>
    </MenuItemList>,
  )
  expect(screen.getByTestId('foo')).toBeDefined()
  expect(screen.getByTestId('foo').innerHTML).toEqual('Bar')
})

test('MenuItemList content should be hidden when menu is closed', () => {
  render(
    <MenuContext.Provider value={{
      isHovering: false,
      isOpen: false,
      onMenuOpen: vi.fn(),
      onMenuClose: vi.fn(),
    }}>
      <MenuItemList/>
    </MenuContext.Provider>,
  )

  expect(screen.getByTestId('menu-item-list').classList.contains('scale-y-0')).
    toBeTruthy()
  expect(screen.getByTestId('menu-item-list').classList.contains('opacity-0')).
    toBeTruthy()
})
