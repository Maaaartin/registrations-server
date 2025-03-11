docker run --rm --name infra-container --network registrations-server_app_network --env-file .env -v /root/app:/app/data infra-image "$@"
