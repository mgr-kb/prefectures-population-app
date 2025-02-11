import { configs } from "@/configs";

type PopulationData = {
  /** ラベル */
  label: string;
  data: {
    /** 年 */
    year: number;
    /** 人口 */
    value: number;
    /** 割合 */
    rate: number;
  }[];
};

export type PopulationCompositionPerYear = {
  /** 実績値と推計値の区切り年 */
  boundaryYear: number;
  data: [
    {
      label: "総人口";
      data: Omit<PopulationData["data"][number], "rate">[];
    },
    PopulationData & { label: "年少人口" },
    PopulationData & { label: "生産年齢人口" },
    PopulationData & { label: "老年人口" },
  ];
};

export type PopulationCompositionPerYearResponse = {
  message: string | null;
  result: PopulationCompositionPerYear;
};

const { baseUrl, populationCompositionPerYear } = configs;

export const fetchPopulationByPrefecture = async (
  prefCode: string,
): Promise<PopulationCompositionPerYearResponse> => {
  const res = await fetch(
    `${baseUrl}${populationCompositionPerYear.path}/${prefCode}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await res.json();
  return data;
};
