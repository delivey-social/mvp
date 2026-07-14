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
