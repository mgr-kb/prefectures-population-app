import type { Meta, StoryObj } from "@storybook/react";

import { LoadingSpinner } from ".";

const meta = {
  title: "components/LoadingSpinner",
  component: LoadingSpinner,
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
