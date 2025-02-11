import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSelectedPrefectures } from "../../hooks/use-selected-prefectures";
import { PopulationChart } from "../PopulationChart";
import { PrefectureSelector } from "../PrefectureSelector";

export const PopulationByPrefecture = () => {
  const {
    selectedPrefectures,
    selectPrefecture,
    deselectPrefectures,
    clearAll,
  } = useSelectedPrefectures();

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary
          fallbackRender={() => (
            <p role="alert" className="text-red-700">
              都道府県情報を取得できませんでした。再度お試しください。
            </p>
          )}
        >
          <PrefectureSelector
            selectedPrefectures={selectedPrefectures}
            onSelectPrefecture={selectPrefecture}
            onDeselectPrefecture={deselectPrefectures}
            clearAll={clearAll}
          />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary
          fallbackRender={() => (
            <p role="alert" className="text-red-700">
              人口情報を取得できませんでした。再度お試しください。
            </p>
          )}
        >
          <PopulationChart selectedPrefectures={selectedPrefectures} />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};
