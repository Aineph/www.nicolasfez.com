/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 12/03/2025.
 */

import type { Meta, StoryObj } from '@storybook/react'

import Link from '@/components/ui/Link'

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Link',
    className: '',
    hovered: false,
    href: '#',
    size: 'medium',
    target: '_self',
  },
}

export const Hovered: Story = {
  args: {
    children: 'Link',
    className: '',
    hovered: true,
    href: '#',
    size: 'medium',
    target: '_self',
  },
}

export const Large: Story = {
  args: {
    children: 'Link',
    className: '',
    hovered: false,
    href: '#',
    size: 'large',
    target: '_self',
  },
}

export const Small: Story = {
  args: {
    children: 'Link',
    className: '',
    hovered: false,
    href: '#',
    size: 'small',
    target: '_self',
  },
}
