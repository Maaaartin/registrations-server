-- @param {String} $1:brand
-- @param {String} $2:model
-- @param {Int} $3:limit
SELECT
    typ,
    count
FROM
    top_types_per_brand
WHERE
    tovarni_znacka = $1
    AND typ ILIKE $2 || '%'
ORDER BY
    count DESC
LIMIT
    $3;