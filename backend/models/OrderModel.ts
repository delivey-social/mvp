import mongoose, { Document, Schema } from "mongoose";

enum OrderStatus {
  WAITING_PAYMENT = "WAITING_PAYMENT",
  PREPARING = "PREPARING",
  READY_FOR_DELIVERY = "READY_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
}

export interface Order extends Document {
  items: {
    item_id: string;
    quantity: number;
  }[];
  user: {
    email: string;
    phone_number: string;
    address: string;
  };
  observation?: string;
  status: OrderStatus;
}

const orderSchema = new Schema<Order>(
  {
    items: [
      {
        _id: false,
        item_id: { type: String, required: true },
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
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<Order>("Order", orderSchema);

export default OrderModel;
