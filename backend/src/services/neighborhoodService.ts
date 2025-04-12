import { ResourceNotFoundError } from "../errors/HTTPError";
import NeighborhoodModel from "../models/NeighborhoodModel";

const NeighborhoodService = {
  getDeliveryFee: async (id: string) => {
    const neighborhood = await NeighborhoodModel.findById(id);

    if (!neighborhood) {
      throw new ResourceNotFoundError("Neighborhood");
    }

    return neighborhood.baseTariff;
  },
};

export default NeighborhoodService;
