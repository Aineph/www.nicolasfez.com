/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 02/03/2025.
 */

import Link from 'next/link'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function NavBrand () {
  const [isHovering, setIsHovering] = useState(false)

  const container = useRef<HTMLDivElement>(null)

  const onMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  const { contextSafe } = useGSAP({ scope: container })

  const createTimeline = contextSafe(() => {
    const timeline = gsap.timeline({ repeat: -1 })

    timeline.to('#navigation-logo', {
      duration: .5,
      scale: 1.2,
    }, '>')
    timeline.to('#navigation-logo', {
      duration: 1,
      scale: 1,
    }, '>')
    return timeline
  })

  useEffect(() => {
    if (isHovering) {
      const timeline = createTimeline()

      timeline.play()
      return () => {
        timeline.seek(0)
        timeline.kill()
      }
    }
  }, [isHovering, createTimeline])

  return (
    <div ref={container}>
      <Link
        href="/"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <Image id="navigation-logo"
               className="dark:invert"
               src="/logo.svg"
               alt="NF"
               width={50}
               height={50}/>
      </Link>
    </div>
  )
}