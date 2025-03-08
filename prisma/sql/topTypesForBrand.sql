-- @param {String} $1:brand
-- @param {Int} $2:limit
SELECT
    typ,
    count
FROM
    top_types_per_brand
WHERE
    tovarni_znacka = $1
ORDER BY
    count DESC
LIMIT
    $2;