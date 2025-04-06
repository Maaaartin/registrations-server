-- @param {String} $1:brand?
-- @param {String} $2:model?
-- @param {DateTime} $3:datum_1_registrace_od?
-- @param {DateTime} $4:datum_1_registrace_do?
-- @param {Boolean} $5:plne_elektricke_vozidlo?
-- @param {Boolean} $6:hybridni_vozidlo?
-- @param {Int} $7:limit?
-- @param {Int} $8:offset?
SELECT DISTINCT
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
ORDER BY
    r.id
LIMIT
    $7
OFFSET
    $8;