/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 25/03/2025.
 */

import { expect, test } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useDisclosure from '@/hooks/useDisclosure'

test('useDisclosure should be closed by default', () => {
  const { result } = renderHook(() => useDisclosure())

  expect(result.current.isOpen).toBeFalsy()
})

test('useDisclosure should open when opening', () => {
  const { result } = renderHook(() => useDisclosure())

  act(() => {
    result.current.onOpen()
  })

  expect(result.current.isOpen).toBeTruthy()
})

test('useDisclosure should close when closing', () => {
  const { result } = renderHook(() => useDisclosure())

  act(() => {
    result.current.onOpen()
    result.current.onClose()
  })

  expect(result.current.isOpen).toBeFalsy()
})

test('useDisclosure should open and close when toggling', () => {
  const { result } = renderHook(() => useDisclosure())

  act(() => {
    result.current.onToggle()
  })

  expect(result.current.isOpen).toBeTruthy()

  act(() => {
    result.current.onToggle()
  })

  expect(result.current.isOpen).toBeFalsy()
})
