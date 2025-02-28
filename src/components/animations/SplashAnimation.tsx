/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 21/02/2025.
 */

'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'

export const SPLASH_ANIMATION_DURATION = 1
export const SPLASH_ANIMATION_SCALE_SIZE = .6

export interface SplashAnimationProps {
    /**
     * Whether the animation should loop
     */
    repeat?: boolean
}

/**
 * Animates the application logo on the whole screen
 */
export default function SplashAnimation({ repeat = false }: SplashAnimationProps): React.ReactNode {
    const { contextSafe } = useGSAP()

    const createTimeline = contextSafe((repeat: boolean) => {
        const timeline = gsap.timeline({ paused: true, repeat: repeat ? -1 : 0 })

        timeline.set('#splash-animation-container', {
            opacity: 1,
            visibility: 'visible',
        })
        timeline.set('#splash-animation', {
            visibility: 'visible',
        })
        timeline.set('#splash-first-item', {
            objectFit: 'scale-down',
            opacity: 0,
            scale: SPLASH_ANIMATION_SCALE_SIZE / 2,
            translateY: -100,
        })
        timeline.set('#splash-second-item', {
            objectFit: 'scale-down',
            opacity: 0,
            scaleX: SPLASH_ANIMATION_SCALE_SIZE,
            scaleY: 0,
        })
        timeline.set('#splash-third-item', {
            objectFit: 'scale-down',
            opacity: 0,
            scale: SPLASH_ANIMATION_SCALE_SIZE / 2,
            translateY: 100,
        })
        timeline.to('#splash-first-item', {
            duration: SPLASH_ANIMATION_DURATION,
            ease: 'expo.inOut',
            opacity: 1,
            translateX: -100,
        })
        timeline.to('#splash-third-item', {
            duration: SPLASH_ANIMATION_DURATION,
            ease: 'expo.inOut',
            opacity: 1,
            translateX: 100,
        }, '<')
        timeline.to('#splash-first-item', {
            duration: SPLASH_ANIMATION_DURATION,
            ease: 'expo.inOut',
            opacity: 1,
            translateY: 0,
        })
        timeline.to('#splash-third-item', {
            duration: SPLASH_ANIMATION_DURATION,
            ease: 'expo.inOut',
            opacity: 1,
            translateY: 0,
        }, '<')
        timeline.to('#splash-first-item', {
            duration: SPLASH_ANIMATION_DURATION,
            ease: 'elastic.inOut',
            translateX: 0,
            opacity: 0,
        }, '>')
        timeline.to('#splash-third-item', {
            duration: SPLASH_ANIMATION_DURATION,
            ease: 'elastic.inOut',
            translateX: 0,
            opacity: 0,
        }, '<')
        timeline.to('#splash-second-item', {
            duration: SPLASH_ANIMATION_DURATION,
            ease: 'elastic.inOut',
            opacity: 1,
            scaleY: SPLASH_ANIMATION_SCALE_SIZE,
        }, '<')
        timeline.to('#splash-second-item', {
            duration: SPLASH_ANIMATION_DURATION,
            ease: 'expo.inOut',
            opacity: 0,
            scaleY: 0,
        }, '>')
        timeline.to('#splash-animation-container', {
            duration: SPLASH_ANIMATION_DURATION,
            ease: 'expo.inOut',
            opacity: 0,
        }, '<')
        timeline.set('#splash-animation-container', {
            visibility: 'hidden',
        })
        timeline.set('#splash-animation', {
            visibility: 'hidden',
        })
        return timeline
    })

    useEffect(() => {
        const timeline = createTimeline(repeat)

        window.addEventListener('scroll', (event) => {
            event.preventDefault();
        })

        timeline.play()
        return () => {
            timeline.kill()
        }
    }, [repeat, createTimeline])

    return (
        <div
            id="splash-animation-container"
            className="fixed top-0 left-0 z-50 opacity-1">
            <div id="splash-animation"
                 className="w-screen h-screen grid grid-cols-1 grid-rows-3 bg-background"
                 data-testid="splash-animation">
                <Image
                    id="splash-first-item"
                    className="col-start-1 row-start-2 opacity-0 dark:invert"
                    src="/logo_n.svg"
                    alt="N"
                    fill
                    data-testid="splash-first-item"/>
                <Image
                    id="splash-second-item"
                    className="col-start-1 row-start-2 opacity-0 dark:invert"
                    src="/logo.svg"
                    alt="NF"
                    fill
                    data-testid="splash-second-item"/>
                <Image
                    id="splash-third-item"
                    className="col-start-1 row-start-2 opacity-0 dark:invert"
                    src="/logo_f.svg"
                    alt="F"
                    fill
                    data-testid="splash-third-item"/>
            </div>
        </div>
    )
}
