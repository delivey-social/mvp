import menu from "../../public/menu_items.json";
import mongoose, { Document, Schema } from "mongoose";

import { OrderStatus } from "../types/OrderStatus";
import { PaymentMethods } from "../types/PaymentMethods";

export interface Order extends Document {
  items: {
    id: string;
    quantity: number;
  }[];
  user: {
    email: string;
    phone_number: string;
    address: string;
  };
  observation?: string;
  status: OrderStatus;
  deliveryFee: number;
  totalAmount: number;
  payment_method: PaymentMethods;
}

const orderSchema = new Schema<Order & Document>(
  {
    items: [
      {
        _id: false,
        id: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    user: {
      email: { type: String, required: true },
      phone_number: { type: String, required: true },
      address: { type: String, required: true },
    },
    observation: { type: String, required: false },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.WAITING_PAYMENT,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    payment_method: {
      type: String,
      enum: Object.values(PaymentMethods),
      required: true,
    },
    totalAmount: {
      type: Number,
      default: function () {
        let total = 0;

        this.items.forEach((item) => {
          const menuItems = Object.values(menu).flat();
          const menuItem = menuItems.find(
            (menuItem) => menuItem.id === item.id
          );
          if (menuItem) {
            total += menuItem.price * item.quantity;
          }
        });

        return total * 1.1 + this.deliveryFee; // Adding 10% tax and delivery fee
      },
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<Order>("Order", orderSchema);

export default OrderModel;
