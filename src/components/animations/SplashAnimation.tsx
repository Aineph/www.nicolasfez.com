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
    const container = useRef<HTMLDivElement>(null)

    const { contextSafe } = useGSAP({ scope: container })

    const createTimeline = contextSafe((repeat: boolean) => {
        const timeline = gsap.timeline({ paused: true, repeat: repeat ? -1 : 0 })

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
        timeline.set('#splash-animation', {
            visibility: 'hidden',
        })
        return timeline
    })

    useEffect(() => {
        const timeline = createTimeline(repeat)

        timeline.play()
        return () => {
            timeline.kill()
        }
    }, [repeat, createTimeline])

    return (
        <div ref={container}>
            <div id="splash-animation"
                 className="w-screen h-screen z-50 grid grid-cols-1 grid-rows-3"
                 data-testid="splash-animation">
                <Image
                    id="splash-first-item"
                    className="col-start-1 row-start-2 dark:invert"
                    src="/logo_n.svg"
                    alt="N"
                    fill={true}
                    data-testid="splash-first-item"/>
                <Image
                    id="splash-second-item"
                    className="col-start-1 row-start-2 dark:invert"
                    src="/logo.svg"
                    alt="NF"
                    fill={true}
                    data-testid="splash-second-item"/>
                <Image
                    id="splash-third-item"
                    className="col-start-1 row-start-2 dark:invert"
                    src="/logo_f.svg"
                    alt="F"
                    fill={true}
                    data-testid="splash-third-item"/>
            </div>
        </div>
    )
}
