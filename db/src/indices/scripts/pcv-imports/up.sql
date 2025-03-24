CREATE INDEX IF NOT EXISTS imports_pcv_idx ON imports (pcv)
WHERE
    pcv IS NOT NULL;