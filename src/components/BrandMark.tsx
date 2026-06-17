import { cn } from "@moodmate/lib/utils";

type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export const BrandMark = ({ size = "md", className }: BrandMarkProps) => (
  <div
    className={cn(
      "flex items-center justify-center rounded-md bg-accent font-bold tracking-tight text-primary",
      sizeClass[size],
      className,
    )}
  >
    AKU
  </div>
);
