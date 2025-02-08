import { cn } from "@/utils/cn";
import { type ComponentPropsWithRef, forwardRef } from "react";

type Props = ComponentPropsWithRef<"input">;

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  function CheckboxBase({ className, ...props }, ref) {
    const classes = cn(
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2",
      className,
    );
    return <input type="checkbox" {...props} ref={ref} className={classes} />;
  },
);
