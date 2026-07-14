from abc import ABC, abstractmethod
from typing import Callable, Generic, TypeVar

T = TypeVar("T")


class Event(Generic[T]):
    """A typed event marker. T is the data type carried by this event."""

    def __init__(self, name: str) -> None:
        self._name = name

    def __repr__(self) -> str:
        return f"Event({self._name!r})"


class EventBus(ABC):
    """Event bus interface for publishing and subscribing to events."""

    @abstractmethod
    def subscribe(
        self,
        event: Event[T],
        callback: Callable[[T], None],
    ) -> None: ...

    @abstractmethod
    def publish(
        self,
        event: Event[T],
        data: T,
    ) -> None: ...
