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

-- Ensure extension needed for trigram indexes (used for brand/model search)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE UNIQUE INDEX IF NOT EXISTS discover_mv_id_idx ON discover_mv (id);

-- Equality filters on brand/model + ordering for pagination
CREATE INDEX IF NOT EXISTS discover_mv_brand_model_id_idx
  ON discover_mv (tovarni_znacka, obchodni_oznaceni, id);

-- Trigram search support for brand/model lookups
CREATE INDEX IF NOT EXISTS discover_mv_brand_trgm_idx
  ON discover_mv USING gin (tovarni_znacka gin_trgm_ops);

CREATE INDEX IF NOT EXISTS discover_mv_obchodni_oznaceni_trgm_idx
  ON discover_mv USING gin (obchodni_oznaceni gin_trgm_ops);

-- Date/year range filters + pagination ordering
CREATE INDEX IF NOT EXISTS discover_mv_datum_1_registrace_id_idx
  ON discover_mv (datum_1_registrace, id);

CREATE INDEX IF NOT EXISTS discover_mv_rok_vyroby_id_idx
  ON discover_mv (rok_vyroby, id);

CREATE INDEX IF NOT EXISTS discover_mv_datum_rok_id_idx
  ON discover_mv (datum_1_registrace, rok_vyroby, id);

-- Narrow boolean filters (pohon/imported/removed) with ordering
CREATE INDEX IF NOT EXISTS discover_mv_plne_elektricke_true_id_idx
  ON discover_mv (datum_1_registrace, id)
  WHERE plne_elektricke_vozidlo IS TRUE;

CREATE INDEX IF NOT EXISTS discover_mv_plne_elektricke_rok_vyroby_id_idx
  ON discover_mv (rok_vyroby, id)
  WHERE plne_elektricke_vozidlo IS TRUE;

CREATE INDEX IF NOT EXISTS discover_mv_hybridni_true_id_idx
  ON discover_mv (datum_1_registrace, id)
  WHERE hybridni_vozidlo IS TRUE;

CREATE INDEX IF NOT EXISTS discover_mv_hybridni_rok_vyroby_id_idx
  ON discover_mv (rok_vyroby, id)
  WHERE hybridni_vozidlo IS TRUE;

CREATE INDEX IF NOT EXISTS discover_mv_imported_true_id_idx
  ON discover_mv (datum_1_registrace, id)
  WHERE imported IS TRUE;

CREATE INDEX IF NOT EXISTS discover_mv_removed_true_id_idx
  ON discover_mv (datum_1_registrace, id)
  WHERE removed IS TRUE;
