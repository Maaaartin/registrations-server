-- @param {String} $1:brand
-- @param {Int} $2:limit
SELECT
    typ,
    count
FROM
    registration_top_types
WHERE
    tovarni_znacka = $1
ORDER BY
    count DESC
LIMIT
    $2;