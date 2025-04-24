CREATE INDEX IF NOT EXISTS registrations_cislo_orv_idx ON registrations (cislo_orv)
WHERE
    cislo_orv IS NOT NULL;

CREATE INDEX IF NOT EXISTS registrations_cislo_tp_idx ON registrations (cislo_tp)
WHERE
    cislo_tp IS NOT NULL;

CREATE INDEX IF NOT EXISTS registrations_vin_idx ON registrations (vin)
WHERE
    vin IS NOT NULL;

CREATE INDEX idx_vehicle_search_id ON registrations (id);