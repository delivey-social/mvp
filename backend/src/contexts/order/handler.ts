import express, { Request, Response, Express } from "express";

import { BadRequestError } from "../../errors/HTTPError";

import orderSchema from "./schema";
import { OrderService } from "./service";
import { UpdateOrderRequest } from "./types";

export class OrderHandler {
  constructor(
    app: Express,
    private service: OrderService,
  ) {
    const router = express.Router();

    router.get("/confirm_payment", this.registerPayment.bind(this));
    router.get("/ready_for_delivery", this.readyForDelivery.bind(this));
    router.get("/delivered", this.delivered.bind(this));
    router.post("/", this.createOrder.bind(this));
    router.delete("/:id", this.delete.bind(this));
    router.patch("/:id", this.update.bind(this));
    router.get("/", this.list.bind(this));

    app.use("/orders", router);
  }

  async createOrder(req: Request, res: Response) {
    // TODO: Remove orderSchema dependency from here
    const { data, error } = orderSchema.create.safeParse(req.body);

    if (error) {
      throw new BadRequestError("Invalid order data");
    }

    const id = await this.service.createOrder(data);

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
    const result = await this.service.registerPayment(id);

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
    const result = await this.service.readyForDelivery(id);

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
    const result = await this.service.delivered(id);
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
    const { id } = req.params;
    const success = await this.service.delete(id);

    if (!success) {
      res.status(400).json({ message: "Failed to delete order" });
      return;
    }

    res.status(200).json({ message: "Order deleted successfully" });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const data: UpdateOrderRequest = req.body;

    await this.service.update(id, data);

    res.status(200).json({
      message: "Order updated successfully",
    });
  }
}
