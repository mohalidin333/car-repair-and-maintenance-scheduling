CREATE TABLE
    IF NOT EXISTS `payment_settings` (
        `id` SERIAL PRIMARY KEY,
        `status` TEXT CHECK (status IN ('active', 'inactive')) NOT NULL,
        `times` TEXT NOT NULL,
        `restdays` TEXT NOT NULL,
        `holidays` TEXT NOT NULL,
        `created_at` TIMESTAMP DEFAULT now ()
    )