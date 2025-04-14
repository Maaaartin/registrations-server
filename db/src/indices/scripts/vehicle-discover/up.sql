CREATE INDEX idx_registrations_common_filters ON registrations (
  plne_elektricke_vozidlo,
  hybridni_vozidlo,
  datum_1_registrace,
  rok_vyroby
) INCLUDE (id);

CREATE INDEX idx_registrations_electric ON registrations (plne_elektricke_vozidlo) INCLUDE (id);

CREATE INDEX idx_registrations_hybrid ON registrations (hybridni_vozidlo) INCLUDE (id);

CREATE INDEX idx_registrations_brand ON registrations (tovarni_znacka) INCLUDE (id);

CREATE INDEX idx_registrations_brand_typ ON registrations (tovarni_znacka, typ) INCLUDE (id);

CREATE INDEX idx_vehicle_search_id ON registrations (id);

CREATE
OR REPLACE FUNCTION discover_registrations (
  brand TEXT,
  typ_ TEXT,
  datum_od DATE,
  datum_do DATE,
  production_year_from BIGINT,
  production_year_to BIGINT,
  electric BOOLEAN,
  hybrid BOOLEAN,
  require_imports BOOLEAN,
  require_removed BOOLEAN,
  p_limit INT,
  p_offset INT
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
  p_production_year_from ALIAS FOR production_year_from;
  p_production_year_to ALIAS FOR production_year_to;
  p_electric ALIAS FOR electric;
  p_hybrid ALIAS FOR hybrid;
  p_require_imports ALIAS FOR require_imports;
  p_require_removed ALIAS FOR require_removed;
BEGIN
  RETURN QUERY
  SELECT r.id, r.tovarni_znacka, r.typ, r.datum_1_registrace, r.pcv, r.cislo_orv, r.cislo_tp, r.vin
  FROM registrations r
  WHERE
    (p_brand IS NULL OR r.tovarni_znacka = p_brand)
    AND (p_typ IS NULL OR r.typ = p_typ)
    AND (p_datum_od IS NULL OR r.datum_1_registrace >= p_datum_od)
    AND (p_datum_do IS NULL OR r.datum_1_registrace <= p_datum_do)
    AND (production_year_from IS NULL OR r.rok_vyroby >= production_year_from)
    AND (production_year_to IS NULL OR r.rok_vyroby <= production_year_to)
    AND (p_electric IS NULL OR r.plne_elektricke_vozidlo = p_electric)
    AND (p_hybrid IS NULL OR r.hybridni_vozidlo = p_hybrid)
    AND (
      NOT (
        p_require_imports OR
        p_require_removed
      ) OR r.pcv IS NOT NULL
    )
    AND (p_require_imports IS NOT TRUE OR EXISTS (SELECT 1 FROM imports i WHERE i.pcv = r.pcv))
    AND (p_require_removed IS NOT TRUE OR EXISTS (SELECT 1 FROM removed_vehicles rv WHERE rv.pcv = r.pcv))
  ORDER BY
    r.id
  LIMIT p_limit
  OFFSET p_offset;
END
' LANGUAGE plpgsql;