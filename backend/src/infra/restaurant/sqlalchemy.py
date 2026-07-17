from typing import Callable
from contextlib import AbstractContextManager
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import update

from src.domain.restaurant import MenuItem, Restaurant
from src.domain.types.repositories.restaurant import RestaurantRepository
from src.infra.db.models.restaurant import RestaurantModel, MenuItemModel
from src.exceptions import EntityNotFoundException


class SQLAlchemyRestaurantRepository(RestaurantRepository):
    def __init__(
        self,
        session_factory: Callable[[], AbstractContextManager[Session]],
    ):
        self.session_factory = session_factory

    def create(self, restaurant: Restaurant):
        with self.session_factory() as session:
            session.add(RestaurantModel.from_domain(restaurant))
            session.commit()

    def update(self, restaurant: Restaurant):
        stmt = (
            update(RestaurantModel)
            .where(RestaurantModel.id == restaurant.id)
            .values(
                name=restaurant.name,
                address=restaurant.address,
                cnpj=str(restaurant.CNPJ),
            )
        )

        with self.session_factory() as session:
            result = session.execute(stmt)
            session.commit()

        if result.rowcount == 0:  # type: ignore
            raise EntityNotFoundException(
                f"Restaurant with id {restaurant.id} not found."
            )

    def delete(self, restaurant_id: UUID):
        with self.session_factory() as session:
            restaurant = session.get(RestaurantModel, restaurant_id)

            if restaurant is None:
                raise EntityNotFoundException(
                    f"Restaurant with id {restaurant_id} not found."
                )

            session.delete(restaurant)
            session.commit()

    def get_restaurant_by_id(self, id: UUID) -> Restaurant:
        with self.session_factory() as session:
            restaurant = session.get(RestaurantModel, id)

            if restaurant is None:
                raise EntityNotFoundException(
                    f"Restaurant with id {id} not found.",
                )

            return RestaurantModel.to_domain(restaurant)

    def list_(self) -> list[Restaurant]:
        with self.session_factory() as session:
            restaurants = session.query(RestaurantModel).all()

            return [RestaurantModel.to_domain(r) for r in restaurants]

    def list_menu_items(self, restaurant_id: UUID) -> list[MenuItem]:
        with self.session_factory() as session:
            restaurant = session.get(RestaurantModel, restaurant_id)

            if restaurant is None:
                raise EntityNotFoundException(
                    f"Restaurant with id {restaurant_id} not found.",
                )

            menu_items = (
                session.query(MenuItemModel)
                .filter(MenuItemModel.restaurant_id == restaurant_id)
                .all()
            )

            return [MenuItemModel.to_domain(mi) for mi in menu_items]

    def exists(self, restaurant_id: UUID) -> bool:
        with self.session_factory() as session:
            restaurant = session.get(RestaurantModel, restaurant_id)
            return restaurant is not None

    def create_menu_item(self, menu_item: MenuItem) -> None:
        if not self.exists(menu_item.restaurant_id):
            raise EntityNotFoundException(
                f"Restaurant with id {menu_item.restaurant_id} not found.",
            )

        with self.session_factory() as session:
            session.add(MenuItemModel.from_domain(menu_item))
            session.commit()

    def update_menu_item(self, menu_item: MenuItem) -> None:
        if not self.exists(menu_item.restaurant_id):
            raise EntityNotFoundException(
                f"Restaurant with id {menu_item.restaurant_id} not found.",
            )

        model = MenuItemModel.from_domain(menu_item)
        model_without_id = {
            key: value
            for key, value in model.__dict__.items()
            if key != "id" and not key.startswith("_sa_")
        }

        stmt = (
            update(MenuItemModel)
            .where(MenuItemModel.id == menu_item.id)
            .values(**model_without_id)
        )

        with self.session_factory() as session:
            result = session.execute(stmt)
            session.commit()

        if result.rowcount == 0:  # type: ignore
            raise EntityNotFoundException(
                f"Menu item with id {menu_item.id} not found.",
            )

    def delete_menu_item(
        self,
        menu_item_id: UUID,
        restaurant_id: UUID,
    ) -> None:
        if not self.exists(restaurant_id):
            raise EntityNotFoundException(
                f"Restaurant with id {restaurant_id} not found.",
            )

        with self.session_factory() as session:
            menu_item = session.get(MenuItemModel, menu_item_id)

            if menu_item is None or menu_item.restaurant_id != restaurant_id:
                raise EntityNotFoundException(
                    f"Menu item with id {menu_item_id} not found for restaurant {restaurant_id}.",
                )

            session.delete(menu_item)
            session.commit()

    def get_menu_items_by_ids(
        self, restaurant_id: UUID, menu_item_ids: list[UUID]
    ) -> list[MenuItem]:
        if not self.exists(restaurant_id):
            raise EntityNotFoundException(
                f"Restaurant with id {restaurant_id} not found.",
            )

        with self.session_factory() as session:
            menu_items = (
                session.query(MenuItemModel)
                .filter(
                    MenuItemModel.restaurant_id == restaurant_id,
                    MenuItemModel.id.in_(menu_item_ids),
                )
                .all()
            )

            return [MenuItemModel.to_domain(mi) for mi in menu_items]

    def get_menu_item_by_id(self, restaurant_id: UUID, menu_item_id: UUID) -> MenuItem:
        if not self.exists(restaurant_id):
            raise EntityNotFoundException(
                f"Restaurant with id {restaurant_id} not found.",
            )

        with self.session_factory() as session:
            menu_item = session.get(MenuItemModel, menu_item_id)

            if menu_item is None or menu_item.restaurant_id != restaurant_id:
                raise EntityNotFoundException(
                    f"Menu item with id {menu_item_id} not found for restaurant {restaurant_id}.",
                )

            return MenuItemModel.to_domain(menu_item)
