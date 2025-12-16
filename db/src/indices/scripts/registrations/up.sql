CREATE INDEX IF NOT EXISTS registrations_cislo_orv_idx ON registrations (cislo_orv)
WHERE
    cislo_orv IS NOT NULL;

CREATE INDEX IF NOT EXISTS registrations_cislo_tp_idx ON registrations (cislo_tp)
WHERE
    cislo_tp IS NOT NULL;

CREATE INDEX IF NOT EXISTS registrations_vin_idx ON registrations (vin)
WHERE
    vin IS NOT NULL;

CREATE INDEX idx_vehicle_search_id ON registrations (id);

-- Support fast prefix/full-text matches on brand and trade name
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS registrations_brand_trgm_idx
    ON registrations USING gin (tovarni_znacka gin_trgm_ops);
CREATE INDEX IF NOT EXISTS registrations_obchodni_oznaceni_trgm_idx
    ON registrations USING gin (obchodni_oznaceni gin_trgm_ops);

-- Speed up range filters
CREATE INDEX IF NOT EXISTS registrations_datum_1_registrace_idx
    ON registrations (datum_1_registrace);
CREATE INDEX IF NOT EXISTS registrations_hybridni_vozidlo_id_idx
    ON registrations (hybridni_vozidlo, id);
