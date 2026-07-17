.PHONY: dev typecheck openapi

dev:
	uv run fastapi dev src/main.py --reload --port 8000

typecheck:
	uv run pyright

openapi:
	uv run -m src.scripts.generate_openapi > openapi.json