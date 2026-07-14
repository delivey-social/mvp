from typing import Any, Callable, TypeVar

from src.application.types.event_bus import EventBus, Event

T = TypeVar("T")


class InMemoryEventBus(EventBus):
    def __init__(self) -> None:
        self.subscribers: dict[Event[Any], list[Callable[[Any], None]]] = {}

    def subscribe(
        self,
        event: Event[T],
        callback: Callable[[T], None],
    ) -> None:
        if event not in self.subscribers:
            self.subscribers[event] = []

        self.subscribers[event].append(callback)

    def publish(self, event: Event[T], data: T) -> None:
        for callback in self.subscribers.get(event, []):
            callback(data)
