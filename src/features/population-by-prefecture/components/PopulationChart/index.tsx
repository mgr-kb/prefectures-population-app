import { fetchPopulationByPrefecture } from "@/api/population";
import type { Prefecture } from "@/api/prefectures";
import Tab from "@/components/Tab";
import { useSuspenseQueries } from "@tanstack/react-query";
import type { FC } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  type PopulationPerPrefectureData,
  transformGraphData,
} from "../../utils/transformPopulationData";

type PopulationChartProps = {
  selectedPrefectures: Prefecture[];
};
type ChartProps = {
  data: PopulationPerPrefectureData[];
  prefectures: Prefecture[];
};

const COLORS = [
  "#2563eb", // blue-600
  "#dc2626", // red-600
  "#16a34a", // green-600
  "#9333ea", // purple-600
  "#ea580c", // orange-600
  "#0891b2", // cyan-600
  "#4f46e5", // indigo-600
  "#be123c", // rose-600
];

export const PopulationChart: FC<PopulationChartProps> = ({
  selectedPrefectures,
}) => {
  const results = useSuspenseQueries({
    queries: selectedPrefectures.map(({ prefCode, prefName }) => ({
      queryKey: ["population", prefCode],
      queryFn: () =>
        fetchPopulationByPrefecture(prefCode.toString()).then(({ result }) => ({
          prefCode,
          prefName,
          populationCompositionYear: result.data,
        })),
    })),
  });
  if (results.length === 0) {
    return (
      <p className="text-center text-gray-500">都道府県を選択してください</p>
    );
  }

  const transformedData = transformGraphData(results.map(({ data }) => data));
  const tabNames = Object.keys(transformedData.data);
  return (
    <Tab.Group>
      <Tab.Title>都道府県ごとの人口構成</Tab.Title>
      <Tab.List
        tabItems={tabNames.map((tabName) => ({
          id: tabName,
          content: tabName,
        }))}
      />
      <Tab.PanelList
        panelItems={Object.entries(transformedData.data).map(
          ([label, data]) => ({
            id: label,
            content: <Chart data={data} prefectures={selectedPrefectures} />,
          }),
        )}
      />
    </Tab.Group>
  );
};

const Chart: FC<ChartProps> = ({ data, prefectures }) => {
  const formatPopulation = (value: number) => {
    return `${(value / 10000).toFixed(0)}万人`;
  };

  const formatTooltip = (value: number, name: string) => {
    return [formatPopulation(value), name];
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-2 h-[600px] overflow-x-auto"
      data-testid="chart"
    >
      <ResponsiveContainer height={580} width="100%" minWidth={375}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" type="number" domain={["dataMin", "dataMax"]} />
          <YAxis tickFormatter={formatPopulation} width={80} />
          <Tooltip
            formatter={formatTooltip}
            labelFormatter={(label) => `${label}年`}
          />
          <Legend />
          {prefectures.map(({ prefCode }, index) => (
            <Line
              key={prefCode}
              type="monotone"
              dataKey={`populationPerPrefecture.${prefCode}`}
              name={
                prefectures.find(
                  (prefecture) => prefecture.prefCode === prefCode,
                )?.prefName
              }
              stroke={COLORS[index % COLORS.length]}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
