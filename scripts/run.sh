#!/bin/sh
echo "Test load script started..."

docker-compose run --service-ports k6 run /scripts/backend-api/manifest.js -i=100 --vus 10 --duration 30s
docker-compose run --service-ports k6 run /scripts/backend-api/register.js -i=100 --vus 10 --duration 30s
docker-compose run --service-ports k6 run /scripts/backend-api/login.js -i=100 --vus 10 --duration 30s
docker-compose run --service-ports k6 run /scripts/backend-api/checkToken.js -i=100 --vus 10 --duration 30s

echo "Test load script done"
