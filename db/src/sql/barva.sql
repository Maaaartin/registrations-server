DROP MATERIALIZED VIEW IF EXISTS registration_top_colors;

CREATE MATERIALIZED VIEW registration_top_colors AS
SELECT
    barva,
    COUNT(barva)
FROM
    registrations
WHERE
    barva IS NOT NULL
GROUP BY
    barva
ORDER BY
    COUNT desc;