export interface RestaurantService {
  create(data: CreateRestaurantRequest): Promise<string>;
}
