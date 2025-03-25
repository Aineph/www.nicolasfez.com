import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/components/pages/Home'

test('Home page should be defined', () => {
  render(<Home/>)

  expect(screen.getByTestId('home')).toBeDefined()
})
