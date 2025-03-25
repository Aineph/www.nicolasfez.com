/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 26/02/2025.
 */

'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import NavbarThemeSwitcher from '@/components/ui/navbar/NavbarThemeSwitcher'
import NavbarBrand from '@/components/ui/navbar/NavbarBrand'
import NavbarLinkList from '@/components/ui/navbar/NavbarLinkList'
import useDisclosure from '@/hooks/useDisclosure'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import clsx from 'clsx'
import { usePathname } from '@/i18n/routing'

const Navbar: React.FunctionComponent = () => {
  const navbarRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()

  const { isOpen, onClose, onToggle } = useDisclosure()

  const [isMouseOver, setIsMouseOver] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsMouseOver(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsMouseOver(false)
  }, [])

  useGSAP(() => {
    if (isVisible) {
      gsap.to(navbarRef.current, {
        duration: .5,
        opacity: 1,
      })
    } else {
      gsap.to(navbarRef.current, {
        duration: .5,
        opacity: 0,
      })
    }
  }, [isVisible])

  useEffect(() => {
    const scrollEventListener = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', scrollEventListener)

    return () => {
      window.removeEventListener('scroll', scrollEventListener)
    }
  }, [])

  useEffect(() => {
    if (isMouseOver || scrollPosition == 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isMouseOver, scrollPosition])

  useEffect(() => {
    onClose()
  }, [onClose, pathname])

  return (
    <nav ref={navbarRef}
         role="navigation"
         className={
           clsx(
             'fixed top-0 right-0 left-0 h-16',
             'flex flex-col',
             'bg-navbar',
           )
         }
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         data-testid="navbar">
      <div className={
        clsx(
          'flex flex-row justify-between items-center',
          'px-4',
        )
      }>
        <Button className="sm:hidden"
                onClick={onToggle}>
          {isOpen ? (
            <XMarkIcon className="size-6"/>
          ) : (
            <Bars3Icon className="size-6"/>
          )}
        </Button>
        <NavbarBrand/>
        <NavbarLinkList className="sm:flex ml-auto items-center h-full hidden"
                        expanded={true}/>
        <NavbarThemeSwitcher/>
      </div>
      <NavbarLinkList
        className={
          clsx(
            'w-full',
            'flex flex-col',
            'sm:hidden',
            'scale-y-0 bg-inherit px-4',
          )
        }
        expanded={isOpen}/>
    </nav>
  )
}

Navbar.displayName = 'Navbar'

export default Navbar
