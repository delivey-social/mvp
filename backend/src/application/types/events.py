from typing import Generic, TypeVar

from src.domain.order import Order


T = TypeVar("T")


class Event(Generic[T]):
    """A typed event marker. T is the data type carried by this event."""

    def __init__(self, name: str) -> None:
        self._name = name

    def __repr__(self) -> str:
        return f"Event({self._name!r})"


OrderCreatedEvent: Event[Order] = Event("OrderCreatedEvent")
