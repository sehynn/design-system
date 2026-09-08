import type { Meta, StoryObj } from "@storybook/react";
import Image from "./index";
import React from "react";
import { ArgTypes, Stories } from '@storybook/blocks';
import Button, { ButtonType } from "../Button";

const meta: Meta<typeof Image> = {
  title: "Atoms/Display/Image",
  component: Image,
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
    src: {
      control: 'text',
      description: 'Image path to display',
      table: {
        category: 'Content',
        defaultValue: { summary: '-' },
      },
    },
    actions: {
      control: false,
      description: 'The property will render "actions" when "selectMode" is not set to "true". Any valid React node',
      table: {
        category: 'Content',
        defaultValue: { summary: '-' },
      },
    },
    emptyText: {
      control: 'text',
      description: 'Empty state text for component',
      table: {
        category: 'Content',
        defaultValue: { summary: "'No image to display'" },
      },
    },
    title: {
      control: 'text',
      description: 'Will add a title to the top of Image atom. Any valid React node',
      table: {
        category: 'Content',
        defaultValue: { summary: '-' },
      },
    },
    tooltipTitle: {
      control: 'text',
      description: 'Title for "Tooltip". Possible values: string | ReactNode',
      table: {
        category: 'Content',
        defaultValue: { summary: '-' },
      },
    },
    withBorder: {
      control: 'boolean',
      description: 'Will add a border when set to "true"',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    selectMode: {
      control: 'boolean',
      description: 'The property will add a checkbox and an overlay over the image',
      table: {
        category: 'States',
        defaultValue: { summary: 'false' },
      },
    },
    checkboxProps: {
      control: false,
      description: 'Customize checkbox (will be rendered only when "selectMode" is set to "true")',
      table: {
        category: 'Others',
        defaultValue: { summary: '-' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional className',
      table: {
        category: 'Others',
      },
    },
    imageProps: {
      control: false,
      description: 'Customize image tag with this property',
      table: {
        category: 'Others',
      },
    },
    isValid: {
      control: 'boolean',
      description: 'Image atom also can be included in "Form" organism. It can be validated as other "Form" elements',
      table: {
        category: 'Validation',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Image>;

// Sample image URL
const sampleImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";

export const Default: Story = {
  args: {
    src: sampleImage,
    title: "Beautiful Landscape",
    withBorder: true,
    selectMode: false,
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button theme={ButtonType.FILL} color="primary" size="sm">
          View
        </Button>
        <Button theme={ButtonType.OUTLINE} color="primary" size="sm">
          Edit
        </Button>
      </div>
    ),
  },
};

export const WithoutActions: Story = {
  args: {
    src: sampleImage,
    title: "Simple Image",
    withBorder: true,
    selectMode: false,
  },
};

