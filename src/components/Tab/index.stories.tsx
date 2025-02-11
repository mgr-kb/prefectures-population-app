import type { Meta, StoryObj } from "@storybook/react";
import Tab from ".";

const meta: Meta<typeof Tab.Group> = {
  title: "Components/Tab",
  component: Tab,
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Tab.Group>
      <Tab.Title>Tab Component</Tab.Title>
      <Tab.List
        tabItems={[
          { id: "0", content: "Tab 1" },
          { id: "1", content: "Tab 2" },
          { id: "2", content: "Tab 3" },
          { id: "3", content: "Tab 4" },
        ]}
      />
      <Tab.PanelList
        panelItems={[
          { id: "0", content: "Content 1" },
          { id: "1", content: "Content 2" },
          { id: "2", content: "Content 3" },
          { id: "3", content: "Content 4" },
        ]}
      />
    </Tab.Group>
  ),
};
