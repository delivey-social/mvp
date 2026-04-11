import { useContext } from "react";
import { OrderContext } from "../../../contexts/OrderContext";

import menu from "../../../menu_items.json";

import capitalize from "../../../utils/capitalize";
import MenuItem from "../../../routes/home/menu-item";

export default function CategoriesArea() {
  const { items, setItems } = useContext(OrderContext);

  function getProduct(id: string) {
    return items.find((product) => product.id === id);
  }

  function setProductQuantity(id: string) {
    return (quantity: number) => {
      if (quantity <= 0) {
        setItems((products) => products.filter((product) => product.id !== id));
        return;
      }

      if (items.find((product) => product.id === id)) {
        setItems((products) =>
          products.map((product) => {
            if (product.id !== id) return product;

            return { ...product, quantity: quantity };
          }),
        );
      } else {
        setItems((products) => [...products, { id, quantity }]);
      }
    };
  }

  return Object.entries(menu).map(([category, items]) => (
    <div key={category}>
      <h3 className="font-bold my-4">{capitalize(category)}</h3>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            quantity={getProduct(item.id)?.quantity ?? 0}
            setProductQuantity={setProductQuantity(item.id)}
          />
        ))}
      </div>
    </div>
  ));
}
