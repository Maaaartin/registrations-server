docker run --rm --name infra-container --network registrations-server_app_network --env-file .env -v ./data/data.csv:/app/data.csv infra-image "$@"
