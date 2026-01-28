import {
  Event,
  EventCallback,
  EventPayloads,
  EventPublisher,
  EventSubscriber,
} from "./Events";

type SubscriberPair = {
  [K in Event]: {
    event: K;
    callback: EventCallback<K>;
  };
}[Event];

export class EventBus implements EventPublisher, EventSubscriber {
  private subscribers: Array<SubscriberPair> = [];

  constructor() {}

  publish<T extends Event>(event: T, data: EventPayloads[T]) {
    const fire = this.subscribers.filter((sub) => sub.event === event);

    fire.forEach((sub) => (sub.callback as EventCallback<T>)(data));
  }

  subscribe<T extends Event>(event: T, callback: EventCallback<T>) {
    this.subscribers.push({ event, callback } as SubscriberPair);
  }
}
