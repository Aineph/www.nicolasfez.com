/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 02/03/2025.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from '@/components/ui/Link'
import clsx from 'clsx'

export const NAVBAR_BRAND_LOGO_SIZE = 50
export const NAVBAR_BRAND_LOGO_ANIMATION_DURATION = .5

export interface NavbarBrandProps {
  /**
   * Whether the navbar brand should be hovered by default
   */
  hovered?: boolean
}

/**
 * The logo that is displayed on the navbar
 *
 * @param hovered {boolean} Whether the navbar brand should be hovered by default
 *
 * @constructor
 */
const NavbarBrand: React.FunctionComponent<NavbarBrandProps> = ({ hovered = false }) => {
  const timelineRef = useRef<gsap.core.Timeline>(null)
  const logoNRef = useRef<HTMLImageElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const logoFRef = useRef<HTMLImageElement>(null)

  const [isHovering, setIsHovering] = useState(false)

  useGSAP(() => {
    if (timelineRef.current) {
      timelineRef.current.kill()
      timelineRef.current = null
    }
    if (isHovering) {
      timelineRef.current = gsap.timeline()
      timelineRef.current.to(logoRef.current, {
        duration: NAVBAR_BRAND_LOGO_ANIMATION_DURATION,
        scaleY: 0,
      })
      timelineRef.current.fromTo(logoNRef.current, {
        duration: NAVBAR_BRAND_LOGO_ANIMATION_DURATION,
        opacity: 0,
        x: NAVBAR_BRAND_LOGO_SIZE / 2,
      }, {
        duration: NAVBAR_BRAND_LOGO_ANIMATION_DURATION,
        opacity: 1,
        x: NAVBAR_BRAND_LOGO_SIZE / 3,
      })
      timelineRef.current.fromTo(logoFRef.current, {
        duration: NAVBAR_BRAND_LOGO_ANIMATION_DURATION,
        opacity: 0,
        x: -NAVBAR_BRAND_LOGO_SIZE / 2,
      }, {
        duration: NAVBAR_BRAND_LOGO_ANIMATION_DURATION,
        opacity: 1,
        x: -NAVBAR_BRAND_LOGO_SIZE / 3,
      }, '<')
      timelineRef.current.play()
    } else {
      timelineRef.current = gsap.timeline()
      timelineRef.current.to(logoNRef.current, {
        opacity: 0,
        x: NAVBAR_BRAND_LOGO_SIZE / 2,
      })
      timelineRef.current.to(logoFRef.current, {
        opacity: 0,
        x: -NAVBAR_BRAND_LOGO_SIZE / 2,
      }, '<')
      timelineRef.current.to(logoRef.current, {
        scaleY: 1,
      })
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
         data-testid="navbar-brand">
      <Link className={
        clsx(
          'relative h-16',
          'flex items-center',
        )
      }
            href="/">
        <Image ref={logoNRef}
               className={
                 clsx(
                   'w-auto h-8',
                   'dark:invert opacity-0',
                 )
               }
               src="/logo_n.svg"
               alt="N"
               width={0}
               height={0}
               priority/>
        <Image ref={logoRef}
               className={
                 clsx(
                   'w-auto h-12',
                   'dark:invert',
                 )
               }
               src="/logo.svg"
               alt="NF"
               width={0}
               height={0}
               priority/>
        <Image ref={logoFRef}
               className={
                 clsx(
                   'w-auto h-8',
                   'dark:invert opacity-0',
                 )
               }
               src="/logo_f.svg"
               alt="F"
               width={0}
               height={0}
               priority/>
      </Link>
    </div>
  )
}

NavbarBrand.displayName = 'NavbarBrand'

export default NavbarBrand
