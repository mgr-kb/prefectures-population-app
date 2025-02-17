import { Loader2 } from "lucide-react";
import type { FC } from "react";

export const LoadingSpinner: FC = () => (
  <div
    className="flex justify-center items-center p-2"
    data-testid="loading-spinner"
  >
    <Loader2 className="animate-spin" />
  </div>
);
