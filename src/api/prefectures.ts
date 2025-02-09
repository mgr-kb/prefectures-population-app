import { configs } from "@/configs";

export type Prefecture = {
  /** 都道府県コード */
  prefCode: number;
  /** 都道府県名 */
  prefName: string;
};
export type PrefecturesResponse = {
  message: string | null;
  /** 都道府県一覧 */
  result: Prefecture[];
};

const { baseUrl, prefectures } = configs;

export const fetchPrefectures = async (): Promise<PrefecturesResponse> => {
  const res = await fetch(`${baseUrl}${prefectures.path}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};
