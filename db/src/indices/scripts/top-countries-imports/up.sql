CREATE MATERIALIZED VIEW
    top_countries_imports AS
SELECT
    country,
    COUNT(country)
FROM
    imports
WHERE
    country IS NOT NULL
GROUP BY
    country
ORDER BY
    COUNT desc;