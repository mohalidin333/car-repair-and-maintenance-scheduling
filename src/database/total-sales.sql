CREATE TABLE
    IF NOT EXISTS total_sales (
        id SERIAL PRIMARY KEY,
        service NUMERIC(10, 2) NOT NULL,
        inventory NUMERIC(10, 2) NOT NULL,
        total NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT now ()
    );
