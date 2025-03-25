/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 24/02/2025.
 */

import SplashAnimation from '@/components/animations/SplashAnimation'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Animations/SplashAnimation',
  component: SplashAnimation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SplashAnimation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    repeat: false,
  },
}

export const Looping: Story = {
  args: {
    repeat: true,
  },
}
