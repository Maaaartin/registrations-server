-- @param {String} $1:brand
-- @param {String} $2:obchodni_oznaceni?
-- @param {Int} $3:limit
SELECT
    obchodni_oznaceni,
    count
FROM
    obchodni_oznaceni_per_brand
WHERE
    tovarni_znacka = $1
    AND (
        $2::TEXT IS NULL
        OR obchodni_oznaceni ILIKE $2 || '%'
    )
ORDER BY
    count DESC
LIMIT
    $3;