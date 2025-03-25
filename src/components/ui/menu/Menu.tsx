/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 04/03/2025.
 */

import React, { useCallback, useEffect, useState } from 'react'

export type MenuProps = {
  /**
   * The menu children components
   */
  children?: React.ReactNode

  /**
   * Whether the menu should be opened by default
   */
  opened?: boolean
}

export type MenuContextType = {
  isHovering: boolean,
  isOpen: boolean,
  onMenuOpen: () => void,
  onMenuClose: () => void,
}

/**
 * Represents the state of the menu component
 */
export const MenuContext = React.createContext<MenuContextType>({
  isHovering: false,
  isOpen: false,
  onMenuOpen: () => {},
  onMenuClose: () => {},
})

/**
 * A dropdown menu that can be opened or closed by hovering or clicking
 * on its button
 *
 * @param children {React.ReactNode} The menu children components
 *
 * @param opened {boolean} Whether the menu should be opened by default
 *
 * @constructor
 */
const Menu: React.FunctionComponent<MenuProps> = ({
  children = null,
  opened = false,
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onMenuOpen = useCallback(() => {
    setIsHovering(true)
    setIsOpen(true)
  }, [])

  const onMenuClose = useCallback(() => {
    setIsHovering(false)
    setIsOpen(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    onMenuOpen()
  }, [onMenuOpen])

  const handleMouseLeave = useCallback(() => {
    onMenuClose()
  }, [onMenuClose])

  useEffect(() => {
    if (opened) {
      onMenuOpen()
    } else {
      onMenuClose()
    }
  }, [onMenuClose, onMenuOpen, opened])

  return (
    <MenuContext.Provider value={{
      isHovering,
      isOpen,
      onMenuOpen,
      onMenuClose,
    }}>
      <div role="menu"
           className="relative"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
           data-testid="menu">
        {children}
      </div>
    </MenuContext.Provider>
  )
}

Menu.displayName = 'Menu'

export default Menu
