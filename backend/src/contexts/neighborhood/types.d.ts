export interface Neighborhood {
  id: string;
  name: string;
  deliveryFee: number;
}

export type CreateNeighborhoodRequest = Omit<Neighborhood, "id">;
