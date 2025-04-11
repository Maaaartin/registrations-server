CREATE INDEX idx_registrations_paginated ON registrations (
    tovarni_znacka,
    typ,
    datum_1_registrace,
    plne_elektricke_vozidlo,
    hybridni_vozidlo
) INCLUDE (id);

CREATE INDEX idx_vehicle_search_id ON registrations (id);

CREATE INDEX idx_registrations_brand_id ON registrations (tovarni_znacka);