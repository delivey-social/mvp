.PHONY: api-types

api-types:
	$(MAKE) -C backend openapi
	cd dashboard && npm run api-types