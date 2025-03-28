CREATE INDEX registrations_tovarni_znacka_idx ON registrations (tovarni_znacka)
WHERE
    tovarni_znacka IS NOT NULL;