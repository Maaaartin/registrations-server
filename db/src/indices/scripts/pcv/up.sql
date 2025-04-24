CREATE INDEX IF NOT EXISTS equipment_pcv_idx ON equipment (pcv);

CREATE INDEX IF NOT EXISTS imports_pcv_idx ON imports (pcv);

CREATE INDEX IF NOT EXISTS inspections_pcv_idx ON inspections (pcv);

CREATE INDEX IF NOT EXISTS owners_pcv_idx ON owners (pcv);

CREATE INDEX IF NOT EXISTS removed_vehicles_pcv_idx ON removed_vehicles (pcv);

CREATE INDEX IF NOT EXISTS registrations_pcv_idx ON registrations (pcv);