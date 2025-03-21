CREATE MATERIALIZED VIEW
    top_fuels AS
SELECT
    palivo,
    COUNT(palivo)
FROM
    registrations
WHERE
    palivo IS NOT NULL
GROUP BY
    palivo
ORDER BY
    COUNT desc;