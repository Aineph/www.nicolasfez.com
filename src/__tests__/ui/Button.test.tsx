/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 23/03/2025.
 */

import { expect, test, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import Button from '@/components/ui/Button'
import { userEvent } from '@storybook/test'

test('Button should be defined', () => {
  render(<Button/>)
  expect(screen.getByTestId('button')).toBeDefined()
})

test('Button should perform the requested action when clicked', async () => {
  const onClick = vi.fn()

  render(<Button onClick={onClick}/>)

  const button = screen.getByTestId('button')

  await act(async () => {
    await userEvent.click(button)
  })

  expect(onClick).toHaveBeenCalled()
})
