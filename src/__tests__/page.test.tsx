import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/[locale]/page'

test('Page', () => {
    render(<Page/>)
    expect(screen.getByTestId('home')).toBeDefined()
})
