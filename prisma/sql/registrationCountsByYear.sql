-- @param {Int} $1:minYear
-- @param {Int} $2:maxYear
SELECT
    *
FROM
    counts_by_year
WHERE
    year > $1
    AND year < $2
ORDER BY
    year;