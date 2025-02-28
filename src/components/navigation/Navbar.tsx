/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 26/02/2025.
 */

'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'

export default function Navbar() {
    const container = useRef<HTMLDivElement>(null)

    const [isVisible, setIsVisible] = useState(false)
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0)

    const onMouseEnter = useCallback(() => {
        setIsMouseOver(true)
    }, [])

    const onMouseLeave = useCallback(() => {
        setIsMouseOver(false)
    }, [])

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

    return (
        <nav ref={container}
             className="fixed top-0 right-0 w-full h-16 flex justify-between bg-background z-10"
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}>
            {isVisible && (
                <React.Fragment>
                    <ol id="navbar-brand"
                        className="flex justify-start items-center h-full"
                        data-testid="navbar-brand">
                        <li className="justify-start">
                            <Link href="/"
                                  replace>
                                <Image id="navigation-logo"
                                       className="dark:invert"
                                       src="/logo.svg"
                                       alt="NF"
                                       width={50}
                                       height={50}/>
                            </Link>
                        </li>
                    </ol>
                    <ol id="navbar-links"
                        className="flex justify-end items-center h-full"
                        data-testid="navbar-links">
                        <li className="justify-end mr-4">
                            <Link href="/about"
                                  replace>About</Link>
                        </li>
                        <li className="justify-end mr-4">
                            <Link href="/blog"
                                  replace>Blog</Link>
                        </li>
                        <li className="justify-end mr-4">
                            <Link href="/contact"
                                  replace>Contact</Link>
                        </li>
                        <li className="justify-end mr-4">
                            <Link href="/contact"
                                  replace>Locale</Link>
                        </li>
                        <li className="justify-end mr-4">
                            <Link href="/contact"
                                  replace>Mode</Link>
                        </li>
                    </ol>
                </React.Fragment>
            )}
        </nav>
    )
}