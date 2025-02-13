import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { PopulationByPrefecture } from ".";
import { useSelectedPrefectures } from "../../hooks/use-selected-prefectures";

vi.mock("../../hooks/use-selected-prefectures", () => ({
  useSelectedPrefectures: vi.fn(),
}));

describe("PopulationByPrefecture", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // リトライを無効化
      },
    },
  });

  beforeEach(() => {
    vi.mocked(useSelectedPrefectures).mockReturnValue({
      selectedPrefectures: [],
      selectPrefecture: vi.fn(),
      deselectPrefectures: vi.fn(),
      clearAll: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <PopulationByPrefecture />
      </QueryClientProvider>,
    );
  };

  it("初期表示ではloadingコンポーネントがそれぞれ表示されており、データ取得できるとloadingコンポーネントは非表示となる", async () => {
    renderComponent();

    expect(screen.getAllByTestId("loading-spinner")).toHaveLength(1);

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /選択をクリア/i }),
      ).toBeInTheDocument();
    });
  });
});
