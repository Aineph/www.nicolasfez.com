/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 02/03/2025.
 */
import React, { ButtonHTMLAttributes } from 'react'
import { randomUUID } from 'node:crypto'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  test: string
}

export default function Button ({ children, id, onClick }: ButtonProps) {
  return (
    <button id={id || randomUUID()} onClick={onClick}>
      {children}
    </button>
  )
}