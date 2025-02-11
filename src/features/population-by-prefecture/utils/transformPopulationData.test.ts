import {
  type InputPopulationPerPrefectureData,
  transformGraphData,
} from "./transformPopulationData";

describe("transformGraphData", () => {
  test("基本的な変換が正しく行われるか", () => {
    const input: InputPopulationPerPrefectureData[] = [
      {
        prefCode: 1,
        prefName: "北海道",
        populationCompositionYear: [
          {
            label: "総人口",
            data: [{ year: 2000, value: 5000000 }],
          },
          {
            label: "年少人口",
            data: [{ year: 2000, value: 5000000, rate: 20 }],
          },
          {
            label: "生産年齢人口",
            data: [{ year: 2000, value: 5000000, rate: 20 }],
          },
          {
            label: "老年人口",
            data: [{ year: 2000, value: 5000000, rate: 20 }],
          },
        ],
      },
    ];

    const expected = {
      data: {
        年少人口: [
          {
            year: 2000,
            populationPerPrefecture: { 1: 5000000 },
          },
        ],
        生産年齢人口: [
          {
            year: 2000,
            populationPerPrefecture: { 1: 5000000 },
          },
        ],
        老年人口: [
          {
            year: 2000,
            populationPerPrefecture: { 1: 5000000 },
          },
        ],
        総人口: [
          {
            year: 2000,
            populationPerPrefecture: { 1: 5000000 },
          },
        ],
      },
      prefectures: [{ prefCode: 1, prefName: "北海道" }],
    };

    expect(transformGraphData(input)).toEqual(expected);
  });

  test("複数の都道府県データを正しく処理できるか", () => {
    const input: InputPopulationPerPrefectureData[] = [
      {
        prefCode: 1,
        prefName: "北海道",
        populationCompositionYear: [
          {
            label: "総人口",
            data: [{ year: 2000, value: 5000000 }],
          },
          {
            label: "年少人口",
            data: [{ year: 2000, value: 5000000, rate: 20 }],
          },
          {
            label: "生産年齢人口",
            data: [{ year: 2000, value: 5000000, rate: 20 }],
          },
          {
            label: "老年人口",
            data: [{ year: 2000, value: 5000000, rate: 20 }],
          },
        ],
      },
      {
        prefCode: 2,
        prefName: "青森県",
        populationCompositionYear: [
          {
            label: "総人口",
            data: [{ year: 2000, value: 4000000 }],
          },
          {
            label: "年少人口",
            data: [{ year: 2000, value: 4000000, rate: 10 }],
          },
          {
            label: "生産年齢人口",
            data: [{ year: 2000, value: 4000000, rate: 10 }],
          },
          {
            label: "老年人口",
            data: [{ year: 2000, value: 4000000, rate: 10 }],
          },
        ],
      },
    ];

    const expected = {
      data: {
        年少人口: [
          {
            year: 2000,
            populationPerPrefecture: { 1: 5000000, 2: 4000000 },
          },
        ],
        生産年齢人口: [
          {
            year: 2000,
            populationPerPrefecture: { 1: 5000000, 2: 4000000 },
          },
        ],
        老年人口: [
          {
            year: 2000,
            populationPerPrefecture: { 1: 5000000, 2: 4000000 },
          },
        ],
        総人口: [
          {
            year: 2000,
            populationPerPrefecture: { 1: 5000000, 2: 4000000 },
          },
        ],
      },
      prefectures: [
        { prefCode: 1, prefName: "北海道" },
        { prefCode: 2, prefName: "青森県" },
      ],
    };

    expect(transformGraphData(input)).toEqual(expected);
  });

  test("空のデータを渡した場合、適切に処理される", () => {
    const expected = {
      data: {
        年少人口: [],
        生産年齢人口: [],
        老年人口: [],
        総人口: [],
      },
      prefectures: [],
    };

    expect(transformGraphData([])).toEqual(expected);
  });
});
