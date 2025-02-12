DROP MATERIALIZED VIEW IF EXISTS registration_ids;

CREATE MATERIALIZED VIEW registration_ids AS
SELECT
    COUNT(id)
FROM
    registrations;