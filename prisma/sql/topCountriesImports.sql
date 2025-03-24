-- @param {Int} $1:limit
SELECT
    *
FROM
    top_countries_imports
LIMIT
    $1;