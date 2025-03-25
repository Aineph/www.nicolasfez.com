/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 16/03/2025.
 */

import type { Meta, StoryObj } from '@storybook/react'
import MenuButton from '@/components/ui/menu/MenuButton'
import Menu from '@/components/ui/menu/Menu'

const meta = {
  title: 'Components/Menu/Button',
  component: MenuButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MenuButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuButton>
        MenuButton
      </MenuButton>
    </Menu>
  ),
}

export const Hovered: Story = {
  args: {},
  render: () => (
    <Menu opened>
      <MenuButton>
        MenuButton
      </MenuButton>
    </Menu>
  ),
}

export const Primary: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuButton primary>
        MenuButton
      </MenuButton>
    </Menu>
  ),
}

export const PrimaryHovered: Story = {
  args: {},
  render: () => (
    <Menu opened>
      <MenuButton primary>
        MenuButton
      </MenuButton>
    </Menu>
  ),
}
