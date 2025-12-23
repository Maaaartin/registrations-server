-- @param {Int} $1:limit
-- @param {String} $2:palivo?
SELECT
    *
FROM
    top_fuels
WHERE
    $2::TEXT IS NULL
    OR palivo ILIKE '%' || $2 || '%'
LIMIT
    $1;