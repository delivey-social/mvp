import { Request, Response, Router } from "express";

import { BadRequestError } from "../src/errors/HTTPError";

import orderSchema from "../src/schemas/order";

import { OrderService } from "../src/services/OrderService.d";

export class OrderHandler {
  constructor(
    router: Router,
    private orderService: OrderService,
  ) {
    router.post("/", this.createOrder);
    router.get("/confirm_payment", this.registerPayment);
    router.get("/ready_for_delivery", this.readyForDelivery);
    router.get("/delivered", this.delivered);
  }

  async createOrder(req: Request, res: Response) {
    // TODO: Remove orderSchema dependency from here
    const { data, error } = orderSchema.create.safeParse(req.body);

    if (error) {
      throw new BadRequestError("Invalid order data");
    }

    const id = await this.orderService.createOrder(data);

    res.status(201).json({ message: "Order created successfully", id });
  }

  async registerPayment(req: Request, res: Response) {
    // TODO: Remove orderSchema dependency from here
    const { data, error: queryError } = orderSchema.registerPayment.safeParse(
      req.query,
    );

    if (queryError) {
      res.status(400).json("A valid order id is required");
      return;
    }

    const { id } = data;
    const result = await this.orderService.registerPayment(id);

    if (!result.success) {
      res.status(400).json(result.message);
      return;
    }

    res.status(200).json({ message: "Payment registered successfully" });
  }

  async readyForDelivery(req: Request, res: Response) {
    // TODO: Remove orderSchema dependency from here
    const { data, error: queryError } = orderSchema.readyForDelivery.safeParse(
      req.query,
    );

    if (queryError) {
      res.status(400).json("A valid order id is required");
      return;
    }

    const { id } = data;
    const result = await this.orderService.readyForDelivery(id);

    if (!result.success) {
      res.status(400).json(result.message);
      return;
    }

    res.status(200).json({ message: "Order is ready for delivery" });
  }

  async delivered(req: Request, res: Response) {
    // TODO: Remove orderSchema dependency from here
    const { data, error: queryError } = orderSchema.delivered.safeParse(
      req.query,
    );
    if (queryError) {
      res.status(400).json("A valid order id is required");
      return;
    }

    const { id } = data;
    const result = await this.orderService.delivered(id);
    if (!result.success) {
      res.status(400).json(result.message);
      return;
    }

    res.status(200).json({ message: "Order marked as finished" });
  }
}
