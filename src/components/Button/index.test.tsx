import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from ".";

test("Buttonに文字が表示される", async () => {
  render(<Button>Button</Button>);

  expect(screen.getByText("Button")).toBeTruthy();
});

test("Buttonロールである", async () => {
  render(<Button>Button</Button>);

  expect(screen.getByRole("button").textContent).toBe("Button");
});

test("クリックするとonClick()が実行される", async () => {
  const onClickMock = vi.fn(() => {});

  render(<Button onClick={onClickMock}>Button</Button>);
  expect(onClickMock).toHaveBeenCalledTimes(0);

  const button = screen.getByRole("button");
  await fireEvent.click(button);

  expect(onClickMock).toHaveBeenCalledTimes(1);
  await fireEvent.click(button);
  expect(onClickMock).toHaveBeenCalledTimes(2);
});

test("disabledをtureにするとボタンがクリック出来なくなる", async () => {
  const onClickMock = vi.fn(() => {});

  render(
    <Button disabled={true} onClick={onClickMock}>
      Button
    </Button>,
  );

  const button = screen.getByRole("button");
  await fireEvent.click(button);

  expect(onClickMock).toHaveBeenCalledTimes(0);
});
