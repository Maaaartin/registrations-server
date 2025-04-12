-- @param {String} $1:brand?
-- @param {String} $2:model?
-- @param {DateTime} $3:datum_od?
-- @param {DateTime} $4:datum_do?
-- @param {Boolean} $5:electric?
-- @param {Boolean} $6:hybrid?
-- @param {Boolean} $7:require_imports?
-- @param {Boolean} $8:require_owners?
-- @param {Boolean} $9:require_removed?
-- @param {Boolean} $10:require_inspections?
-- @param {Boolean} $11:require_equipment?
-- @param {Int} $12:limit
-- @param {Int} $13:offset
SELECT
    *
FROM
    discover_registrations (
        $1::text,
        $2::text,
        $3::date,
        $4::date,
        $5::boolean,
        $6::boolean,
        $7::boolean,
        $8::boolean,
        $9::boolean,
        $10::boolean,
        $11::boolean,
        $12::integer,
        $13::integer
    );