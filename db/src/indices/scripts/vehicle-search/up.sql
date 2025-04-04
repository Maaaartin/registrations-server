CREATE INDEX idx_vehicle_search_base ON registrations (tovarni_znacka, typ, datum_1_registrace);

CREATE INDEX idx_vehicle_search_electric ON registrations (tovarni_znacka, typ, datum_1_registrace)
WHERE
    plne_elektricke_vozidlo = true;

CREATE INDEX idx_vehicle_search_hybrid ON registrations (tovarni_znacka, typ, datum_1_registrace)
WHERE
    hybridni_vozidlo = true;