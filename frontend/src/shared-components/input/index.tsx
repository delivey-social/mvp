export default function Input(props: React.HTMLProps<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`${props.className} text-sm border-1 py-2 px-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500`}
    />
  );
}
