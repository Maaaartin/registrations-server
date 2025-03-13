-- @param {Int} $1:limit
SELECT
    *
FROM
    top_categories
LIMIT
    $1;