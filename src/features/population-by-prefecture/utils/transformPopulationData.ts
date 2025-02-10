import type { PopulationCompositionPerYear } from "@/api/population";
import type { Prefecture } from "@/api/prefectures";

export type InputPopulationPerPrefectureData = {
  prefCode: number;
  prefName: string;
  populationCompositionYear: PopulationCompositionPerYear["data"];
};

export type PopulationPerPrefectureData = {
  /** 年 */
  year: number;
  /** 都道府県ごとの人口 */
  populationPerPrefecture: Record<Prefecture["prefCode"], number>;
};

type Data = Record<
  PopulationCompositionPerYear["data"][number]["label"],
  PopulationPerPrefectureData[]
>;

type TransformedData = {
  /** 人口種別ごとの人口構成データ */
  data: Data;
  /** 都道府県情報 */
  prefectures: Prefecture[];
};

/**
 * 人口データをグラフ表示用に変換する
 */
export const transformGraphData = (
  data: InputPopulationPerPrefectureData[],
): TransformedData => {
  const prefectures = data.map(({ prefCode, prefName }) => ({
    prefCode,
    prefName,
  }));
  const transformedData: Data = {
    年少人口: [],
    生産年齢人口: [],
    老年人口: [],
    総人口: [],
  };
  for (const prefecture of data) {
    for (const populationType of prefecture.populationCompositionYear) {
      for (const data of populationType.data) {
        const year = transformedData[populationType.label].find(
          (d) => d.year === data.year,
        );
        if (year) {
          year.populationPerPrefecture[prefecture.prefCode] = data.value;
        } else {
          transformedData[populationType.label].push({
            year: data.year,
            populationPerPrefecture: {
              [prefecture.prefCode]: data.value,
            },
          });
        }
      }
    }
  }
  return {
    data: transformedData,
    prefectures,
  };
};
