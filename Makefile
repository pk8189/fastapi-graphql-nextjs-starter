SHELL := /bin/bash

MODULE=fastapi-graphql
CONDA_ACTIVATE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda activate
CONDA_CREATE=echo "y" | conda create -n fastapi-graphql python=3.9
RUN_DEV=uvicorn app.backend.main:app --reload
RUN_PROD=uvicorn app.backend.main:app --host 0.0.0.0 --port 7000


.PHONY: env
env:
	$(CONDA_CREATE) 
	($(CONDA_ACTIVATE) $(MODULE); poetry install)

.PHONY: run-dev
run-dev:
	($(CONDA_ACTIVATE) $(MODULE); $(RUN_DEV))

.PHONY: run-prod
run-prod:
	($(CONDA_ACTIVATE) $(MODULE); $(RUN_PROD))

.PHONY: git-hooks
git-hooks:
	chmod +x githooks/*
	mkdir -p .git/hooks
	cd .git/hooks && ln -sf ../../githooks/* .