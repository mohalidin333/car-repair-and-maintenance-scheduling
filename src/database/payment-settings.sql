CREATE TABLE
    IF NOT EXISTS payment_settings (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        number INT NOT NULL,
        created_at TIMESTAMP DEFAULT now ()
    );
