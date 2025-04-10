import NeighborhoodModel from "../models/NeighborhoodModel";

const NeighborhoodService = {
  getDeliveryFee: async (id: string) => {
    const neighborhood = await NeighborhoodModel.findById(id);

    if (!neighborhood) {
      throw new Error("Neighborhood not found");
    }

    return neighborhood.baseTariff;
  },
};

export default NeighborhoodService;
