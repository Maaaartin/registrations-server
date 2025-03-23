CREATE INDEX idx_znacka_typ ON registrations (tovarni_znacka, typ)
WHERE
    tovarni_znacka IS NOT NULL
    AND typ IS NOT NULL;

;