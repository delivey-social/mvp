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
    <div className="flex justify-between items-center border-[1px] p-4 border-gray-300 gap-4 max-[380px]:flex-col-reverse">
      <div className="flex flex-col gap-3 w-40 max-w-sm:w-full">
        <h4 className="font-semibold">{name}</h4>
        <div className="text-xs text-gray-500">{description}</div>

        <div className="flex mt-4 items-center">
          <div>{numberToCurrency(price)}</div>

          <div className="flex font-bold items-center gap-4 mx-4">
            <span
              onClick={() =>
                setProductQuantity(quantity > 0 ? quantity - 1 : 0)
              }
              className="w-8 h-8 flex justify-center items-center rounded-full active:bg-gray-200 transition-all cursor-pointer"
            >
              -
            </span>
            <span>{quantity}</span>
            <span
              onClick={() => setProductQuantity(quantity + 1)}
              className="w-8 h-8 flex justify-center items-center rounded-full active:bg-gray-200 transition-all cursor-pointer"
            >
              +
            </span>
          </div>
        </div>
      </div>

      <img
        src={imageUrl}
        className="max-[380px]:w-full max-[380px]:aspect-[4/3] w-32 [380px]:h-24 object-cover rounded-md"
      />
    </div>
  );
}
