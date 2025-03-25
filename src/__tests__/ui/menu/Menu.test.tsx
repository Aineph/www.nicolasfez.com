/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 23/03/2025.
 */

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Menu from '@/components/ui/menu/Menu'

test('Menu should be defined', () => {
  render(<Menu/>)
  expect(screen.getByTestId('menu')).toBeDefined()
})

test('Menu should render children components', () => {
  render(
    <Menu>
      <div data-testid="foo">
        Bar
      </div>
    </Menu>,
  )
  expect(screen.getByTestId('foo')).toBeDefined()
  expect(screen.getByTestId('foo').innerHTML).toEqual("Bar")
})
