import { Channel, EventSubscriber } from "../types/Events";

export class NotificationsService {
  constructor(channels: Channel[], subscriber: EventSubscriber) {
    channels.forEach((ch) => {
      ch.forEach((cb, ev) => {
        subscriber.subscribe(ev, cb);
      });
    });
  }
}
