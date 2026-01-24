import mongoose, { Document, Schema } from "mongoose";

import { Order } from "../types/order";
import { OrderStatus } from "../types/OrderStatus";
import { PaymentMethods } from "../types/PaymentMethods";

export type OrderDocument = Order & Document;

const orderSchema = new Schema<OrderDocument & Document>(
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
      phoneNumber: { type: String, required: true },
      address: { type: String, required: true },
    },
    observation: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.WaitingPayment,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethods),
      required: true,
    },
    itemsTotal: {
      type: Number,
      default: function () {
        return this.items
          .map((i) => i.priceSnapshot)
          .reduce((i, acc) => (acc += i), 0);
      },
    },
    appFee: {
      type: Number,
      default: function () {
        return this.itemsTotal * 0.1;
      },
    },
    totalAmount: {
      type: Number,
      default: function () {
        return this.itemsTotal + this.deliveryFee + this.appFee;
      },
    },
  },
  { timestamps: true },
);

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);

export default OrderModel;
