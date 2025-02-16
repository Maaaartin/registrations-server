DROP MATERIALIZED VIEW IF EXISTS registration_top_types;

CREATE MATERIALIZED VIEW
    registration_top_types AS
SELECT
    typ,
    tovarni_znacka,
    COUNT(*) AS count
FROM
    registrations
WHERE
    typ IS NOT NULL
GROUP BY
    typ,
    tovarni_znacka
ORDER BY
    count DESC;