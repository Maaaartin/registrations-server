docker run --rm --name infra-container --network registrations-server_app_network --env-file .env -v /Users/martin/Downloads:/app/data infra-image "$@"
