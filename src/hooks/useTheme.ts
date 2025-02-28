/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 02/03/2025.
 */

import { useCallback, useEffect, useState } from 'react'
import { Theme } from '@/types/theme'
import { THEME_DARK, THEME_LIGHT, THEME_VARIABLE } from '@/constants/theme'

export default function useTheme () {
  const [theme, setTheme] = useState<Theme>(THEME_LIGHT)

  const toggleTheme = useCallback(() => {
    if (theme === THEME_DARK) {
      setTheme(THEME_LIGHT)
    } else {
      setTheme(THEME_DARK)
    }
  }, [theme])

  useEffect(() => {
    const savedTheme: Theme | null = localStorage.getItem(THEME_VARIABLE)

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme(THEME_DARK)
    } else {
      setTheme(THEME_LIGHT)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(THEME_VARIABLE, theme)
    if (theme === THEME_DARK) {
      document.documentElement.classList.add(THEME_DARK)
    } else {
      document.documentElement.classList.remove(THEME_DARK)
    }
  }, [theme])

  return { theme, toggleTheme }
}