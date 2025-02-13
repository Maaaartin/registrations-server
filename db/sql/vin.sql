DROP INDEX IF EXISTS registrations_vin_idx;

CREATE INDEX IF NOT EXISTS registrations_vin_idx ON registrations (vin);