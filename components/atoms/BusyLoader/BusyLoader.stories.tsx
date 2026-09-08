import type { Meta, StoryObj } from "@storybook/react";
import BusyLoader from "./index";
import React from "react";
import { ArgTypes, Stories } from '@storybook/blocks';

const meta: Meta<typeof BusyLoader> = {
  title: "Atoms/Feedback/BusyLoader",
  component: BusyLoader,
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
    isBusy: {
      control: 'boolean',
      description: 'Show loader',
      table: {
        category: 'States',
        defaultValue: { summary: 'true' },
      },
    },
    spinnerSize: {
      control: 'select',
      options: ['small', 'medium', 'big'],
      description: 'Loader size </br> Possible values: small | medium | big',
      table: {
        category: 'Appearance',
        defaultValue: { summary: "'small'" },
      },
    },
    type: {
      control: 'select',
      options: ['spinner', 'bubbles', 'bar'],
      description: 'Loader available type/style </br> Possible values: spinner | bubbles | bar',
      table: {
        category: 'Appearance',
        defaultValue: { summary: "'spinner'" },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'info', 'danger', 'neutral'],
      description: 'Loader color </br> Possible values: primary | info | danger | neutral',
      table: {
        category: 'Appearance',
        defaultValue: { summary: "'primary'" },
      },
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed </br> Possible values: slow | normal | fast',
      table: {
        category: 'Appearance',
        defaultValue: { summary: "'normal'" },
      },
    },
    children: {
      control: 'text',
      description: 'Any valid React node. Renders when "isBusy" is set to false',
      table: {
        category: 'Content',
        defaultValue: { summary: '-' },
      },
    },
    loadingText: {
      control: 'text',
      description: 'Show provided text when loading, it will be ignored in the type of bar',
      table: {
        category: 'Content',
        defaultValue: { summary: '-' },
      },
    },
    className: {
      control: 'text',
      description: 'Any custom class name',
      table: {
        category: 'Others',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof BusyLoader>;

export const Spinner: Story = {
  args: {
    isBusy: true,
    spinnerSize: "medium",
    type: "spinner",
    color: "primary",
    speed: "normal",
    loadingText: "Loading...",
  },
};

export const Bubbles: Story = {
  args: {
    isBusy: true,
    spinnerSize: "medium",
    type: "bubbles",
    color: "primary",
    speed: "normal",
    loadingText: "Loading...",
  },
};

export const Bar: Story = {
  args: {
    isBusy: true,
    spinnerSize: "medium",
    type: "bar",
    color: "primary",
    speed: "normal",
    loadingText: "Loading...",
  },
};

