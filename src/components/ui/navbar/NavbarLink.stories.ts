/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 15/03/2025.
 */

import type { Meta, StoryObj } from '@storybook/react'
import NavbarLink from '@/components/ui/navbar/NavbarLink'

const meta = {
  title: 'Components/Navbar/Link',
  component: NavbarLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NavbarLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'NavbarLink',
    className: '',
    hovered: false,
    href: '#',
    size: 'medium',
    target: '_self',
  },
}

export const Hovered: Story = {
  args: {
    children: 'NavbarLink',
    className: '',
    hovered: true,
    href: '#',
    size: 'medium',
    target: '_self',
  },
}

export const Large: Story = {
  args: {
    children: 'NavbarLink',
    className: '',
    hovered: false,
    href: '#',
    size: 'large',
    target: '_self',
  },
}

export const Small: Story = {
  args: {
    children: 'NavbarLink',
    className: '',
    hovered: false,
    href: '#',
    size: 'small',
    target: '_self',
  },
}
