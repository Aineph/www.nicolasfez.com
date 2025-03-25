/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 04/03/2025.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export const BUTTON_ANIMATION_DURATION = .1

export interface ButtonProps {
  /**
   * The button children components
   */
  children?: React.ReactNode,

  /**
   * The inherited HTML classes
   */
  className?: string,

  /**
   * Whether the button should be hovered by default
   */
  hovered?: boolean,

  /**
   * The action to be performed when the button is clicked
   */
  onClick?: () => void,

  /**
   * Whether the button is primary
   */
  primary?: boolean,

  /**
   * The size of the button
   */
  size?: 'small' | 'medium' | 'large',
}

/**
 * A button that performs a desired action when clicking
 *
 * @param children {React.ReactNode} The button children components
 *
 * @param className {string} The inherited HTML classes
 *
 * @param hovered {boolean} Whether the button should be hovered by default
 *
 * @param onClick {function} The action to be performed when the button is clicked
 *
 * @param primary {boolean} Whether the button is primary
 *
 * @param size {string} The size of the button
 *
 * @constructor
 */
const Button: React.FunctionComponent<ButtonProps> = ({
  children = null,
  className = '',
  hovered = false,
  onClick = () => {},
  primary = false,
  size = 'medium',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [isHovering, setIsHovering] = useState(false)

  const { contextSafe } = useGSAP({ dependencies: [onClick] })

  useGSAP(() => {
    if (isHovering) {
      gsap.to(buttonRef.current, {
        backgroundColor: primary ? 'var(--transparent)' : '',
        color: 'var(--primary)',
        duration: BUTTON_ANIMATION_DURATION,
        ease: 'power3.inOut',
      })
    } else {
      gsap.to(buttonRef.current, {
        backgroundColor: primary ? 'var(--primary)' : '',
        color: 'var(--foreground)',
        duration: BUTTON_ANIMATION_DURATION,
        ease: 'power3.inOut',
      })
    }
  }, [isHovering, primary])

  const handleClick = contextSafe(() => {
    onClick()
    gsap.fromTo(buttonRef.current, {
      scale: 1,
    }, {
      duration: BUTTON_ANIMATION_DURATION,
      repeat: 1,
      scale: 1.1,
      yoyo: true,
    })
  })

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
    <button ref={buttonRef}
            role="button"
            className={clsx(
              className,
              'transition-colors',
              'cursor-pointer',
              'relative p-2',
              {
                'border-primary border-2 rounded': primary,
                'bg-primary': primary,
                'shadow': primary,
              },
              {
                'text-sm': size === 'small',
                'text-base': size === 'medium',
                'text-lg': size === 'large',
              },
            )}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseLeave}
            data-testid="button">
      {children}
    </button>
  )
}

Button.displayName = 'Button'

export default Button
