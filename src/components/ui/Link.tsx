/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 11/03/2025.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link as NextLink } from '@/i18n/routing'
import { clsx } from 'clsx'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLocale } from 'next-intl'

export const LINK_ANIMATION_DURATION = .1

export interface LinkProps {
  /**
   * The link children components
   */
  children?: React.ReactNode,

  /**
   * The inherited HTML classes
   */
  className?: string,

  /**
   * Whether the link should be hovered by default
   */
  hovered?: boolean

  /**
   * Where the link should redirect
   */
  href?: string,

  /**
   * The size of the link
   */
  size?: 'small' | 'medium' | 'large',

  /**
   * The target of the link
   */
  target?: string
}

/**
 * A link that navigates to another page
 *
 * @param children {React.ReactNode} The link children components
 *
 * @param className {string} The inherited HTML classes
 *
 * @param hovered {boolean} Whether the link should be hovered by default
 *
 * @param href {string} Where the link should redirect
 *
 * @param size {string} The size of the link
 *
 * @param target {string} The target of the link
 *
 * @constructor
 */
const Link: React.FunctionComponent<LinkProps> = (
  {
    children = null,
    className = '',
    hovered = false,
    href = '#',
    size = 'medium',
    target = '_self',
  }) => {
  const linkRef = useRef<HTMLAnchorElement>(null)

  const [isHovering, setIsHovering] = useState(false)

  const locale = useLocale()

  useGSAP(() => {
    if (isHovering) {
      gsap.to(linkRef.current, {
        color: `var(--primary)`,
        duration: LINK_ANIMATION_DURATION,
        ease: 'power3.inOut',
      })
    } else {
      gsap.to(linkRef.current, {
        color: 'var(--foreground)',
        duration: LINK_ANIMATION_DURATION,
        ease: 'power3.inOut',
      })
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
    <NextLink ref={linkRef}
              role="link"
              href={href}
              target={target}
              className={clsx(
                className,
                'transition-colors',
                'cursor-pointer',
                'relative',
                {
                  'text-sm': size === 'small',
                  'text-base': size === 'medium',
                  'text-lg': size === 'large',
                },
              )}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseLeave}
              locale={locale}
              data-testid="link">
      {children}
    </NextLink>
  )
}

Link.displayName = 'Link'

export default Link
