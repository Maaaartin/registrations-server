CREATE INDEX IF NOT EXISTS owners_ico_idx ON owners (ico)
WHERE
    ico IS NOT NULL;