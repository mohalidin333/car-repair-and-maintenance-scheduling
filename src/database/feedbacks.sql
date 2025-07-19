CREATE TABLE
    IF NOT EXISTS feedbacks (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        ratings INT NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT now ()
    );