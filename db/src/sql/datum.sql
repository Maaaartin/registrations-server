DROP MATERIALIZED VIEW IF EXISTS registration_counts_by_year;

CREATE MATERIALIZED VIEW registration_counts_by_year AS
SELECT
    EXTRACT(
        YEAR
        FROM
            datum_1_registrace
    ) AS year,
    COUNT(*)
FROM
    registrations
WHERE
    datum_1_registrace IS NOT NULL
GROUP BY
    EXTRACT(
        YEAR
        FROM
            datum_1_registrace
    );