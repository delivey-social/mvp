export interface MenuItemDTO {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  restaurantId: string;
}

export type ListMenuItemDTO = MenuItemDTO[];

export interface CreateMenuItemDTO {
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: string;
}

export type UpdateMenuItemDTO = Partial<CreateMenuItemDTO>;
