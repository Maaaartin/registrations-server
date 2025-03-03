CREATE MATERIALIZED VIEW
    top_types_per_brand AS
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