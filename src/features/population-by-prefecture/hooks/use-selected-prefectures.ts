import type { Prefecture } from "@/api/prefectures";
import { useCallback, useState } from "react";

export const useSelectedPrefectures = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>(
    [],
  );

  const selectPrefecture = useCallback(
    (prefecture: Prefecture) =>
      setSelectedPrefectures((prev) => {
        if (prev.some((pref) => pref.prefCode === prefecture.prefCode)) {
          return prev;
        }
        return [...prev, prefecture];
      }),
    [],
  );

  const deselectPrefectures = useCallback(
    (prefecture: Prefecture) =>
      setSelectedPrefectures((prev) =>
        prev.filter((pref) => pref.prefCode !== prefecture.prefCode),
      ),
    [],
  );

  const clearAll = useCallback(() => setSelectedPrefectures([]), []);

  return {
    selectedPrefectures,
    selectPrefecture,
    deselectPrefectures,
    clearAll,
  };
};
