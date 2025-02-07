import { cn } from "./cn"; // cn 関数のファイルを適宜指定

describe("cn", () => {
  test("classNameがマージできる", () => {
    expect(cn("text-center", "font-bold")).toBe("text-center font-bold");
  });

  test("有効なclassNameのみマージする", () => {
    expect(cn("text-center", null, undefined, "", false, "font-bold")).toBe(
      "text-center font-bold",
    );
  });

  test("tailwindの役割上コンフリクトするclassNameの場合は後者を優先する", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  test("配列を渡してもマージできる", () => {
    expect(cn(["text-center", "font-bold"])).toBe("text-center font-bold");
  });

  test("オブジェクトを渡した場合、有効なclassNameのみをマージする", () => {
    expect(
      cn({
        "text-center": true,
        "font-bold": false,
        "text-red-500": true,
      }),
    ).toBe("text-center text-red-500");
  });

  test("重複したスタイルを指定した場合、重複を除去する", () => {
    expect(cn("text-center", "text-center")).toBe("text-center");
  });

  test("未指定の場合は空文字を返す", () => {
    expect(cn()).toBe("");
  });
});
