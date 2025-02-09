import { fireEvent, render, screen } from "@testing-library/react";
import { PrefectureItem } from ".";

describe("PrefectureItem", () => {
  const mockOnChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("nameに与えた文字列でtextが設定される", () => {
    render(
      <PrefectureItem name="北海道" checked={false} onChange={mockOnChange} />,
    );

    expect(screen.getByText("北海道")).toBeInTheDocument();
  });

  it("checkedに与えた真偽値でcheck状態が設定される", () => {
    const { rerender } = render(
      <PrefectureItem name="北海道" checked={false} onChange={mockOnChange} />,
    );

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    rerender(
      <PrefectureItem name="北海道" checked={true} onChange={mockOnChange} />,
    );
    expect(checkbox.checked).toBe(true);
  });

  it.each([true, false])(
    "clickするとonChangeイベントがコールされて、check状態が反転する 初期値: %s",
    (checked) => {
      render(
        <PrefectureItem
          name="北海道"
          checked={checked}
          onChange={mockOnChange}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(!checked);
    },
  );
});
