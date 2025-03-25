/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 16/03/2025.
 */

import type { Meta, StoryObj } from '@storybook/react'
import Navbar from '@/components/ui/navbar/Navbar'

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
