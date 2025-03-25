import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from '@/components/pages/About'

test('About page should be defined', () => {
  render(<About/>)
  expect(screen.getByTestId('about')).toBeDefined()
})
