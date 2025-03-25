/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 23/03/2025.
 */

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import MenuItem from '@/components/ui/menu/MenuItem'

test('MenuItem should be defined', () => {
  render(<MenuItem/>)
  expect(screen.getByTestId('menu-item')).toBeDefined()
})

test('MenuItem should render children components', () => {
  render(
    <MenuItem>
      <span data-testid="foo">Bar</span>
    </MenuItem>,
  )
  expect(screen.getByTestId('foo')).toBeDefined()
  expect(screen.getByTestId('foo').innerHTML).toEqual('Bar')
})
