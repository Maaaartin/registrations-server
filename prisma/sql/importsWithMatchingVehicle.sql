-- @param {Int} $1:limit
-- @param {Int} $2:offset
-- @param {String} $3:country?
-- @param {String} $4:tovarni_znacka?
-- @param {String} $5:typ?
WITH
    matched_imports AS (
        SELECT DISTINCT
            i.pcv
        FROM
            imports i
            JOIN registrations r ON i.pcv = r.pcv
        WHERE
            (
                i.country = $3
                OR $3 IS NULL
            ) -- Optional country filter
            AND (
                $4::TEXT IS NULL
                OR r.tovarni_znacka = $4
            ) -- Optional brand filter
            AND (
                $5::TEXT IS NULL
                OR r.obchodni_oznaceni = $5
            ) -- Optional model filter
        ORDER BY
            i.pcv -- Ensure deterministic ordering for pagination
        LIMIT
            $1
        OFFSET
            $2
    )
    -- Query to get paginated import records with matches in registrations
SELECT
    'imports' AS source,
    i.pcv,
    i.id
FROM
    imports i
WHERE
    i.pcv IN (
        SELECT
            pcv
        FROM
            matched_imports
    )
UNION ALL
-- Query to get corresponding registration records
SELECT
    'registrations' AS source,
    r.pcv,
    r.id
FROM
    registrations r
WHERE
    r.pcv IN (
        SELECT
            pcv
        FROM
            matched_imports
    );