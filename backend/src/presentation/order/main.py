from fastapi import APIRouter


from src.application.order import OrderService
from .types import CreateOrderRequestDTO


class OrderRouter(APIRouter):
    def __init__(self, service: OrderService):
        self.service = service

        super().__init__(prefix="/order", tags=["Orders"])

        self.add_api_route("/", self.create, methods=["POST"])

    def create(self, request: CreateOrderRequestDTO):
        self.service.create(request)
