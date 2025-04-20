CREATE MATERIALIZED VIEW
    obchodni_oznaceni_per_brand AS
SELECT
    obchodni_oznaceni,
    tovarni_znacka,
    COUNT(*) AS count
FROM
    registrations
WHERE
    obchodni_oznaceni IS NOT NULL
GROUP BY
    obchodni_oznaceni,
    tovarni_znacka
ORDER BY
    count DESC;