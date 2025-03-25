/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 02/03/2025.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link, { LinkProps } from '@/components/ui/Link'

export const NAVBAR_LINK_ICON_SIZE = 5
export const NAVBAR_LINK_ANIMATION_DURATION = .5

export interface NavbarLinkProps extends LinkProps {
  /**
   * The navbar link children components
   */
  children?: React.ReactNode,

  /**
   * Whether the link should be hovered by default
   */
  hovered?: boolean

  /**
   * Where the link should redirect
   */
  href?: string,
}

/**
 * A link that is displayed on the navbar
 *
 * @param children {React.ReactNode} The navbar link children components
 *
 * @param hovered {boolean} Whether the link should be hovered by default
 *
 * @param href {string} Where the link should redirect
 *
 * @param props {object} The default link properties
 *
 * @constructor
 */
const NavbarLink: React.FunctionComponent<NavbarLinkProps> = ({
  children = null,
  hovered = false,
  href = '#',
  ...props
}) => {
  const timelineRef = useRef<gsap.core.Timeline>(null)
  const navbarLinkTitleRef = useRef<HTMLDivElement>(null)
  const navbarLinkIconRef = useRef<SVGSVGElement>(null)

  const [isHovering, setIsHovering] = useState(false)

  useGSAP(() => {
    if (timelineRef.current) {
      timelineRef.current.kill()
      timelineRef.current = null
    }
    if (isHovering) {
      const timelineChild = gsap.timeline({ repeat: -1, yoyo: true })

      timelineRef.current = gsap.timeline()
      timelineRef.current.to(navbarLinkTitleRef.current, {
        duration: NAVBAR_LINK_ANIMATION_DURATION,
        x: -NAVBAR_LINK_ICON_SIZE,
      }, '<')
      timelineRef.current.fromTo(navbarLinkIconRef.current, {
        duration: NAVBAR_LINK_ANIMATION_DURATION,
        opacity: 0,
        x: -NAVBAR_LINK_ICON_SIZE,
      }, {
        duration: NAVBAR_LINK_ANIMATION_DURATION,
        opacity: 1,
        x: 0,
      }, '<')
      timelineChild.fromTo(navbarLinkIconRef.current, {
        duration: NAVBAR_LINK_ANIMATION_DURATION,
        x: 0,
      }, {
        duration: NAVBAR_LINK_ANIMATION_DURATION,
        x: -NAVBAR_LINK_ICON_SIZE,
      })
      timelineRef.current.add(timelineChild)
      timelineRef.current.play()
    } else {
      timelineRef.current = gsap.timeline()
      timelineRef.current.to(navbarLinkTitleRef.current, {
        x: 0,
      })
      timelineRef.current.to(navbarLinkIconRef.current, {
        opacity: 0,
        x: -NAVBAR_LINK_ICON_SIZE,
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
    <div onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         onMouseUp={handleMouseLeave}
         data-testid="navbar-link">
      <Link href={href}
            hovered={hovered}
            {...props}
            className="flex items-center p-2">
        <div ref={navbarLinkTitleRef} data-testid="navbar-link-title">
          {children}
        </div>
        <ArrowRightIcon role="img"
                        aria-label="Navigation Link Arrow"
                        ref={navbarLinkIconRef}
                        className="size-4 opacity-0"/>
      </Link>
    </div>
  )
}

NavbarLink.displayName = 'NavbarLink'

export default NavbarLink
