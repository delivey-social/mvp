import { Channel, Event, EventCallback, EventSubscriber } from "./Events";

export class NotificationsService {
  constructor(channels: Channel[], subscriber: EventSubscriber) {
    channels.forEach((ch) => {
      (Object.entries(ch) as [Event, EventCallback<Event>][]).forEach(
        ([event, callback]) => {
          subscriber.subscribe(event, callback);
        },
      );
    });
  }
}
