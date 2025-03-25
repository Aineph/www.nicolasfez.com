/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 15/03/2025.
 */

import type { Meta, StoryObj } from '@storybook/react'
import NavbarLocaleSwitcher from '@/components/ui/navbar/NavbarLocaleSwitcher'

const meta = {
  title: 'Components/Navbar/LocaleSwitcher',
  component: NavbarLocaleSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NavbarLocaleSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    opened: false,
  },
}

export const Opened: Story = {
  args: {
    opened: true,
  },
}
