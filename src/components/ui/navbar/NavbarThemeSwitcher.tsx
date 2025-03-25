/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 02/03/2025.
 */

import useTheme from '@/hooks/useTheme'
import { THEME_LIGHT } from '@/constants/theme'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Button from '@/components/ui/Button'

export const THEME_SWITCHER_HOVER_ANIMATION_DURATION = .5

export interface NavbarThemeSwitcherProps {
  /**
   * Whether the theme switcher should be hovered by default
   */
  hovered?: boolean
}

/**
 * A components that allows the user to change the current color theme
 *
 * @constructor
 */
const NavbarThemeSwitcher: React.FunctionComponent<NavbarThemeSwitcherProps> = ({ hovered = false }) => {
  const themeSwitcherContentRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()

  const [isHovering, setIsHovering] = useState(false)

  useGSAP(() => {
    if (isHovering) {
      gsap.to(themeSwitcherContentRef.current, {
        duration: THEME_SWITCHER_HOVER_ANIMATION_DURATION,
        color: 'var(--primary)',
        rotate: -90,
      })
    } else {
      gsap.to(themeSwitcherContentRef.current, {
        color: 'var(--foreground)',
        rotate: 0,
      })
    }
  }, [isHovering])

  const handleClick = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  useEffect(() => {
    setIsHovering(hovered)
  }, [hovered])

  return (
    <div onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         onMouseUp={handleMouseLeave}
         data-testid="navbar-theme-switcher">
      <Button className="p-2"
              onClick={handleClick}
              hovered={hovered}>
        <div ref={themeSwitcherContentRef}>
          {
            theme === THEME_LIGHT ? (
              <SunIcon className="size-6"
                       data-testid="navbar-theme-switcher-sun"/>
            ) : (
              <MoonIcon className="size-6"
                        data-testid="navbar-theme-switcher-moon"/>
            )
          }
        </div>
      </Button>
    </div>
  )
}

NavbarThemeSwitcher.displayName = 'NavbarThemeSwitcher'

export default NavbarThemeSwitcher
