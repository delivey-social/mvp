import clsx from "clsx";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "bg-emerald-400 text-emerald-950 drop-shadow-md px-4 py-4  rounded-md",
        "active:bg-emerald-600 hover:bg-emerald-500 transition-all cursor-pointer active:drop-shadow-none",
        "text-sm font-bold",
        "disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-default",
        className,
      )}
      {...props}
    />
  );
}
