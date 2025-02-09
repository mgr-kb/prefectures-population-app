import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSelectedPrefectures } from "../../hooks/use-selected-prefectures";
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
          fallbackRender={({ error }) => <div>{error.message}</div>}
        >
          <PrefectureSelector
            selectedPrefectures={selectedPrefectures}
            onSelectPrefecture={selectPrefecture}
            onDeselectPrefecture={deselectPrefectures}
            clearAll={clearAll}
          />
        </ErrorBoundary>
      </Suspense>

      {/* <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary
          fallbackRender={({ error }) => <div>{error.message}</div>}
        >
          <p>TODO: グラフ</p>
        </ErrorBoundary>
      </Suspense> */}
    </>
  );
};
