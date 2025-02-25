import SplashAnimation from '@/components/animations/SplashAnimation'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Animations/SplashAnimation',
    component: SplashAnimation,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        repeat: {
            control: 'boolean',
            description: 'Whether the animation should loop',
        },
    },
    args: {},
} satisfies Meta<typeof SplashAnimation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
