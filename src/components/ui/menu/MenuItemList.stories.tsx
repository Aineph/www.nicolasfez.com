/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 16/03/2025.
 */

import type { Meta, StoryObj } from '@storybook/react'
import MenuItemList from '@/components/ui/menu/MenuItemList'
import Menu from '@/components/ui/menu/Menu'
import MenuItem from '@/components/ui/menu/MenuItem'

const meta = {
  title: 'Components/Menu/ItemList',
  component: MenuItemList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MenuItemList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuItemList>
        <MenuItem>MenuItem #1</MenuItem>
      </MenuItemList>
      <MenuItemList>
        <MenuItem>MenuItem #2</MenuItem>
      </MenuItemList>
      <MenuItemList>
        <MenuItem>MenuItem #3</MenuItem>
      </MenuItemList>
    </Menu>
  ),
}

export const Opened: Story = {
  args: {},
  render: () => (
    <Menu opened>
      <MenuItemList>
        <MenuItem>MenuItem #1</MenuItem>
        <MenuItem>MenuItem #2</MenuItem>
        <MenuItem>MenuItem #3</MenuItem>
      </MenuItemList>
    </Menu>
  ),
}
