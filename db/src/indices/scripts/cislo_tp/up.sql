CREATE INDEX IF NOT EXISTS registrations_cislo_tp_idx ON registrations (cislo_tp)
WHERE
    cislo_tp IS NOT NULL;