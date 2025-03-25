/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 21/02/2025.
 */

'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'

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
 *
 * @param repeat {boolean} Whether the animation should loop
 *
 * @constructor
 */
const SplashAnimation: React.FunctionComponent<SplashAnimationProps> = ({ repeat = false }) => {
  const animationContainerRef = useRef<HTMLDivElement>(null)
  const logoNRef = useRef<HTMLImageElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const logoFRef = useRef<HTMLImageElement>(null)

  const { contextSafe } = useGSAP()

  const createTimeline = contextSafe((repeat: boolean) => {
    const timeline = gsap.timeline({ paused: true, repeat: repeat ? -1 : 0 })

    timeline.set(animationContainerRef.current, {
      visibility: 'visible',
    })
    timeline.set(logoNRef.current, {
      objectFit: 'scale-down',
      opacity: 0,
      scale: SPLASH_ANIMATION_SCALE_SIZE / 2,
      translateY: -100,
    })
    timeline.set(logoRef.current, {
      objectFit: 'scale-down',
      opacity: 0,
      scaleX: SPLASH_ANIMATION_SCALE_SIZE,
      scaleY: 0,
    })
    timeline.set(logoFRef.current, {
      objectFit: 'scale-down',
      opacity: 0,
      scale: SPLASH_ANIMATION_SCALE_SIZE / 2,
      translateY: 100,
    })
    timeline.to(logoNRef.current, {
      duration: SPLASH_ANIMATION_DURATION,
      ease: 'expo.inOut',
      opacity: 1,
      translateX: -100,
    })
    timeline.to(logoFRef.current, {
      duration: SPLASH_ANIMATION_DURATION,
      ease: 'expo.inOut',
      opacity: 1,
      translateX: 100,
    }, '<')
    timeline.to(logoNRef.current, {
      duration: SPLASH_ANIMATION_DURATION,
      ease: 'expo.inOut',
      opacity: 1,
      translateY: 0,
    })
    timeline.to(logoFRef.current, {
      duration: SPLASH_ANIMATION_DURATION,
      ease: 'expo.inOut',
      opacity: 1,
      translateY: 0,
    }, '<')
    timeline.to(logoNRef.current, {
      duration: SPLASH_ANIMATION_DURATION,
      ease: 'elastic.inOut',
      translateX: 0,
      opacity: 0,
    }, '>')
    timeline.to(logoFRef.current, {
      duration: SPLASH_ANIMATION_DURATION,
      ease: 'elastic.inOut',
      translateX: 0,
      opacity: 0,
    }, '<')
    timeline.to(logoRef.current, {
      duration: SPLASH_ANIMATION_DURATION,
      ease: 'elastic.inOut',
      opacity: 1,
      scaleY: SPLASH_ANIMATION_SCALE_SIZE,
    }, '<')
    timeline.to(logoRef.current, {
      duration: SPLASH_ANIMATION_DURATION,
      ease: 'expo.inOut',
      opacity: 0,
      scaleY: 0,
    }, '>')
    timeline.to(animationContainerRef.current, {
      duration: SPLASH_ANIMATION_DURATION,
      opacity: 0,
    }, '<')
    timeline.set(animationContainerRef.current, {
      visibility: 'hidden',
    })
    return timeline
  })

  useEffect(() => {
    const timeline = createTimeline(repeat)

    window.addEventListener('scroll', (event) => {
      event.preventDefault()
    })

    timeline.play()
    return () => {
      timeline.seek(0)
      timeline.kill()
    }
  }, [repeat, createTimeline])

  return (
    <div ref={animationContainerRef}
         className={
           clsx(
             'fixed top-0 left-0 w-screen h-screen z-50',
             'grid grid-cols-1 grid-rows-1',
             'bg-background opacity-1',
           )
         }
         data-testid="splash-animation">
      <Image ref={logoNRef}
             className={
               clsx(
                 'col-start-1 row-start-1',
                 'dark:invert opacity-0',
               )
             }
             src="/logo_n.svg"
             alt="N"
             fill
             priority/>
      <Image ref={logoRef}
             className={
               clsx(
                 'col-start-1 row-start-1',
                 'dark:invert opacity-0',
               )
             }
             src="/logo.svg"
             alt="NF"
             fill
             priority/>
      <Image ref={logoFRef}
             className={
               clsx(
                 'col-start-1 row-start-1',
                 'dark:invert opacity-0',
               )
             }
             src="/logo_f.svg"
             alt="F"
             fill
             priority/>
    </div>
  )
}

SplashAnimation.displayName = 'SplashAnimation'

export default SplashAnimation
