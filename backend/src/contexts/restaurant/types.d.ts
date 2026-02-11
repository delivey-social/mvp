export type Restaurant = {
  id: string;
  name: string;
  address: string;
};

export type CreateRestaurantRequest = {
  name: string;
  address: string;
};

export type UpdateRestaurantRequest = Partial<CreateRestaurantRequest>;
