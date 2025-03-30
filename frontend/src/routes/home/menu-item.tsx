import { IMenuItem } from "../../MenuItems";
import numberToCurrency from "../../../../shared/utils/numberToCurrency";

interface MenuItemProps extends IMenuItem {
  quantity: number;
  setProductQuantity: (quantity: number) => void;
}

export default function MenuItem({
  name,
  imageUrl,
  price,
  description,
  quantity,
  setProductQuantity,
}: MenuItemProps) {
  return (
    <div className="flex justify-between items-center border-[1px] p-4 border-gray-300">
      <div className="flex flex-col gap-3 w-full max-w-60">
        <h4 className="font-semibold">{name}</h4>
        <div className="text-xs text-gray-500">{description}</div>

        <div className="flex mt-4 items-center">
          <div>{numberToCurrency(price)}</div>

          <div className="flex font-bold items-center gap-2 mx-4">
            <div
              onClick={() =>
                setProductQuantity(quantity > 0 ? quantity - 1 : 0)
              }
              className="p-1"
            >
              -
            </div>
            <div>{quantity}</div>
            <div
              onClick={() => setProductQuantity(quantity + 1)}
              className="p-1"
            >
              +
            </div>
          </div>
        </div>
      </div>

      <img src={imageUrl} className="w-32 h-24 object-cover rounded-md" />
    </div>
  );
}
