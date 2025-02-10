import { fireEvent, render, screen } from "@testing-library/react";
import Tab from ".";

describe("Tab", () => {
  test("Tabが表示される", () => {
    render(
      <Tab.Group>
        <Tab.Title>Tab Component</Tab.Title>
        <Tab.List
          tabItems={[
            { id: "0", content: "Tab 1" },
            { id: "1", content: "Tab 2" },
            { id: "2", content: "Tab 3" },
          ]}
        />
        <Tab.PanelList
          panelItems={[
            { id: "0", content: "Content 1" },
            { id: "1", content: "Content 2" },
            { id: "2", content: "Content 3" },
          ]}
        />
      </Tab.Group>,
    );

    expect(screen.getByText("Tab Component")).toBeInTheDocument();
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();
  });

  test("タブをクリックすると、クリックしたタブのコンテンツが表示される", () => {
    render(
      <Tab.Group>
        <Tab.Title>Tab Component</Tab.Title>
        <Tab.List
          tabItems={[
            { id: "0", content: "Tab 1" },
            { id: "1", content: "Tab 2" },
            { id: "2", content: "Tab 3" },
          ]}
        />
        <Tab.PanelList
          panelItems={[
            { id: "0", content: "Content 1" },
            { id: "1", content: "Content 2" },
            { id: "2", content: "Content 3" },
          ]}
        />
      </Tab.Group>,
    );

    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.queryByText("Content 2")).toHaveClass("hidden");
    expect(screen.queryByText("Content 3")).toHaveClass("hidden");

    // 2番目のタブをクリック
    fireEvent.click(screen.getByText("Tab 2"));

    expect(screen.getByText("Content 2")).toBeVisible();
    expect(screen.queryByText("Content 1")).toHaveClass("hidden");
    expect(screen.queryByText("Content 3")).toHaveClass("hidden");
  });

  test("キーボードによるタブ移動が可能", () => {
    render(
      <Tab.Group>
        <Tab.Title>Tab Component</Tab.Title>
        <Tab.List
          tabItems={[
            { id: "0", content: "Tab 1" },
            { id: "1", content: "Tab 2" },
            { id: "2", content: "Tab 3" },
          ]}
        />
        <Tab.PanelList
          panelItems={[
            { id: "0", content: "Content 1" },
            { id: "1", content: "Content 2" },
            { id: "2", content: "Content 3" },
          ]}
        />
      </Tab.Group>,
    );

    const tab1 = screen.getByText("Tab 1");
    const tab2 = screen.getByText("Tab 2");
    const tab3 = screen.getByText("Tab 3");

    tab1.focus();
    fireEvent.keyDown(tab1, { key: "ArrowRight" });

    expect(tab2).toHaveFocus();
    fireEvent.keyDown(tab2, { key: "ArrowRight" });

    expect(tab3).toHaveFocus();
    fireEvent.keyDown(tab3, { key: "ArrowRight" });

    expect(tab1).toHaveFocus();

    fireEvent.keyDown(tab1, { key: "ArrowLeft" });

    expect(tab3).toHaveFocus();
  });

  test("アクセシビリティに基づいたrole設定がされている", () => {
    render(
      <Tab.Group>
        <Tab.Title>Tab Component</Tab.Title>
        <Tab.List
          tabItems={[
            { id: "0", content: "Tab 1" },
            { id: "1", content: "Tab 2" },
            { id: "2", content: "Tab 3" },
          ]}
        />
        <Tab.PanelList
          panelItems={[
            { id: "0", content: "Content 1" },
            { id: "1", content: "Content 2" },
            { id: "2", content: "Content 3" },
          ]}
        />
      </Tab.Group>,
    );

    const tab1 = screen.getByText("Tab 1");
    const tab2 = screen.getByText("Tab 2");
    const panel1 = screen.getByText("Content 1");
    const panel2 = screen.getByText("Content 2");

    expect(tab1).toHaveAttribute("role", "tab");
    expect(tab1).toHaveAttribute(
      "aria-controls",
      expect.stringContaining("panel"),
    );
    expect(tab1).toHaveAttribute("aria-selected", "true");

    expect(tab2).toHaveAttribute("aria-selected", "false");

    expect(panel1).toHaveAttribute("role", "tabpanel");
    expect(panel1).toHaveAttribute(
      "aria-labelledby",
      expect.stringContaining("tab"),
    );

    expect(panel2).toHaveClass("hidden");
  });
});
