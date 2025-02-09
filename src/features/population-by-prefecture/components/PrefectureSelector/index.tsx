import { type Prefecture, fetchPrefectures } from "@/api/prefectures";
import { Button } from "@/components/Button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { XCircle } from "lucide-react";
import type { FC } from "react";
import { PrefectureItem } from "../PrefectureItem";

type PrefectureSelectorProps = {
  selectedPrefectures: Prefecture[];
  onSelectPrefecture: (prefecture: Prefecture) => void;
  onDeselectPrefecture: (prefecture: Prefecture) => void;
  clearAll: () => void;
};

export const PrefectureSelector: FC<PrefectureSelectorProps> = ({
  selectedPrefectures,
  onSelectPrefecture,
  onDeselectPrefecture,
  clearAll,
}) => {
  const { data: prefectures } = useSuspenseQuery({
    queryKey: ["prefectures"],
    queryFn: fetchPrefectures,
  });

  return (
    <div className="bg-gray-100 text-gray-700 rounded-lg shadow-md p-4">
      <div className="mt-2">
        <Button onClick={clearAll}>
          <XCircle />
          すべてクリア
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-4 md:grid-cols-6">
        {prefectures.result.map((prefecture) => {
          return (
            <PrefectureItem
              key={prefecture.prefCode}
              name={prefecture.prefName}
              checked={selectedPrefectures.some(
                (selectedPrefecture) =>
                  selectedPrefecture.prefCode === prefecture.prefCode,
              )}
              onChange={(checked) => {
                checked
                  ? onSelectPrefecture(prefecture)
                  : onDeselectPrefecture(prefecture);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
