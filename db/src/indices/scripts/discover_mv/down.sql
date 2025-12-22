DROP INDEX IF EXISTS discover_mv_id_idx;
DROP INDEX IF EXISTS discover_mv_brand_model_id_idx;
DROP INDEX IF EXISTS discover_mv_brand_trgm_idx;
DROP INDEX IF EXISTS discover_mv_obchodni_oznaceni_trgm_idx;
DROP INDEX IF EXISTS discover_mv_datum_1_registrace_id_idx;
DROP INDEX IF EXISTS discover_mv_rok_vyroby_id_idx;
DROP INDEX IF EXISTS discover_mv_datum_rok_id_idx;
DROP INDEX IF EXISTS discover_mv_plne_elektricke_true_id_idx;
DROP INDEX IF EXISTS discover_mv_plne_elektricke_rok_vyroby_id_idx;
DROP INDEX IF EXISTS discover_mv_hybridni_true_id_idx;
DROP INDEX IF EXISTS discover_mv_hybridni_rok_vyroby_id_idx;
DROP INDEX IF EXISTS discover_mv_imported_true_id_idx;
DROP INDEX IF EXISTS discover_mv_removed_true_id_idx;

DROP MATERIALIZED VIEW IF EXISTS discover_mv;
