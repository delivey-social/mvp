from contextlib import AbstractContextManager
from typing import Callable
from uuid import UUID
from sqlalchemy import inspect, update
from sqlalchemy.orm import Session

from src.exceptions import EntityNotFoundException
from src.domain.types.repositories.order import OrderRepository
from src.infra.db.models.order import OrderItemModel, OrderModel
from src.domain.order import Order


class SQLAlchemyOrderRepository(OrderRepository):
    def __init__(
        self,
        session_factory: Callable[
            [],
            AbstractContextManager[Session],
        ],
    ):
        self.session_factory = session_factory

    def create(self, order: Order) -> None:
        with self.session_factory() as session:
            session.add(OrderModel.from_domain(order))

            for item in order.items:
                session.add(OrderItemModel.from_domain(order.id, item))

            session.commit()

    def update(self, order: Order) -> None:
        model = OrderModel.from_domain(order)
        model_data = {
            column.key: getattr(model, column.key)
            for column in inspect(OrderModel).mapper.column_attrs
            if column.key != "id"
        }

        stmt = update(OrderModel).where(OrderModel.id == order.id).values(**model_data)

        with self.session_factory() as session:
            result = session.execute(stmt)

            for item in order.items:
                session.execute(
                    update(OrderItemModel)
                    .where(
                        OrderItemModel.order_id == order.id,
                        OrderItemModel.product_id == item.product_id,
                    )
                    .values(
                        price_snapshot=item.price,
                        quantity=item.quantity,
                    )
                )

            session.commit()

        if result.rowcount == 0:  # type: ignore
            raise EntityNotFoundException(
                f"Order with id {order.id} not found.",
            )

    def delete(self, id: UUID) -> None:
        with self.session_factory() as session:
            order = session.get(OrderModel, id)

            if order is None:
                raise EntityNotFoundException(
                    f"Order with id {id} not found.",
                )

            session.delete(order)
            session.commit()

    def list_(self) -> list[Order]:
        with self.session_factory() as session:
            orders = session.query(OrderModel).all()

            return [OrderModel.to_domain(o) for o in orders]

    def get_by_id(self, id: UUID) -> Order:
        with self.session_factory() as session:
            order = session.get(OrderModel, id)

            if order is None:
                raise EntityNotFoundException(
                    f"Order with id {id} not found.",
                )

            return OrderModel.to_domain(order)
