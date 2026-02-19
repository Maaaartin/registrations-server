-- @param {Int} $1:limit
-- @param {Int} $2:offset
-- @param {String} $3:tovarni_znacka?
-- @param {String} $4:typ?
-- @param {DateTime} $5:datum_prvni_registrace_od?
-- @param {DateTime} $6:datum_prvni_registrace_do?
-- @param {Int} $7:rok_vyroby_od?
-- @param {Int} $8:rok_vyroby_do?
-- @param {Boolean} $9:only_electric?
-- @param {Boolean} $10:only_hybrid?
-- @param {Boolean} $11:only_imported?
-- @param {Boolean} $12:only_removed?
-- @param {String} $13:palivo?
-- @param {Boolean} $14:valid_vin?
SELECT
    r.id
FROM
    discover_mv r
WHERE
    (
        $3::TEXT IS NULL
        OR r.tovarni_znacka = $3
    )
    AND (
        $4::TEXT IS NULL
        OR r.obchodni_oznaceni = $4
    )
    AND (
        $5::DATE IS NULL
        OR r.datum_1_registrace >= $5
    )
    AND (
        $6::DATE IS NULL
        OR r.datum_1_registrace <= $6
    )
    AND (
        $7::INT IS NULL
        OR r.rok_vyroby >= $7
    )
    AND (
        $8::INT IS NULL
        OR r.rok_vyroby <= $8
    )
    AND (
        $9::BOOLEAN IS NOT TRUE
        OR r.plne_elektricke_vozidlo = TRUE
    )
    AND (
        $10::BOOLEAN IS NOT TRUE
        OR r.hybridni_vozidlo = TRUE
    )
    AND (
        $11::BOOLEAN IS NOT TRUE
        OR r.imported = TRUE
    )
    AND (
        $12::BOOLEAN IS NOT TRUE
        OR r.removed = TRUE
    )
    AND (
        $13::TEXT IS NULL
        OR r.palivo = $13
    )
    AND (
        $14::BOOLEAN IS NOT TRUE
        OR r.vin_valid = TRUE
    )
ORDER BY
    r.id ASC
LIMIT
    $1
OFFSET
    $2;