import express, { Request, Response, Express } from "express";

import { OrderService } from "./service";

import validateRequest from "@/middleware/validateRequest";

import orderSchema from "./schemas";
import { withId } from "@/shared/idSchema";
import validateStringParam from "@/utils/validateStringParam";

export class OrderHandler {
  constructor(
    app: Express,
    private service: OrderService,
  ) {
    const router = express.Router();

    router.get(
      "/confirm_payment",
      validateRequest(orderSchema.registerPayment, "query"),
      this.registerPayment.bind(this),
    );
    router.get(
      "/ready_for_delivery",
      validateRequest(orderSchema.readyForDelivery, "query"),
      this.readyForDelivery.bind(this),
    );
    router.get(
      "/delivered",
      validateRequest(orderSchema.delivered, "query"),
      this.delivered.bind(this),
    );
    router.post(
      "/",
      validateRequest(orderSchema.create, "body"),
      this.createOrder.bind(this),
    );
    router.delete(
      "/:id",
      validateRequest(withId, "params"),
      this.delete.bind(this),
    );
    router.patch(
      "/:id",
      validateRequest(withId, "params"),
      validateRequest(orderSchema.update, "body"),
      this.update.bind(this),
    );
    router.get("/", this.list.bind(this));

    app.use("/orders", router);
  }

  async createOrder(req: Request, res: Response) {
    const order = await this.service.create(req.body);

    res.status(201).json(order);
  }

  async registerPayment(req: Request, res: Response) {
    const result = await this.service.registerPayment(req.query.id as string);

    if (!result.success) {
      res.status(400).json(result.message);
      return;
    }

    res.status(200).json({ message: "Payment registered successfully" });
  }

  async readyForDelivery(req: Request, res: Response) {
    const result = await this.service.readyForDelivery(req.query.id as string);

    if (!result.success) {
      res.status(400).json(result.message);
      return;
    }

    res.status(200).json({ message: "Order is ready for delivery" });
  }

  async delivered(req: Request, res: Response) {
    const result = await this.service.delivered(req.query.id as string);

    if (!result.success) {
      res.status(400).json(result.message);
      return;
    }

    res.status(200).json({ message: "Order marked as finished" });
  }

  async list(req: Request, res: Response) {
    const orders = await this.service.list();

    res.status(200).json(orders);
  }

  async delete(req: Request, res: Response) {
    const id = validateStringParam(req.params.id);

    await this.service.delete(id);

    res.status(200).json({ message: "Order deleted successfully" });
  }

  async update(req: Request, res: Response) {
    const id = validateStringParam(req.params.id);

    await this.service.update(id, req.body);

    res.status(200).json({
      message: "Order updated successfully",
    });
  }
}
