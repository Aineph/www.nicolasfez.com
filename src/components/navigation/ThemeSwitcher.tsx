/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 02/03/2025.
 */

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import useTheme from '@/hooks/useTheme'
import { THEME_LIGHT } from '@/constants/theme'
import { useCallback } from 'react'

export default function ThemeSwitcher () {
  const { theme, toggleTheme } = useTheme()

  const onThemeSwitch = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  return (
    <button onClick={onThemeSwitch}>
      {
        theme === THEME_LIGHT ? (
          <SunIcon className="size-6"/>
        ) : (
          <MoonIcon className="size-6"/>
        )
      }
    </button>
  )
}