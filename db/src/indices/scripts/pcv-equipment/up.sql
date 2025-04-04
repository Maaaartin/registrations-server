CREATE INDEX IF NOT EXISTS equipment_pcv_idx ON equipment (pcv)
WHERE
    pcv IS NOT NULL;