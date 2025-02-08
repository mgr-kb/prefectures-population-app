import { fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { Checkbox } from ".";

describe("Checkbox", () => {
  test("チェックボックスが表示される", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  test("classNameが適用できる", () => {
    const { container } = render(<Checkbox className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  test("defaultCheckedを設定できる", () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("onChangeイベントが発火できる", () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("refを設定できる", () => {
    const TestComponent = () => {
      const checkboxRef = useRef<HTMLInputElement>(null);
      return <Checkbox ref={checkboxRef} data-testid="checkbox" />;
    };

    render(<TestComponent />);

    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeInstanceOf(HTMLInputElement);
  });
});
