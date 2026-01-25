export enum Event {
  OrderCreated = "OrderCreated",
  OrderPaid = "OrderPaid",
  OrderReadyForDelivery = "OrderReadyForDelivery",
  OrderFinished = "OrderFinished",
}

export interface EventPayloads {
  [Event.OrderCreated]: object;
  [Event.OrderPaid]: object;
  [Event.OrderReadyForDelivery]: object;
  [Event.OrderFinished]: object;
}

export interface EventPublisher {
  publish: <T extends Event>(ev: T, data: EventPayloads[T]) => void;
}

export interface EventSubscriber {
  subscribe: <T extends Event>(event: T, callback: EventCallback<T>) => void;
}

export type EventCallback<T extends Event> = (data: EventPayloads[T]) => void;

export type Channel = {
  [K in Event]: EventCallback<K>;
};
