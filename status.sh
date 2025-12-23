#!/usr/bin/env bash
set -euo pipefail

echo "Content-Type: text/plain"
echo

echo -e "NAME\tSTATUS\tHEALTH\tCPU%\tMEM%\tMEM_USED\tMEM_LIMIT\tPIDS"

# Collect container IDs and names
containers=$(docker ps -a --format '{{.ID}} {{.Names}}')

while read -r id name; do
  # Pull a single snapshot; suppress errors if the container vanishes
  stat_line=$(docker stats --no-stream --format '{{.CPUPerc}}|{{.MemPerc}}|{{.MemUsage}}|{{.PIDs}}' "$id" 2>/dev/null || true)
  inspect_line=$(docker inspect -f '{{.State.Status}} {{if .State.Health}}{{.State.Health.Status}}{{else}}unknown{{end}}' "$id" 2>/dev/null || true)

  status="unknown"
  health="unknown"
  cpu="0"
  mem="0"
  mem_usage_raw=""
  mem_used="0"
  mem_limit="0"
  pids="0"

  if [[ -n "$inspect_line" ]]; then
    read -r status health <<<"$inspect_line"
  fi

  if [[ -n "$stat_line" ]]; then
    IFS='|' read -r cpu mem mem_usage_raw pids <<<"$stat_line"
    # mem_usage_raw like "12.5MiB / 1GiB"
    mem_usage_clean=${mem_usage_raw// /}
    mem_used=${mem_usage_clean%%/*}
    mem_limit=${mem_usage_clean##*/}
  fi

  printf "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n" \
    "$name" "$status" "$health" "$cpu" "$mem" "$mem_used" "$mem_limit" "$pids"
done <<<"$containers"
