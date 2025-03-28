CREATE INDEX IF NOT EXISTS removed_vehicles_pcv_idx ON removed_vehicles (pcv)
WHERE
    pcv IS NOT NULL;