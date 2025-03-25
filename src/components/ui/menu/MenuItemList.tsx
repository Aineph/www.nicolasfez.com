/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 06/03/2025.
 */
import React, { useContext, useEffect, useRef } from 'react'
import { MenuContext } from '@/components/ui/menu/Menu'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'

export const MENU_ITEMS_ANIMATION_DURATION = .5

export interface MenuItemListProps {
  /**
   * The menu item list children components
   */
  children?: React.ReactNode,
}

/**
 * The menu item list that is shown when the menu is opened
 *
 * @param children {React.ReactNode} The menu item list children components
 *
 * @constructor
 */
const MenuItemList: React.FunctionComponent<MenuItemListProps> = ({
  children = null,
}) => {
  const timelineRef = useRef<gsap.core.Timeline>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)
  const { isOpen } = useContext(MenuContext)

  const { contextSafe } = useGSAP()

  const handleMenuItemsOpen = contextSafe(() => {
    if (timelineRef.current) {
      timelineRef.current.kill()
      timelineRef.current = null
    }
    timelineRef.current = gsap.timeline()
    timelineRef.current.fromTo(menuItemsRef.current, {
      opacity: 0,
      scaleY: 0,
    }, {
      duration: MENU_ITEMS_ANIMATION_DURATION,
      opacity: 1,
      scaleY: 1,
    })
  })

  const handleMenuItemsClose = contextSafe(() => {
    if (timelineRef.current) {
      timelineRef.current.kill()
      timelineRef.current = null
    }
    timelineRef.current = gsap.timeline()
    timelineRef.current.to(menuItemsRef.current, {
      duration: MENU_ITEMS_ANIMATION_DURATION,
      opacity: 0,
      scaleY: 0,
    })
  })

  useEffect(() => {
    if (isOpen) {
      handleMenuItemsOpen()
    } else {
      handleMenuItemsClose()
    }
  }, [isOpen, handleMenuItemsOpen, handleMenuItemsClose])

  return (
    <div ref={menuItemsRef}
         className={
           clsx(
             'absolute w-auto origin-top scale-y-0',
             'flex flex-col py-1',
             'border border-amber-50 border-opacity-5',
             'rounded shadow-2xl bg-background opacity-0',
           )
         }
         data-testid="menu-item-list">
      {children}
    </div>
  )
}

MenuItemList.displayName = 'MenuItemList'

export default MenuItemList
