/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 16/03/2025.
 */

import type { Meta, StoryObj } from '@storybook/react'
import MenuItem from '@/components/ui/menu/MenuItem'
import Menu from '@/components/ui/menu/Menu'

const meta = {
  title: 'Components/Menu/Item',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MenuItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuItem>
        MenuItem
      </MenuItem>
    </Menu>
  ),
}

export const Hovered: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuItem hovered>
        MenuItem
      </MenuItem>
    </Menu>
  ),
}
