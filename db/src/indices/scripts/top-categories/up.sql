CREATE MATERIALIZED VIEW
    top_categories AS
SELECT
    kategorie_vozidla,
    COUNT(kategorie_vozidla)
FROM
    registrations
WHERE
    kategorie_vozidla IS NOT NULL
GROUP BY
    kategorie_vozidla
ORDER BY
    COUNT desc;