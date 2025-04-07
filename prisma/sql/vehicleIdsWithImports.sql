-- @param {String} $1:brand?
-- @param {String} $2:model?
-- @param {DateTime} $3:datum_1_registrace_od?
-- @param {DateTime} $4:datum_1_registrace_do?
-- @param {Boolean} $5:plne_elektricke_vozidlo?
-- @param {Boolean} $6:hybridni_vozidlo?
-- @param {Int} $7:limit?
-- @param {Int} $8:offset?
-- @param {Boolean} $9:only_count?
WITH
    filtered AS (
        SELECT
            r.id
        FROM
            registrations r
            JOIN imports i ON r.pcv = i.pcv
        WHERE
            (
                r.tovarni_znacka = $1
                OR $1 IS NULL
            )
            AND (
                r.typ = $2
                OR $2 IS NULL
            )
            AND (
                r.datum_1_registrace > $3
                OR $3 IS NULL
            )
            AND (
                r.datum_1_registrace < $4
                OR $4 IS NULL
            )
            AND (
                r.plne_elektricke_vozidlo = $5
                OR $5 IS NULL
            )
            AND (
                r.hybridni_vozidlo = $6
                OR $6 IS NULL
            )
    ),
    results AS (
        SELECT
            id
        FROM
            filtered
        ORDER BY
            id
        LIMIT
            CASE
                WHEN NOT $9 THEN $7
                ELSE NULL::INT
            END
        OFFSET
            CASE
                WHEN NOT $9 THEN $8
                ELSE NULL::INT
            END
    ),
    counted AS (
        SELECT
            COUNT(*) AS total_count
        FROM
            filtered
    )
    -- Only return paginated data
SELECT
    r.id,
    NULL AS total_count
FROM
    results r
WHERE
    NOT $9
UNION ALL
-- Only return total count
SELECT
    NULL AS id,
    c.total_count
FROM
    counted c
WHERE
    $9;