#!/bin/bash

docker-compose down

COMPOSE_HTTP_TIMEOUT=200 docker-compose --compatibility up -d --build --force-recreate --no-deps

docker system prune -a -f

docker volume prune -f -a
