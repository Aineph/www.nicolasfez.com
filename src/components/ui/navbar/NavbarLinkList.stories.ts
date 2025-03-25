/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 16/03/2025.
 */

import type { Meta, StoryObj } from '@storybook/react'
import NavbarLinkList from '@/components/ui/navbar/NavbarLinkList'

const meta = {
  title: 'Components/Navbar/LinkList',
  component: NavbarLinkList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NavbarLinkList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: null,
    className: '',
    expanded: false,
  },
}

export const Expanded: Story = {
  args: {
    children: null,
    className: '',
    expanded: true,
  },
}
