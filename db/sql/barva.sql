DROP INDEX IF EXISTS registrations_barva_idx;

CREATE INDEX IF NOT EXISTS registrations_barva_idx ON registrations (barva);