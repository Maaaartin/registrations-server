DROP MATERIALIZED VIEW IF EXISTS discover_mv;

CREATE MATERIALIZED VIEW discover_mv AS
SELECT
  r.id,
  r.tovarni_znacka,
  r.obchodni_oznaceni,
  r.datum_1_registrace,
  r.rok_vyroby,
  r.plne_elektricke_vozidlo,
  r.hybridni_vozidlo,
  EXISTS (SELECT 1 FROM imports i WHERE i.pcv = r.pcv) AS imported,
  EXISTS (SELECT 1 FROM removed_vehicles rv WHERE rv.pcv = r.pcv) AS removed
FROM registrations r
WITH DATA;

CREATE UNIQUE INDEX IF NOT EXISTS discover_mv_id_idx ON discover_mv (id);

CREATE INDEX IF NOT EXISTS discover_mv_filters_idx
  ON discover_mv (tovarni_znacka, obchodni_oznaceni, datum_1_registrace, rok_vyroby, imported, removed);

CREATE INDEX IF NOT EXISTS discover_mv_electric_idx
  ON discover_mv (plne_elektricke_vozidlo)
  WHERE plne_elektricke_vozidlo IS TRUE;

CREATE INDEX IF NOT EXISTS discover_mv_hybrid_idx
  ON discover_mv (hybridni_vozidlo)
  WHERE hybridni_vozidlo IS TRUE;
