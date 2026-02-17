export interface CreateMenuItemRequest {
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: string;
}

export type UpdateMenuItemRequest = Partial<CreateMenuItemRequest>;
