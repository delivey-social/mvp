import { Types } from "mongoose";

export interface CreateMenuItemRequest {
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: string;
}

export interface MenuItem {
  id: Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: Types.ObjectId;
}
