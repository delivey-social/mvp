from uuid import UUID

from fastapi import APIRouter


from src.application.order import OrderService
from src.types.order import CreateOrderRequestDTO


class OrderRouter(APIRouter):
    def __init__(self, service: OrderService):
        self.service = service

        super().__init__(prefix="/order", tags=["Orders"])

        self.add_api_route(
            "/",
            self.list_,
            methods=["GET"],
        )
        self.add_api_route(
            "/",
            self.create,
            methods=["POST"],
        )
        self.add_api_route(
            "/{id}",
            self.update,
            methods=["PUT"],
        )
        self.add_api_route(
            "/{id}",
            self.delete_,
            methods=["DELETE"],
        )

        self.add_api_route(
            "/{id}/paid",
            self.paid,
            methods=["GET"],
        )
        self.add_api_route(
            "/{id}/ready-for-delivery",
            self.ready_for_delivery,
            methods=["GET"],
        )
        self.add_api_route(
            "/{id}/finished",
            self.finished,
            methods=["GET"],
        )

    def create(self, request: CreateOrderRequestDTO):
        self.service.create(request)

        return {"message": "Order created successfully"}

    def update(self, id: UUID, request: CreateOrderRequestDTO):
        self.service.update(id, request)

        return {"message": "Order updated successfully"}

    def list_(self):
        return self.service.list_()

    def delete_(self, id: UUID):
        self.service.delete(id)

        return {"message": "Order deleted successfully"}

    def paid(self, id: UUID):
        self.service.order_paid(id)

        return {"message": "Order paid successfully"}

    def ready_for_delivery(self, id: UUID):
        self.service.order_ready_for_delivery(id)

        return {"message": "Order ready for delivery successfully"}

    def finished(self, id: UUID):
        self.service.order_finished(id)

        return {"message": "Order finished successfully"}
