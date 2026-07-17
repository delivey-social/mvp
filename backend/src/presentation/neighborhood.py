from uuid import UUID

from fastapi import APIRouter

from src.types.neighborhood import (
    CreateNeighborhoodRequestDTO,
    ListNeighborhoodsResponseDTO,
    NeighborhoodDTO,
)
from src.application.neighborhood import NeighborhoodService


class NeighborhoodRouter(APIRouter):
    def __init__(self, service: NeighborhoodService):
        self.service = service

        super().__init__(prefix="/neighborhood", tags=["Neighborhoods"])

        self.add_api_route(
            "/",
            self.list_,
            methods=["GET"],
            response_model=ListNeighborhoodsResponseDTO,
        )
        self.add_api_route("/", self.create, methods=["POST"])
        self.add_api_route("/{id}", self.update, methods=["PUT"])
        self.add_api_route("/{id}", self.delete_, methods=["DELETE"])

    def list_(self):
        neighborhoods = self.service.list_()

        return ListNeighborhoodsResponseDTO(
            neighborhoods=[NeighborhoodDTO.from_domain(n) for n in neighborhoods]
        )

    def create(self, request: CreateNeighborhoodRequestDTO):
        self.service.create(request)

        return {"message": "Neighborhood created successfully!"}

    def update(self, id: UUID, request: CreateNeighborhoodRequestDTO):
        self.service.update(id, request)

        return {"message": "Neighborhood updated successfully!"}

    def delete_(self, id: UUID):
        self.service.delete(id)

        return {"message": "Neighborhood deleted successfully!"}
