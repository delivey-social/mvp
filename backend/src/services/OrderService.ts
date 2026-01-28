import { OrderStatus } from "../types/OrderStatus.d";
import { CreateOrderRequest, EnrichedOrderDTO, Order } from "../types/Order";

import { OrderRepository } from "../order/repository";
import { OrderService as IOrderService, Result } from "../order/service";

import { Event, EventPublisher } from "../notifications/Events";
import { NeighborhoodService } from "./NeighborhoodService.d";
import { MenuItemsService } from "./MenuItemsService.d";

export class OrderService implements IOrderService {
  constructor(
    private repository: OrderRepository,
    private eventPublisher: EventPublisher,
    private neighborhoodService: NeighborhoodService,
    private menuItemsService: MenuItemsService,
  ) {}

  async getOrderById(id: string): Promise<Order | null> {
    return await this.repository.findById(id);
  }

  async createOrder(data: CreateOrderRequest): Promise<string> {
    const deliveryFee = await this.neighborhoodService.getDeliveryFee(
      data.neighborhoodId,
    );

    const items = await Promise.all(
      data.items.map(async (item) => {
        const menuItem = await this.menuItemsService.findById(item.id);
        if (!menuItem) {
          throw new Error(`Menu item with id ${item.id} not found`);
        }
        return {
          ...item,
          priceSnapshot: menuItem.price,
        };
      }),
    );

    const enrichedOrder: EnrichedOrderDTO = {
      ...data,
      items,
      deliveryFee,
    };

    console.log("Enriched Order:", enrichedOrder);
    const order = await this.repository.create(enrichedOrder);

    this.eventPublisher.publish(Event.OrderCreated, order);

    return order.id;
  }

  async registerPayment(id: string): Promise<Result> {
    const order = await this.repository.findById(id);

    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    if (order.status !== OrderStatus.WaitingPayment) {
      return {
        success: false,
        message: "Invalid status",
      };
    }

    await this.repository.changeStatus(id, OrderStatus.Preparing);

    this.eventPublisher.publish(Event.OrderPaid, order);

    return { success: true };
  }

  async readyForDelivery(id: string): Promise<Result> {
    const order = await this.repository.findById(id);

    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    if (order.status !== OrderStatus.Preparing) {
      return {
        success: false,
        message: "Invalid status",
      };
    }

    await this.repository.changeStatus(id, OrderStatus.ReadyForDelivery);

    this.eventPublisher.publish(Event.OrderReadyForDelivery, order);

    return { success: true };
  }

  async delivered(id: string): Promise<Result> {
    const order = await this.repository.findById(id);

    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    if (order.status !== OrderStatus.ReadyForDelivery) {
      return {
        success: false,
        message: "Invalid status",
      };
    }

    await this.repository.changeStatus(id, OrderStatus.Finished);

    this.eventPublisher.publish(Event.OrderFinished, order);

    return { success: true };
  }
}
