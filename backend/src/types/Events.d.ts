export enum Event {
  OrderCreated,
  OrderPaid,
  OrderReadyForDelivery,
  OrderFinished,
}

interface OrderEventPayloads {
  [Event.OrderCreated]: object;
  [Event.OrderPaid]: object;
  [Event.OrderReadyForDelivery]: object;
  [Event.OrderFinished]: object;
}

export type EventData<T extends Event> = OrderEventPayloads[T];

export interface EventPublisher {
  publish: <T extends Event>(ev: T, data: EventData<T>) => void;
}

export interface EventSubscriber {
  subscribe: <T extends Event>(event: T, callback: EventCallback) => void;
}

type EventCallback = <T extends Event>(data: EventData<T>) => void;

export type Channel = Map<Event, EventCallback>;
