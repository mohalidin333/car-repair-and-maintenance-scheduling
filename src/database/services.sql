CREATE TABLE
    IF NOT EXISTS `services` (
        `id` SERIAL PRIMARY KEY,
        `service_type` TEXT CHECK (`service_type` IN ('Repair', 'Maintenance')) NOT NULL,
        `service_name` TEXT NOT NULL,
        `service_fee` FLOAT NOT NULL,
        `description` TEXT NOT NULL,
        `created_at` TIMESTAMP DEFAULT now ()
    )