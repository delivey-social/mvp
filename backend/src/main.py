from typing import Any

from fastapi import FastAPI
from fastapi.responses import JSONResponse

from src.infra.db.models.base import Base
from src.infra.db.config import engine

from .exceptions import (
    EntityNotFoundException,
    InvalidReferenceException,
    InvalidStateException,
)

from .presentation.main import (
    config_router,
    neighborhood_router,
    order_router,
    restaurant_router,
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(config_router)
app.include_router(neighborhood_router)
app.include_router(order_router)
app.include_router(restaurant_router)


@app.get("/")
def ping():
    return {"message": "comida.app service is alive!"}


def handle_entity_not_found_exception(_: Any, exc: Exception):
    return JSONResponse(
        status_code=404,
        content={"message": str(exc)},
    )


def handle_invalid_state_exception(_: Any, exc: Exception):
    return JSONResponse(
        status_code=400,
        content={"message": str(exc)},
    )


app.add_exception_handler(
    EntityNotFoundException,
    handle_entity_not_found_exception,
)
app.add_exception_handler(
    InvalidStateException,
    handle_invalid_state_exception,
)
app.add_exception_handler(
    InvalidReferenceException,
    handle_invalid_state_exception,
)
