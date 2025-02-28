/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 26/02/2025.
 */

'use client'

import React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ThemeSwitcher from '@/components/navigation/ThemeSwitcher'
import LocaleSwitcher from '@/components/navigation/LocaleSwitcher'
import NavLink from '@/components/navigation/NavLink'
import NavBrand from '@/components/navigation/NavBrand'

export default function Navbar () {
  const container = useRef<HTMLDivElement>(null)

  const [isMouseOver, setIsMouseOver] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  const onMouseEnter = useCallback(() => {
    setIsMouseOver(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsMouseOver(false)
  }, [])

  const { contextSafe } = useGSAP()

  const showNavbar = contextSafe(() => {
    gsap.to('#navbar', {
      duration: .5,
      opacity: 1,
    })
  })

  const hideNavbar = contextSafe(() => {
    gsap.to('#navbar', {
      duration: .5,
      opacity: 0,
    })
  })

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
      showNavbar()
    } else {
      hideNavbar()
    }
  }, [isMouseOver, scrollPosition, showNavbar, hideNavbar])

  return (
    <nav id="navbar"
         role="navigation"
         ref={container}
         className="fixed top-0 right-0 w-full h-16 flex justify-between items-center px-4 bg-navbar"
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
         data-testid="navbar">
      <NavBrand/>
      <ol id="navbar-links"
          className="flex justify-end items-center h-full"
          data-testid="navbar-links">
        <li className="justify-end mr-4">
          <NavLink>About</NavLink>
        </li>
        <li className="justify-end mr-4">
          <NavLink>Blog</NavLink>
        </li>
        <li className="justify-end mr-4">
          <NavLink>Contact</NavLink>
        </li>
        <li className="justify-end mr-4">
          <LocaleSwitcher/>
        </li>
        <li className="justify-end mr-4">
          <ThemeSwitcher/>
        </li>
      </ol>
    </nav>
  )
}