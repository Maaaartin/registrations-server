CREATE MATERIALIZED VIEW
    top_brands AS
SELECT
    tovarni_znacka,
    COUNT(tovarni_znacka)
FROM
    registrations
WHERE
    tovarni_znacka IS NOT NULL
GROUP BY
    tovarni_znacka
ORDER BY
    COUNT desc;