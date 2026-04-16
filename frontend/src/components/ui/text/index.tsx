import clsx from "clsx";

type TextVariants = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariants;
  component?: TextVariants;
  className?: React.HTMLProps<HTMLElement>["className"];
}

export default function Text({
  children,
  variant,
  component,
  className,
}: TextProps) {
  const Component = component || variant || "p";
  const styles: Record<TextVariants, string> = {
    p: "text-base",
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-bold",
    h5: "text-lg font-bold",
    h6: "text-base font-bold",
  };

  return (
    <Component className={clsx(styles[Component] || styles.p, className)}>
      {children}
    </Component>
  );
}
