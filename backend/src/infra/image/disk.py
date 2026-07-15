from pathlib import Path
import shutil
from typing import IO

from src.domain.types.repositories.image import ImageRepository


class DiskImageRepository(ImageRepository):
    def __init__(self, base_dir: str, public_url_prefix: str):
        self.base_dir = Path(base_dir)
        self.public_url_prefix = public_url_prefix

        self.base_dir.mkdir(parents=True, exist_ok=True)

    async def save(self, image_bytes: IO[bytes], filename: str):
        safe_filename = Path(filename).name
        file_path = self.base_dir / safe_filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image_bytes, buffer)

        return Path(self.public_url_prefix, safe_filename)

    async def delete(self, public_path: Path):
        filename = public_path.name
        file_path = self.base_dir / filename

        if file_path.exists():
            file_path.unlink()
