/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 06/03/2025.
 */

import React, { useCallback, useContext, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { MenuContext } from '@/components/ui/menu/Menu'
import Button, { ButtonProps } from '@/components/ui/Button'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export const MENU_BUTTON_ANIMATION_DURATION = .5
export const MENU_BUTTON_ICON_SIZE = 5

export interface MenuButtonProps extends ButtonProps {
  /**
   * The menu button children components
   */
  children?: React.ReactNode,
}

/**
 * The menu button which shows or hide the associated content by hovering
 * or clicking on it
 *
 * @param children {React.ReactNode} The menu button children components
 *
 * @param props {ButtonProps} The default button properties
 *
 * @constructor
 */
const MenuButton: React.FunctionComponent<MenuButtonProps> = ({
  children = null,
  ...props
}) => {
  const timelineRef = useRef<gsap.core.Timeline>(null)
  const menuButtonTitleRef = useRef<HTMLDivElement>(null)
  const menuButtonIconRef = useRef<SVGSVGElement>(null)

  const { isHovering, isOpen, onMenuOpen, onMenuClose } = useContext(
    MenuContext)

  useGSAP(() => {
    if (timelineRef.current) {
      timelineRef.current.kill()
      timelineRef.current = null
    }
    if (isHovering) {
      const timelineChild = gsap.timeline({ repeat: -1, yoyo: true })

      timelineRef.current = gsap.timeline()
      timelineRef.current.to(menuButtonTitleRef.current, {
        duration: MENU_BUTTON_ANIMATION_DURATION,
        x: -MENU_BUTTON_ICON_SIZE,
      }, '<')
      timelineRef.current.fromTo(menuButtonIconRef.current, {
        duration: MENU_BUTTON_ANIMATION_DURATION,
        opacity: 0,
        x: -MENU_BUTTON_ICON_SIZE,
      }, {
        duration: MENU_BUTTON_ANIMATION_DURATION,
        opacity: 1,
        x: 0,
      }, '<')
      timelineChild.fromTo(menuButtonIconRef.current, {
        duration: MENU_BUTTON_ANIMATION_DURATION,
        y: -MENU_BUTTON_ICON_SIZE / 4,
      }, {
        duration: MENU_BUTTON_ANIMATION_DURATION,
        y: MENU_BUTTON_ICON_SIZE / 4,
      })
      timelineRef.current.add(timelineChild)
      timelineRef.current.play()
    } else {
      timelineRef.current = gsap.timeline()
      timelineRef.current.to(menuButtonTitleRef.current, {
        x: 0,
      })
      timelineRef.current.to(menuButtonIconRef.current, {
        opacity: 0,
        scaleY: 1,
        x: -MENU_BUTTON_ICON_SIZE,
      }, '<')
      timelineRef.current.play()
    }
  }, [isHovering])

  const handleClick = useCallback(() => {
    if (isOpen) {
      onMenuClose()
    } else {
      onMenuOpen()
    }
  }, [isOpen, onMenuClose, onMenuOpen])

  return (
    <div data-testid="menu-button">
      <Button className="flex items-center"
              onClick={handleClick}
              hovered={isOpen}
              {...props}>
      <span ref={menuButtonTitleRef}>
        {children}
      </span>
        <ChevronDownIcon role="img"
                         aria-label="Menu Button Arrow"
                         ref={menuButtonIconRef}
                         className="size-4 opacity-0"/>
      </Button>
    </div>
  )
}

MenuButton.displayName = 'MenuButton'

export default MenuButton
