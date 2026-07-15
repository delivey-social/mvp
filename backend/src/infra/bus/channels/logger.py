from dataclasses import dataclass

from src.application.types.events import OrderCreatedEvent
from src.infra.bus.inmemory import Event, EventBus


@dataclass
class ExampleEventData:
    value: int


ExampleEvent: Event[ExampleEventData] = Event("ExampleEvent")


class Logger:
    def __init__(self, event_bus: EventBus) -> None:
        self.event_bus = event_bus

        event_bus.subscribe(
            OrderCreatedEvent,
            lambda data: print(f"Received OrderCreatedEvent with data: {data}"),
        )
