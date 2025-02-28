/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 02/03/2025.
 */

import {
  AnchorHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Link } from '@/i18n/routing'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function NavLink ({
  href = '#',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const [isHovering, setIsHovering] = useState(false)
  const container = useRef<HTMLDivElement>(null)

  const onMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  const { contextSafe } = useGSAP({ scope: container })

  const startHoveringAnimation = contextSafe(() => {
    gsap.to('.nav-link', {
      duration: .5,
      x: -5,
    })
    gsap.to('.nav-link-arrow', {
      duration: .5,
      opacity: 1,
      x: 0,
    })
  })

  const stopHoveringAnimation = contextSafe(() => {
    gsap.to('.nav-link', {
      duration: .5,
      x: 0,
    })
    gsap.to('.nav-link-arrow', {
      duration: .5,
      opacity: 0,
      x: -5,
    })
  })

  useEffect(() => {
    if (isHovering) {
      startHoveringAnimation()
    } else {
      stopHoveringAnimation()
    }
  }, [isHovering, startHoveringAnimation, stopHoveringAnimation])

  return (
    <div ref={container} className="flex flex-row items-center"
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}>
      <Link className="nav-link"
            href={href as string}
            {...props} />
      <ArrowRightIcon className="nav-link-arrow size-4"/>
    </div>
  )
}