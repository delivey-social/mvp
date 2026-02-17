import { OrderStatus } from "./OrderStatus.d";
import {
  CreateOrderRequest,
  EnrichedOrderDTO,
  Order,
  UpdateOrderRequest,
} from "./types.d";
import { OrderRepository } from "./repository.d";
import { OrderService as IOrderService, Result } from "./service.d";
import { Event, EventPublisher } from "../notifications/Events.d";
import { MenuItemsService } from "../menu-items/service.d";
import { NeighborhoodService } from "../neighborhood/service.d";
import { ResourceNotFoundError } from "@/errors/HTTPError";

export class OrderService implements IOrderService {
  constructor(
    private repository: OrderRepository,
    private eventPublisher: EventPublisher,
    private neighborhoodService: NeighborhoodService,
    private menuItemsService: MenuItemsService,
  ) {}

  async findById(id: string): Promise<Order> {
    return await this.repository.findById(id);
  }

  async create(data: CreateOrderRequest): Promise<Order> {
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

    const order = await this.repository.create(enrichedOrder);

    this.eventPublisher.publish(Event.OrderCreated, order);

    return order;
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

  async list(): Promise<Order[]> {
    return await this.repository.list();
  }

  async delete(id: string): Promise<void> {
    const exists = await this.repository.delete(id);

    if (!exists) throw new ResourceNotFoundError("order");
  }

  async update(id: string, data: UpdateOrderRequest) {
    const originalOrder = await this.repository.findById(id);
    if (!originalOrder) {
      throw new ResourceNotFoundError("order");
    }

    let deliveryFee = originalOrder.deliveryFee;
    if (data.neighborhoodId) {
      deliveryFee = await this.neighborhoodService.getDeliveryFee(
        data.neighborhoodId,
      );
    }

    let items = originalOrder.items;
    if (data.items) {
      items = await Promise.all(
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
    }

    const enrichedOrder: Partial<EnrichedOrderDTO> = {
      ...originalOrder,
      ...data,
      items,
      deliveryFee,
    };

    const order = await this.repository.update(id, enrichedOrder);

    this.eventPublisher.publish(Event.OrderCreated, order);

    return order;
  }
}
