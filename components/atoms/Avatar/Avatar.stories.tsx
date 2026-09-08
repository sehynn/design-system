import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./index";
import React from "react";
import { ArgTypes, Stories } from '@storybook/blocks';

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgTypes />
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The property will show first two letters in upper case. This will work when "src" or "icon" are not specified.',
      table: {
        category: 'Content',
        defaultValue: { summary: '-' },
      },
    },
    icon: {
      control: 'text',
      description: 'The property will show icon. This property will work when "src" is not specified.',
      table: {
        category: 'Content',
        defaultValue: { summary: '-' },
      },
    },
    src: {
      control: 'text',
      description: 'Background image source',
      table: {
        category: 'Content',
        defaultValue: { summary: '-' },
      },
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'info', 'danger', 'neutral'],
      description: 'Avatar color',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
      },
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Avatar shape',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'circle' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Avatar size',
      table: {
        category: 'Appearance',
        defaultValue: { summary: "'default'" },
      },
    },
    onClick: {
      control: false,
      description: 'Handle click event on avatar component',
      table: {
        category: 'Actions',
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional className',
      table: {
        category: 'Others',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    children: "JD",
    color: "primary",
    shape: "circle",
    size: "default",
  },
};

export const Square: Story = {
  args: {
    children: "AB",
    color: "info",
    shape: "square",
    size: "default",
  },
};

export const Circled: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    shape: "circle",
    size: "default",
  },
};

