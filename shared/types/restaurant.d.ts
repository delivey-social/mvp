export type CreateRestaurantRequest = {
  name: string;
  address: string;
};

export type UpdateRestaurantRequest = Partial<CreateRestaurantRequest>;
