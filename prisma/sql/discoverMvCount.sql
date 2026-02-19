-- @param {String} $1:tovarni_znacka?
-- @param {String} $2:typ?
-- @param {DateTime} $3:datum_prvni_registrace_od?
-- @param {DateTime} $4:datum_prvni_registrace_do?
-- @param {Int} $5:rok_vyroby_od?
-- @param {Int} $6:rok_vyroby_do?
-- @param {Boolean} $7:only_electric?
-- @param {Boolean} $8:only_hybrid?
-- @param {Boolean} $9:only_imported?
-- @param {Boolean} $10:only_removed?
-- @param {String} $11:palivo?
-- @param {Boolean} $12:valid_vin?
SELECT
    COUNT(*)::bigint AS count
FROM
    (
        SELECT
            1
        FROM
            discover_mv r
        WHERE
            (
                $1::TEXT IS NULL
                OR r.tovarni_znacka = $1
            )
            AND (
                $2::TEXT IS NULL
                OR r.obchodni_oznaceni = $2
            )
            AND (
                $3::DATE IS NULL
                OR r.datum_1_registrace >= $3
            )
            AND (
                $4::DATE IS NULL
                OR r.datum_1_registrace <= $4
            )
            AND (
                $5::INT IS NULL
                OR r.rok_vyroby >= $5
            )
            AND (
                $6::INT IS NULL
                OR r.rok_vyroby <= $6
            )
            AND (
                $7::BOOLEAN IS NOT TRUE
                OR r.plne_elektricke_vozidlo = TRUE
            )
            AND (
                $8::BOOLEAN IS NOT TRUE
                OR r.hybridni_vozidlo = TRUE
            )
            AND (
                $9::BOOLEAN IS NOT TRUE
                OR r.imported = TRUE
            )
            AND (
                $10::BOOLEAN IS NOT TRUE
                OR r.removed = TRUE
            )
            AND (
                $11::TEXT IS NULL
                OR r.palivo = $11
            )
            AND (
                $12::BOOLEAN IS NOT TRUE
                OR r.vin_valid = TRUE
            )
    ) limited;
