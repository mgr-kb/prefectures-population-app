import { cn } from "@/utils/cn";
import { type ComponentPropsWithRef, forwardRef } from "react";

type Props = ComponentPropsWithRef<"input">;

export const InputText = forwardRef<HTMLInputElement, Props>(
  function InputTextBase({ className, ...props }, ref) {
    const classes = cn(
      "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
      className,
    );
    return <input type="text" {...props} ref={ref} className={classes} />;
  },
);
