/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 10/03/2025.
 */

import React, { useEffect, useRef, useState } from 'react'
import NavbarLink from '@/components/ui/navbar/NavbarLink'
import NavbarLocaleSwitcher from '@/components/ui/navbar/NavbarLocaleSwitcher'
import { SECTIONS_LIST } from '@/constants/sections'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'

export const NAVBAR_LINK_LIST_ANIMATION_DURATION = .5

interface NavbarLinkListProps {
  /**
   * The navbar link list children components
   */
  children?: React.ReactNode,

  /**
   * The inherited HTML classes
   */
  className?: string,

  /**
   * Whether the link list is expanded
   */
  expanded?: boolean
}

/**
 * A list of links displayed on the navbar
 *
 * @param children {React.ReactNode} The navbar link list children components
 *
 * @param className {string} The inherited HTML classes
 *
 * @param expanded {boolean} Whether the link list is expanded
 *
 * @constructor
 */
const NavbarLinkList: React.FunctionComponent<NavbarLinkListProps> = ({
  children = null,
  className = '',
  expanded = false,
}) => {
  const navbarLinkListRef = useRef<HTMLUListElement>(null)
  const t = useTranslations('Sections')

  const [isExpanded, setIsExpanded] = useState(false)

  useGSAP(() => {
    if (isExpanded) {
      gsap.fromTo(navbarLinkListRef.current, {
        scaleY: 0,
      }, {
        duration: NAVBAR_LINK_LIST_ANIMATION_DURATION,
        scaleY: 1,
      })
    } else {
      gsap.fromTo(navbarLinkListRef.current, {
        scaleY: 1,
      }, {
        duration: NAVBAR_LINK_LIST_ANIMATION_DURATION,
        scaleY: 0,
      })
    }
  }, [isExpanded])

  useEffect(() => {
    setIsExpanded(expanded)
  }, [expanded])

  return (
    <ul role="menu"
        ref={navbarLinkListRef}
        className={
          clsx(
            className,
            'origin-top scale-y-0',
          )
        }
        data-testid="navbar-link-list">
      {SECTIONS_LIST.map(({ name, route }) => (
        <li key={name}>
          <NavbarLink href={route}>{t(name)}</NavbarLink>
        </li>
      ))}
      <li>
        <NavbarLocaleSwitcher/>
      </li>
      {children}
    </ul>
  )
}

NavbarLinkList.displayName = 'NavbarLinkList'

export default NavbarLinkList
