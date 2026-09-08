import type { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonType } from "./index";
import React from "react";
import { ArgTypes, Stories } from '@storybook/blocks';

const meta: Meta<typeof Button> = {
  title: "Atoms/Form/Button",
  component: Button,
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
      description: 'Button text content',
      table: {
        category: 'Content',
      },
    },
    theme: {
      control: 'select',
      options: ['fill', 'outline', 'ghost', 'color'],
      description: 'Button variant style',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'fill' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'info', 'danger', 'neutral', 'warning'],
      description: 'Button color (works with COLOR theme)',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        category: 'States',
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    leftIcon: {
      control: false,
      description: 'Icon on the left side',
      table: {
        category: 'Content',
      },
    },
    rightIcon: {
      control: false,
      description: 'Icon on the right side',
      table: {
        category: 'Content',
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

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    theme: ButtonType.FILL,
    color: "primary",
    size: "md",
    disabled: false,
    fullWidth: false,
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    theme: ButtonType.OUTLINE,
    color: "primary",
    size: "md",
    disabled: false,
    fullWidth: false,
  },
};

export const Minimal: Story = {
  args: {
    children: "Button",
    theme: ButtonType.GHOST,
    color: "primary",
    size: "md",
    disabled: false,
    fullWidth: false,
  },
};
