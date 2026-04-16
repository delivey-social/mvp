import ResultLine from "./result-line";

interface PricesAreaProps {
  itemsTotal: number;
  appFee: number;
  deliveryFee: number | undefined;
}

export default function PricesArea({
  itemsTotal,
  appFee,
  deliveryFee,
}: PricesAreaProps) {
  const total = itemsTotal + appFee + (deliveryFee ?? 0);

  const lines: { label: string; value: number }[] = [
    { label: "Total dos itens", value: itemsTotal },
    { label: "Taxa Delivery Social", value: appFee },
    { label: "Taxa de entrega", value: deliveryFee ?? 0 },
    { label: "Total", value: total },
  ];

  return (
    <div className="ml-auto flex flex-col gap-2 mt-4">
      {lines.map(({ label, value }) => (
        <ResultLine key={label} label={label} value={value} />
      ))}
    </div>
  );
}
