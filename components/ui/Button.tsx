import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "accent" | "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  accent:
    "bg-(--color-accent) text-white font-semibold hover:opacity-90",
  primary:
    "bg-(--color-primary) text-white font-medium hover:opacity-90",
  outline:
    "border border-(--color-border) bg-(--color-surface) text-(--color-foreground) font-medium hover:border-(--color-primary) hover:text-(--color-primary)",
  ghost:
    "text-(--color-muted) font-medium hover:bg-(--color-surface) hover:text-(--color-foreground)",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
  icon: "p-1.5",
};

export function buttonVariants({
  variant = "outline",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "outline", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export default Button;
