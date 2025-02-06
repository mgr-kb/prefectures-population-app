import { cn } from "@/utils/cn";
import clsx from "clsx";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "default";
};

export const Button = forwardRef<HTMLButtonElement, Props>(function ButtonBase(
  { className, variant = "default", ...props },
  ref,
) {
  const colorClass = clsx(
    variant === "primary" && "bg-blue-600 hover:bg-blue-700",
    ["secondary", "default"].includes(variant) &&
      "bg-gray-600 hover:bg-gray-700",
  );
  const buttonClass = cn(
    "flex items-center gap-2 cursor-pointer px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50",
    colorClass,
    className,
  );
  return <button {...props} ref={ref} className={buttonClass} />;
});
