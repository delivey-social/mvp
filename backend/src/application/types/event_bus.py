from abc import ABC, abstractmethod
from typing import Callable
from .events import Event, T


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
