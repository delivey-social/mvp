from contextlib import AbstractContextManager
from typing import Callable
from uuid import UUID
from sqlalchemy import update
from sqlalchemy.orm import Session

from src.main import EntityNotFoundException
from src.domain.types.repositories.neighborhood import NeighborhoodRepository
from src.infra.db.models.neighborhood import NeighborhoodModel
from src.domain.neighborhood import Neighborhood


class SQLAlchemyNeighborhoodRepository(NeighborhoodRepository):
    def __init__(self, session_factory: Callable[[], AbstractContextManager[Session]]):
        self.session_factory = session_factory

    def create(self, neighborhood: Neighborhood):
        with self.session_factory() as session:
            session.add(NeighborhoodModel.from_domain(neighborhood))
            session.commit()

    def update(self, neighborhood: Neighborhood):
        stmt = (
            update(NeighborhoodModel)
            .where(NeighborhoodModel.id == neighborhood.id)
            .values(**neighborhood.model_dump(exclude={"id"}))
        )

        with self.session_factory() as session:
            result = session.execute(stmt)
            session.commit()

        if result.rowcount == 0:  # type: ignore
            raise EntityNotFoundException(
                f"Neighborhood with id {neighborhood.id} not found."
            )

    def delete(self, id: UUID):
        with self.session_factory() as session:
            neighborhood = session.get(NeighborhoodModel, id)

            if neighborhood is None:
                raise EntityNotFoundException(f"Neighborhood with id {id} not found.")

            session.delete(neighborhood)
            session.commit()

    def get_by_id(self, id: UUID) -> Neighborhood:
        with self.session_factory() as session:
            neighborhood = session.get(NeighborhoodModel, id)

            if neighborhood is None:
                raise EntityNotFoundException(f"Neighborhood with id {id} not found.")

            return NeighborhoodModel.to_domain(neighborhood)

    def list_(self) -> list[Neighborhood]:
        with self.session_factory() as session:
            neighborhoods = session.query(NeighborhoodModel).all()

            return [NeighborhoodModel.to_domain(n) for n in neighborhoods]
