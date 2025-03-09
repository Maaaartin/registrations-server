CREATE MATERIALIZED VIEW
    top_kinds AS
SELECT
    druh_vozidla,
    COUNT(druh_vozidla)
FROM
    registrations
WHERE
    druh_vozidla IS NOT NULL
GROUP BY
    druh_vozidla
ORDER BY
    COUNT desc;