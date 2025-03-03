CREATE MATERIALIZED VIEW
    id_count AS
SELECT
    COUNT(id)
FROM
    registrations;