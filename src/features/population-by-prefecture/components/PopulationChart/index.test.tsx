import {
  type PopulationCompositionPerYearResponse,
  fetchPopulationByPrefecture,
} from "@/api/population";
import type { Prefecture } from "@/api/prefectures";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import type { ResponsiveContainerProps } from "recharts";
import { PopulationChart } from ".";

vi.mock("@/api/population", () => ({
  fetchPopulationByPrefecture: vi.fn(),
}));

// NOTE: Rechartsをテスト実行上でも利用可能にするためのモック
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));
vi.mock("recharts", async () => {
  const OriginalModule =
    await vi.importActual<typeof import("recharts")>("recharts");

  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: ResponsiveContainerProps) => {
      return (
        <OriginalModule.ResponsiveContainer height={580} aspect={1}>
          {children}
        </OriginalModule.ResponsiveContainer>
      );
    },
  };
});

const mockResponse: PopulationCompositionPerYearResponse = {
  message: "success",
  result: {
    boundaryYear: 2020,
    data: [
      {
        label: "総人口",
        data: [
          { year: 2010, value: 5506419 },
          { year: 2015, value: 5381733 },
          { year: 2020, value: 5224614 },
          { year: 2025, value: 5016554 },
          { year: 2030, value: 4791592 },
        ],
      },
      {
        label: "年少人口",
        data: [
          { year: 2010, value: 657312, rate: 11.94 },
          { year: 2015, value: 608296, rate: 11.3 },
          { year: 2020, value: 555804, rate: 10.64 },
          { year: 2025, value: 511677, rate: 10.2 },
          { year: 2030, value: 465307, rate: 9.71 },
        ],
      },
      {
        label: "生産年齢人口",
        data: [
          { year: 2010, value: 3482169, rate: 63.24 },
          { year: 2015, value: 3190804, rate: 59.29 },
          { year: 2020, value: 2945727, rate: 56.38 },
          { year: 2025, value: 2781175, rate: 55.44 },
          { year: 2030, value: 2594718, rate: 54.15 },
        ],
      },
      {
        label: "老年人口",
        data: [
          { year: 2010, value: 1358068, rate: 24.66 },
          { year: 2015, value: 1558387, rate: 28.96 },
          { year: 2020, value: 1664023, rate: 31.85 },
          { year: 2025, value: 1723702, rate: 34.36 },
          { year: 2030, value: 1731567, rate: 36.14 },
        ],
      },
    ],
  },
};

describe("PopulationChart", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // リトライを無効化
      },
    },
  });

  beforeEach(() => {
    vi.mocked(fetchPopulationByPrefecture).mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (selectedPrefectures: Prefecture[] = []) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <PopulationChart selectedPrefectures={selectedPrefectures} />
      </QueryClientProvider>,
    );
  };

  test("選択した都道府県のグラフデータを取得して表示できる", async () => {
    const selectedPrefectures = [{ prefCode: 1, prefName: "北海道" }];

    renderComponent(selectedPrefectures);

    await waitFor(() => {
      // 4つのタブが表示されることを確認
      const tabs = screen.getAllByRole("tab");
      expect(tabs).toHaveLength(4);
      // 表示されるデータのラベル(北海道)が、4タブ分存在することを確認
      const legends = screen.getAllByText("北海道");
      expect(legends).toHaveLength(4);
    });
  });

  test("都道府県が選択されていない状態では「都道府県を選択してください」というテキストが表示される", async () => {
    renderComponent([]);

    await waitFor(() => {
      const noDataText = screen.getByText("都道府県を選択してください");
      expect(noDataText).toBeInTheDocument();
    });
  });
});
