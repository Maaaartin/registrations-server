CREATE INDEX registrations_electric_hybrid_idx ON registrations (plne_elektricke_vozidlo, hybridni_vozidlo)
WHERE
    plne_elektricke_vozidlo IS TRUE
    OR hybridni_vozidlo IS TRUE;