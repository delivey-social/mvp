from abc import ABC, abstractmethod
from pathlib import Path
from typing import IO


class ImageRepository(ABC):
    @abstractmethod
    async def save(self, image_bytes: IO[bytes], relative_path: Path) -> Path: ...

    @abstractmethod
    async def delete(self, relative_path: Path) -> None: ...

    @abstractmethod
    async def replace(
        self, image_bytes: IO[bytes], relative_path: Path, new_filename: str
    ) -> Path: ...
