export interface CreateMenuItemDTO {
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: string;
}

export type UpdateMenuItemDTO = Partial<CreateMenuItemDTO>;
