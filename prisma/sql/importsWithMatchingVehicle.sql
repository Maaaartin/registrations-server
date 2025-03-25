-- @param {Int} $1:limit
-- @param {Int} $2:offset
-- @param {String} $3:country?
WITH
    matched_vehicles AS (
        SELECT
            i.pcv,
            r.pcv AS registration_pcv
        FROM
            imports i
            JOIN registrations r ON i.pcv = r.pcv
        LIMIT
            10
    )
SELECT
    *
FROM
    imports i
WHERE
    (
        i.country = $3
        OR $3 IS NULL
    )
    AND i.pcv IN (
        SELECT
            pcv
        FROM
            matched_vehicles
    )
LIMIT
    $1
OFFSET
    $2;