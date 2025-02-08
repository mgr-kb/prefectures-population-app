import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { InputText } from ".";

const meta = {
  title: "components/InputText",
  component: InputText,
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SetPlaceholder: Story = {
  args: {
    placeholder: "入力してください",
  },
};

export const Default: Story = {};
