import numberToCurrency from "@shared/utils/numberToCurrency";

export default function ResultLine({
  label,
  value,
}: {
  label: string;
  value?: number;
}) {
  return (
    <div className="flex gap-4 ml-auto text-sm">
      <div className="font-bold">{label}</div>
      <div>{value ? numberToCurrency(value) : "--"}</div>
    </div>
  );
}
