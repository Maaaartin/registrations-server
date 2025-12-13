docker run --rm --name infra-container --network app_app_network --env-file .env -v ./data/:/app/data infra-image "$@"
