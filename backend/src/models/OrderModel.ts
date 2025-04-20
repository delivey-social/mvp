import mongoose, { Document, Schema } from "mongoose";

import { OrderStatus } from "../types/OrderStatus";
import { PaymentMethods } from "../types/PaymentMethods";

export interface CreateOrder {
  items: {
    id: string;
    quantity: number;
  }[];
  user: {
    email: string;
    phone_number: string;
    address: string;
  };
  priceDetails: {
    deliveryFee: number;
    appFee: number;
    itemsPrice: number;
  };
  observation?: string;
  payment_method: PaymentMethods;
}

export interface Order extends CreateOrder {
  status: OrderStatus;
  orderTotal: number;
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
    priceDetails: {
      deliveryFee: { type: Number, required: true },
      appFee: { type: Number, required: true },
      itemsPrice: { type: Number, required: true },
    },
    orderTotal: {
      type: Number,
      required: true,
      default: function () {
        return Object.values(this.priceDetails).reduce((acc, item) => {
          return acc + item;
        }, 0);
      },
    },
    payment_method: {
      type: String,
      enum: Object.values(PaymentMethods),
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<Order>("Order", orderSchema);

export default OrderModel;
