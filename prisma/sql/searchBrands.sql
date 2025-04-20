-- @param {String} $1:brand?
-- @param {Int} $2:limit
SELECT
    *
FROM
    top_brands
WHERE
    $1::TEXT IS NULL
    OR tovarni_znacka ILIKE $1 || '%'
LIMIT
    $2;