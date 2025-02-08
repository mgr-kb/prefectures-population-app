import { fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { InputText } from ".";

describe("InputText", () => {
  test("テキストボックスが表示される", () => {
    render(<InputText />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("placeholderが設定できる", () => {
    render(<InputText placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  test("classNameが適用できる", () => {
    const { container } = render(<InputText className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  test("defaultValueを設定できる", () => {
    render(<InputText defaultValue="Hello" />);
    expect(screen.getByRole("textbox")).toHaveValue("Hello");
  });

  test("onChangeイベントが発火できる", () => {
    const handleChange = vi.fn();
    render(<InputText onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("refを設定できる", () => {
    const TestComponent = () => {
      const inputRef = useRef<HTMLInputElement>(null);
      return <InputText ref={inputRef} data-testid="input-text" />;
    };

    render(<TestComponent />);

    const input = screen.getByTestId("input-text");
    expect(input).toBeInTheDocument();
    expect(input).toBeInstanceOf(HTMLInputElement);
  });
});
