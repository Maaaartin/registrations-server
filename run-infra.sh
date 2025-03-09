docker run --rm --name infra-container --network registrations-server_app_network --env-file .env infra-image "$@"
