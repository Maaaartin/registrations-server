-- @param {String} $1:brand
-- @param {Int} $2:limit
SELECT
    *
FROM
    registration_top_brands
WHERE
    tovarni_znacka ILIKE $1 || '%'
LIMIT
    $2;