CREATE INDEX idx_vehicle_search_base ON registrations (tovarni_znacka, typ, datum_1_registrace) INCLUDE (id);

CREATE INDEX idx_vehicle_search_electric ON registrations (tovarni_znacka, typ, datum_1_registrace) INCLUDE (id)
WHERE
    plne_elektricke_vozidlo = true;

CREATE INDEX idx_vehicle_search_hybrid ON registrations (tovarni_znacka, typ, datum_1_registrace) INCLUDE (id)
WHERE
    hybridni_vozidlo = true;

CREATE INDEX IF NOT EXISTS idx_vehicle_search_id ON registrations (id);