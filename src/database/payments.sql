CREATE TABLE
    IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        amount_pay NUMERIC(10, 2) NOT NULL,
        amount_payed NUMERIC(10, 2) NOT NULL,
        reference TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT now ()
    );
