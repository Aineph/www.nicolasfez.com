/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 06/03/2025.
 */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'

export const MENU_ITEM_ANIMATION_DURATION = .5
export const MENU_ITEM_ICON_START_POSITION = -10

export interface MenuItemProps {
  /**
   * The menu item children components
   */
  children?: React.ReactNode

  /**
   * Whether the item should be hovered by default
   */
  hovered?: boolean
}

/**
 * A menu item that can be selected inside a dropdown menu
 *
 * @param children {React.ReactNode} The menu item children components
 *
 * @param hovered {boolean} Whether the item should be hovered by default
 *
 * @constructor
 */
const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  children = null,
  hovered = false,
}) => {
  const timelineRef = useRef<gsap.core.Timeline>(null)
  const menuItemRef = useRef<HTMLDivElement>(null)
  const menuItemIconRef = useRef<SVGSVGElement>(null)

  const [isHovering, setIsHovering] = useState(false)

  useGSAP(() => {
    if (timelineRef.current) {
      timelineRef.current.kill()
      timelineRef.current = null
    }
    if (isHovering) {
      timelineRef.current = gsap.timeline()
      timelineRef.current.fromTo(menuItemIconRef.current, {
        opacity: 0,
        x: MENU_ITEM_ICON_START_POSITION,
      }, {
        duration: MENU_ITEM_ANIMATION_DURATION,
        opacity: 1,
        x: 0,
      })
      timelineRef.current.to(menuItemRef.current, {
        duration: MENU_ITEM_ANIMATION_DURATION,
        color: 'var(--primary)',
      }, '<')
      timelineRef.current.play()
    } else {
      timelineRef.current = gsap.timeline()
      timelineRef.current.to(menuItemIconRef.current, {
        opacity: 0,
        x: MENU_ITEM_ICON_START_POSITION,
      })
      timelineRef.current.to(menuItemRef.current, {
        duration: MENU_ITEM_ANIMATION_DURATION,
        color: 'var(--foreground)',
      }, '<')
      timelineRef.current.play()
    }
  }, [isHovering])

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
    <div ref={menuItemRef}
         role="menuitem"
         className={
           clsx(
             'cursor-pointer',
             'flex w-full items-center p-1',
           )
         }
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         onMouseUp={handleMouseLeave}
         data-testid="menu-item">
      <CheckIcon ref={menuItemIconRef}
                 className="mx-1 size-4 opacity-0"/>
      <div className="mx-1">
        {children}
      </div>
    </div>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
