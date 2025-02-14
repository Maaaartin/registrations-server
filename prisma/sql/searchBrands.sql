SELECT
    *
FROM
    registration_top_brands
WHERE
    tovarni_znacka ILIKE $1 || '%'
LIMIT
    $2;