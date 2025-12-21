CREATE INDEX IF NOT EXISTS imports_country_pcv_idx ON imports (country, pcv);

CREATE INDEX IF NOT EXISTS registrations_tovarni_typ_pcv_idx ON registrations (tovarni_znacka, typ, pcv);