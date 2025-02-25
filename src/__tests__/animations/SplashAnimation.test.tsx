/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 22/02/2025.
 */

import { beforeEach, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SplashAnimation from '@/components/animations/SplashAnimation'

let animationDuration: number = 0

vi.mock('gsap', () => ({
    gsap: {
        timeline: vi.fn().mockReturnValue({
            set: vi.fn(),
            to: vi.fn().mockImplementation((_targets, vars, position) => {
                if (vars?.duration && position !== '<') {
                    animationDuration += vars?.duration
                }
            }),
            play: vi.fn(),
            duration: vi.fn().mockReturnValue(0),
            kill: vi.fn(),
        }),
    },
}))

beforeEach(() => {
    animationDuration = 0
})

test('SplashAnimation should be defined', () => {
    render(<SplashAnimation/>)
    expect(screen.getByTestId('splash-animation')).toBeDefined()
})
test('SplashAnimation should contain 3 elements', () => {
    render(<SplashAnimation/>)
    expect(screen.getByTestId('splash-first-item')).toBeDefined()
    expect(screen.getByTestId('splash-second-item')).toBeDefined()
    expect(screen.getByTestId('splash-third-item')).toBeDefined()
})
test('SplashAnimation should contain 3 images', () => {
    render(<SplashAnimation/>)
    expect(screen.getAllByRole('img')).toHaveLength(3)
})
test('SplashAnimation should not be longer than 5 seconds', () => {
    render(<SplashAnimation/>)
    expect(animationDuration).toBeLessThan(5)
})
