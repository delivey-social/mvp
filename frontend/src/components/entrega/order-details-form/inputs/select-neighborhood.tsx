import axios from "axios";

import { useContext, useEffect, useState } from "react";

import Select from "@/components/ui/select";

import { OrderContext } from "@/contexts/order/OrderContext";
import { NeighborhoodDTO } from "@shared/types/dtos/neighborhoods";

export default function SelectNeighborhood({
  selectedNeighborhoodId,
  setSelectedNeighborhood,
}: {
  selectedNeighborhoodId: string;
  setSelectedNeighborhood: (neighborhood: NeighborhoodDTO) => void;
}) {
  const { setUserProperty } = useContext(OrderContext);
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodDTO[]>([]);

  useEffect(() => {
    axios
      .get<
        NeighborhoodDTO[]
      >(`${import.meta.env.VITE_BACKEND_URL}/neighborhoods`)
      .then((data) => {
        setNeighborhoods(data.data);
      });
  }, []);

  return (
    <Select
      required
      defaultValue={selectedNeighborhoodId ?? ""}
      onChange={(ev) => {
        setSelectedNeighborhood(
          neighborhoods.find(
            (neighborhood) =>
              neighborhood.id === (ev.target as HTMLSelectElement).value,
          )!,
        );
        setUserProperty(
          "neighborhoodId",
          (ev.target as HTMLSelectElement).value,
        );
      }}
    >
      <option disabled value="">
        Bairro
      </option>
      {neighborhoods.map((neighborhood) => (
        <option key={neighborhood.id} value={neighborhood.id}>
          {neighborhood.name}
        </option>
      ))}
    </Select>
  );
}
