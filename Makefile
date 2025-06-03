COMPOSE=docker compose
SCRIPT_DIR=./k6-scripts
RESULTS_DIR=./results
TIMESTAMP=$(shell date +%s)

load-create:
	$(COMPOSE) run --rm --entrypoint "" \
		-v $(SCRIPT_DIR):/scripts \
		-v $(RESULTS_DIR):/results \
		-e VUS=$(VUS) \
		-e ITERATIONS=$(ITERATIONS) \
		-e HOST=$(HOST) \
		k6 k6 run --out experimental-prometheus-rw=http://otel-collector:9464/metrics /scripts/shortenTest.js \
		2>&1 | tee $(RESULTS_DIR)/short-keys-$(TIMESTAMP).txt

