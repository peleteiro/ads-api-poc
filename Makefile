.DEFAULT_GOAL = dev
.PHONY: *
SHELL := /bin/bash

clean:
	@rm -rf lib .tmp/lib

bootstrap:

update:
	@npx -y npm-check-updates --upgrade
	@npm i

lint:
	@npm run format
	@npm run lint

prepare:

test:
	@NODE_OPTIONS=--experimental-vm-modules node_modules/.bin/jest

build: clean lint
	@npm run build
