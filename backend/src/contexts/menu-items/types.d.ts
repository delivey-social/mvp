import { Types } from "mongoose";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: Types.ObjectId;
}
