import {
  type Prefecture,
  type PrefecturesResponse,
  fetchPrefectures,
} from "@/api/prefectures";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PrefectureSelector } from ".";

vi.mock("@/api/prefectures", () => ({
  fetchPrefectures: vi.fn(),
}));

const mockPrefectures: PrefecturesResponse = {
  message: "success",
  result: [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森" },
  ],
};

describe("PrefectureSelector", () => {
  const mockOnSelectPrefecture = vi.fn();
  const mockOnDeselectPrefecture = vi.fn();
  const mockClearAll = vi.fn();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // リトライを無効化
      },
    },
  });

  beforeEach(() => {
    vi.mocked(fetchPrefectures).mockResolvedValue(mockPrefectures);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (selectedPrefectures: Prefecture[] = []) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <PrefectureSelector
          selectedPrefectures={selectedPrefectures}
          onSelectPrefecture={mockOnSelectPrefecture}
          onDeselectPrefecture={mockOnDeselectPrefecture}
          clearAll={mockClearAll}
        />
      </QueryClientProvider>,
    );
  };

  it("APIからデータを取得後、結果に従ってレンダリングされる", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("北海道")).toBeInTheDocument();
      expect(screen.getByText("青森")).toBeInTheDocument();
    });
  });

  it("選択状態が正しくレンダリングされる", async () => {
    renderComponent([{ prefCode: 1, prefName: "北海道" }]);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
      expect(checkboxes[0].checked).toBe(true);
      expect(checkboxes[1].checked).toBe(false);
    });
  });

  it("未チェックの都道府県の選択すると、onSelectPrefectureの関数がコールされる", async () => {
    renderComponent();

    await waitFor(() => {
      const checkbox = screen.getByLabelText("北海道") as HTMLInputElement;
      fireEvent.click(checkbox);
    });

    expect(mockOnSelectPrefecture).toHaveBeenCalledTimes(1);
    expect(mockOnSelectPrefecture).toHaveBeenCalledWith({
      prefCode: 1,
      prefName: "北海道",
    });
  });

  it("チェック済みの都道府県の選択すると、onDeselectPrefectureの関数がコールされる", async () => {
    renderComponent([{ prefCode: 1, prefName: "北海道" }]);

    await waitFor(() => {
      const checkbox = screen.getByLabelText("北海道") as HTMLInputElement;
      fireEvent.click(checkbox);
    });

    expect(mockOnDeselectPrefecture).toHaveBeenCalledTimes(1);
    expect(mockOnDeselectPrefecture).toHaveBeenCalledWith({
      prefCode: 1,
      prefName: "北海道",
    });
  });

  it("「選択をクリア」のボタンをクリックすると、clearAllの関数がコールされる", async () => {
    renderComponent([{ prefCode: 1, prefName: "北海道" }]);

    const clearButton = screen.getByRole("button", { name: /選択をクリア/i });
    fireEvent.click(clearButton);

    expect(mockClearAll).toHaveBeenCalledTimes(1);
  });
});
