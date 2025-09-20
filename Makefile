.PHONY: build run dev stop

build:
	docker build -t control-api .

run:
	docker run -d --name control-api -p 3000:3000 control-api

dev:
	docker stop control-api || true && docker rm control-api || true
	docker-compose up --force-recreate

stop:
	docker stop control-api && docker rm control-api
