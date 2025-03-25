/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 25/03/2025.
 */

import { expect, test, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useTheme from '@/hooks/useTheme'

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

test('useTheme should set theme to light by default', () => {
  const { result } = renderHook(() => useTheme())

  expect(result.current.theme).toBe('light')
})

test('useTheme should set theme to dark and light when toggling', () => {
  const { result } = renderHook(() => useTheme())

  act(() => {
    result.current.toggleTheme()
  })

  expect(result.current.theme).toBe('dark')

  act(() => {
    result.current.toggleTheme()
  })

  expect(result.current.theme).toBe('light')
})
