CREATE INDEX IF NOT EXISTS inspections_pcv_idx ON inspections (pcv)
WHERE
    pcv IS NOT NULL;