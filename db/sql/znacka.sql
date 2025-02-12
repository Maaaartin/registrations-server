DROP INDEX IF EXISTS registrations_tovarni_znacka_idx;

CREATE INDEX IF NOT EXISTS registrations_tovarni_znacka_idx ON registrations (tovarni_znacka);