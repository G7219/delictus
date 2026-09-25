import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
}

const VARIANT_CLASSES: Record<string, string> = {
  primary: "bg-gold text-navy hover:brightness-110",
  secondary: "bg-surface text-ink border border-border hover:bg-surfaceHover",
  danger: "bg-rose text-ink hover:brightness-110",
};

/** Base button. Label states what the action does ("Save changes", not "Submit"). */
export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
