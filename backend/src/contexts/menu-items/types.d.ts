import { Types } from "mongoose";

export interface CreateMenuItemRequest {
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: string;
}

export type UpdateMenuItemRequest = Partial<CreateMenuItemRequest>;

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: Types.ObjectId;
}
