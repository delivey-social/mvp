import {
  Event,
  EventCallback,
  EventData,
  EventPublisher,
  EventSubscriber,
} from "../types/Events";

export class EventBus implements EventPublisher, EventSubscriber {
  private subscribers: Array<{ event: Event; callback: EventCallback }> = [];

  constructor() {}

  publish<T extends Event>(event: T, data: EventData<T>) {
    const fire = this.subscribers.filter((sub) => sub.event === event);

    fire.forEach((sub) => sub.callback(data));
  }

  subscribe<T extends Event>(event: T, callback: EventCallback) {
    this.subscribers.push({ event, callback });
  }
}
