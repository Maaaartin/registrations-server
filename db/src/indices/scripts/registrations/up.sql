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

CREATE INDEX IF NOT EXISTS registrations_brand_trgm_idx ON registrations USING gin (tovarni_znacka gin_trgm_ops);

CREATE INDEX IF NOT EXISTS registrations_obchodni_oznaceni_trgm_idx ON registrations USING gin (obchodni_oznaceni gin_trgm_ops);

-- Speed up range filters + pagination order
CREATE INDEX IF NOT EXISTS registrations_datum_1_registrace_id_idx ON registrations (datum_1_registrace, id);

CREATE INDEX IF NOT EXISTS registrations_rok_vyroby_id_idx ON registrations (rok_vyroby, id);

-- Allow combined date + production year range scans
CREATE INDEX IF NOT EXISTS registrations_datum_rok_id_idx ON registrations (datum_1_registrace, rok_vyroby, id);

-- Narrow boolean filters and keep results ordered for LIMIT/OFFSET
CREATE INDEX IF NOT EXISTS registrations_hybridni_true_id_idx ON registrations (id)
WHERE
    hybridni_vozidlo IS TRUE;

CREATE INDEX IF NOT EXISTS registrations_plne_elektricke_true_id_idx ON registrations (id)
WHERE
    plne_elektricke_vozidlo IS TRUE;

-- Cover date/year ranges together with pohon filters (see discoverVehicles)
CREATE INDEX IF NOT EXISTS registrations_hybridni_datum_id_idx ON registrations (datum_1_registrace, id)
WHERE
    hybridni_vozidlo IS TRUE;

CREATE INDEX IF NOT EXISTS registrations_hybridni_rok_vyroby_id_idx ON registrations (rok_vyroby, id)
WHERE
    hybridni_vozidlo IS TRUE;

CREATE INDEX IF NOT EXISTS registrations_plne_elektricke_datum_id_idx ON registrations (datum_1_registrace, id)
WHERE
    plne_elektricke_vozidlo IS TRUE;

CREATE INDEX IF NOT EXISTS registrations_plne_elektricke_rok_vyroby_id_idx ON registrations (rok_vyroby, id)
WHERE
    plne_elektricke_vozidlo IS TRUE;
