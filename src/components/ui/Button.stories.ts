/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 11/03/2025.
 */

import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Button from '@/components/ui/Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    className: '',
    hovered: false,
    primary: false,
    size: 'medium',
  },
}

export const Hovered: Story = {
  args: {
    children: 'Button',
    className: '',
    hovered: true,
    primary: false,
    size: 'medium',
  },
}

export const Primary: Story = {
  args: {
    children: 'Button',
    className: '',
    hovered: false,
    primary: true,
    size: 'medium',
  },
}

export const Large: Story = {
  args: {
    children: 'Button',
    className: '',
    hovered: false,
    primary: false,
    size: 'large',
  },
}

export const Small: Story = {
  args: {
    children: 'Button',
    className: '',
    hovered: false,
    primary: false,
    size: 'small',
  },
}
