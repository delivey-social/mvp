// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ ...props }: ButtonProps) {
  return (
    <button
      className="bg-emerald-400 w-fit text-emerald-950 drop-shadow-md px-4 py-4 text-sm font-bold rounded-md active:drop-shadow active:bg-emerald-600 hover:bg-emerald-500 none transition-all cursor-pointer"
      {...props}
    />
  );
}
