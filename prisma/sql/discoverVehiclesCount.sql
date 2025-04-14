-- @param {String} $1:brand?
-- @param {String} $2:model?
-- @param {DateTime} $3:datum_od?
-- @param {DateTime} $4:datum_do?
-- @param {BigInt} $5:production_year_from?
-- @param {BigInt} $6:production_year_to?
-- @param {Boolean} $7:electric?
-- @param {Boolean} $8:hybrid?
-- @param {Boolean} $9:require_imports?
-- @param {Boolean} $10:require_removed?
-- @param {Int} $11:limit
SELECT
    COUNT(id)
FROM
    discover_registrations (
        $1::text,
        $2::text,
        $3::date,
        $4::date,
        $5::bigint,
        $6::bigint,
        $7::boolean,
        $8::boolean,
        $9::boolean,
        $10::boolean,
        $11::integer,
        null
    );