export type CreateRestaurantDTO = {
  name: string;
  address: string;
};

export type UpdateRestaurantDTO = Partial<CreateRestaurantDTO>;
