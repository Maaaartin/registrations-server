CREATE INDEX IF NOT EXISTS registrations_pcv_idx ON registrations (pcv)
WHERE
    pcv IS NOT NULL;