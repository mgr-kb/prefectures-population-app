import { Checkbox } from "@/components/Checkbox";
import { memo, useId } from "react";

interface PrefectureItemProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PrefectureItem = memo(
  function PrefectureItem({ name, checked, onChange }: PrefectureItemProps) {
    const checkboxId = useId();
    return (
      <label
        htmlFor={checkboxId}
        className="flex items-center gap-2 cursor-pointer p-2 rounded-sm hover:bg-gray-300"
      >
        <Checkbox
          id={checkboxId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="text-xs sm:text-md">{name}</span>
      </label>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.checked === nextProps.checked &&
      prevProps.name === nextProps.name
    );
  },
);
