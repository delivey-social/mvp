import { useContext } from "react";
import { OrderContext } from "@/contexts/order/OrderContext";

import { Neighborhood } from "@shared/types/neighborhoods";

import Input from "@/components/ui/input";
import SelectNeighborhood from "./select-neighborhood";

interface InputsAreaProps {
  setSelectedNeighborhood: (neighborhood: Neighborhood) => void;
}

export default function InputsArea({
  setSelectedNeighborhood,
}: InputsAreaProps) {
  const { user, setUserProperty } = useContext(OrderContext);

  return (
    <>
      <Input
        type="email"
        placeholder="email"
        name="email"
        required
        value={user.email}
        onChange={(ev) =>
          setUserProperty("email", (ev.target as HTMLInputElement).value)
        }
      />

      <Input
        type="text"
        placeholder="Telefone"
        name="phoneNumber"
        required
        value={user.phoneNumber}
        onChange={(ev) =>
          setUserProperty("phoneNumber", (ev.target as HTMLInputElement).value)
        }
      />

      <Input
        type="text"
        placeholder="Endereço"
        name="address"
        required
        value={user.address}
        onChange={(ev) =>
          setUserProperty("address", (ev.target as HTMLInputElement).value)
        }
      />

      <SelectNeighborhood
        selectedNeighborhoodId={user.neighborhoodId}
        setSelectedNeighborhood={setSelectedNeighborhood}
      />

      <Input type="text" placeholder="Observações" name="observations" />
    </>
  );
}
