docker-compose -f docker-compose.yaml -f docker-compose.test.yaml up -d
docker exec -it tracker_server_test bash -c "npm install && npm test"
