/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 15/03/2025.
 */

import type { Meta, StoryObj } from '@storybook/react'
import NavbarThemeSwitcher from '@/components/ui/navbar/NavbarThemeSwitcher'

const meta = {
  title: 'Components/Navbar/ThemeSwitcher',
  component: NavbarThemeSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NavbarThemeSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hovered: false,
  },
}

export const Hovered: Story = {
  args: {
    hovered: true,
  },
}
