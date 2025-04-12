CREATE INDEX idx_registrations_paginated ON registrations (
    tovarni_znacka,
    typ,
    datum_1_registrace,
    plne_elektricke_vozidlo,
    hybridni_vozidlo
) INCLUDE (id);

CREATE INDEX idx_vehicle_search_id ON registrations (id);

CREATE INDEX idx_registrations_brand_id ON registrations (tovarni_znacka);

CREATE
OR REPLACE FUNCTION discover_registrations (
    brand TEXT,
    typ_ TEXT,
    datum_od DATE,
    datum_do DATE,
    electric BOOLEAN,
    hybrid BOOLEAN,
    require_imports BOOLEAN,
    require_owners BOOLEAN,
    require_removed BOOLEAN,
    require_inspections BOOLEAN,
    require_equipment BOOLEAN
) RETURNS TABLE (
    id INTEGER,
    tovarni_znacka TEXT,
    typ TEXT,
    datum_1_registrace DATE,
    pcv BIGINT,
    cislo_orv TEXT,
    cislo_tp TEXT,
    vin TEXT
) AS '
DECLARE
  p_brand ALIAS FOR brand;
  p_typ ALIAS FOR typ_;
  p_datum_od ALIAS FOR datum_od;
  p_datum_do ALIAS FOR datum_do;
  p_electric ALIAS FOR electric;
  p_hybrid ALIAS FOR hybrid;
  p_require_imports ALIAS FOR require_imports;
  p_require_owners ALIAS FOR require_owners;
  p_require_removed ALIAS FOR require_removed;
  p_require_inspections ALIAS FOR require_inspections;
  p_require_equipment ALIAS FOR require_equipment;
BEGIN
  RETURN QUERY
  SELECT r.id, r.tovarni_znacka, r.typ, r.datum_1_registrace, r.pcv, r.cislo_orv, r.cislo_tp, r.vin
  FROM registrations r
  WHERE
    (p_brand IS NULL OR r.tovarni_znacka = p_brand)
    AND (p_typ IS NULL OR r.typ = p_typ)
    AND (p_datum_od IS NULL OR r.datum_1_registrace > p_datum_od)
    AND (p_datum_do IS NULL OR r.datum_1_registrace < p_datum_do)
    AND (p_electric IS NULL OR r.plne_elektricke_vozidlo = p_electric)
    AND (p_hybrid IS NULL OR r.hybridni_vozidlo = p_hybrid)
    AND (p_require_imports IS NOT TRUE OR EXISTS (SELECT 1 FROM imports i WHERE i.pcv = r.pcv))
    AND (p_require_owners IS NOT TRUE OR EXISTS (SELECT 1 FROM owners o WHERE o.pcv = r.pcv))
    AND (p_require_removed IS NOT TRUE OR EXISTS (SELECT 1 FROM removed_vehicles rv WHERE rv.pcv = r.pcv))
    AND (p_require_inspections IS NOT TRUE OR EXISTS (SELECT 1 FROM inspections ins WHERE ins.pcv = r.pcv))
    AND (p_require_equipment IS NOT TRUE OR EXISTS (SELECT 1 FROM equipment e WHERE e.pcv = r.pcv))
  ORDER BY
    r.id;
END
' LANGUAGE plpgsql;