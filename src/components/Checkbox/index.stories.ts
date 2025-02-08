import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Checkbox } from ".";

const meta = {
  title: "components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const NoCheck: Story = {
  args: {
    checked: false,
  },
};

export const Default: Story = {};
