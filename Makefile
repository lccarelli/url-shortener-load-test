COMPOSE=docker compose
SCRIPT_DIR=./k6-scripts
RESULTS_DIR=./results
TIMESTAMP=$(shell date +%s)

load-create:
	$(COMPOSE) run --rm --entrypoint "" \
		-v $(SCRIPT_DIR):/scripts \
		-v $(RESULTS_DIR):/results \
		k6 k6 run /scripts/shortenTest.js 2>&1 | tee $(RESULTS_DIR)/short-keys.txt

clean-keys:
	grep 'msg=' results/short-keys.txt | sed -E 's/.*msg=([a-z0-9]+).*/\1/' | sort | uniq > results/valid-keys.txt

load-lookup:
	-$(COMPOSE) run --rm --entrypoint "" \
		-v $(SCRIPT_DIR):/scripts \
		-v $(RESULTS_DIR):/results \
		k6 k6 run /scripts/lookupTest.js || true



