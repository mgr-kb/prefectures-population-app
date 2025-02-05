/**
 * [NOTE]
 * baseUrl, apiごとのendpointは環境によって変更される可能性もあるが、
 * 今回は固定値として設定します。
 */
export const configs = {
  baseUrl: "https://resas-proxy.koumgrars13.workers.dev",
  prefectures: {
    path: "/prefectures",
  },
  populationCompositionPerYear: {
    path: "/population/compotion/perYear",
  },
} as const;
