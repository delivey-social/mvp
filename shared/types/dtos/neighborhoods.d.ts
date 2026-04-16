export interface NeighborhoodDTO {
  id: string;
  name: string;
  deliveryFee: number;
}

export type CreateNeighborhoodDTO = Omit<NeighborhoodDTO, "id">;
export type UpdateNeighborhoodDTO = Partial<CreateNeighborhoodDTO>;
