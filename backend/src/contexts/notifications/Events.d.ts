import { Order } from "../order/types";

export enum Event {
  OrderCreated = "OrderCreated",
  OrderPaid = "OrderPaid",
  OrderReadyForDelivery = "OrderReadyForDelivery",
  OrderFinished = "OrderFinished",
}

export interface EventPayloads {
  [Event.OrderCreated]: Order;
  [Event.OrderPaid]: Order;
  [Event.OrderReadyForDelivery]: Order;
  [Event.OrderFinished]: Order;
}

export interface EventPublisher {
  publish: <T extends Event>(ev: T, data: EventPayloads[T]) => void;
}

export interface EventSubscriber {
  subscribe: <T extends Event>(event: T, callback: EventCallback<T>) => void;
}

export type EventCallback<T extends Event> = (data: EventPayloads[T]) => void;

export type Channel = {
  [K in Event]?: EventCallback<K>;
};
