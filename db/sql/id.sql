DROP INDEX IF EXISTS registrations_id_idx;

CREATE INDEX IF NOT EXISTS registrations_id_idx ON registrations (id);