/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 16/03/2025.
 */

import type { Meta, StoryObj } from '@storybook/react'
import Menu from '@/components/ui/menu/Menu'
import MenuButton from '@/components/ui/menu/MenuButton'
import MenuItemList from '@/components/ui/menu/MenuItemList'
import MenuItem from '@/components/ui/menu/MenuItem'

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuButton>
        MenuButton
      </MenuButton>
      <MenuItemList>
        <MenuItem>
          MenuItem #1
        </MenuItem>
        <MenuItem>
          MenuItem #2
        </MenuItem>
        <MenuItem>
          MenuItem #3
        </MenuItem>
      </MenuItemList>
    </Menu>
  ),
  args: {},
}

export const Opened: Story = {
  render: () => (
    <Menu opened>
      <MenuButton>
        MenuButton
      </MenuButton>
      <MenuItemList>
        <MenuItem>
          MenuItem #1
        </MenuItem>
        <MenuItem>
          MenuItem #2
        </MenuItem>
        <MenuItem>
          MenuItem #3
        </MenuItem>
      </MenuItemList>
    </Menu>
  ),
  args: {},
}
