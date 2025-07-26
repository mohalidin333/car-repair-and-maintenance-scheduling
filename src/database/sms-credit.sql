CREATE TABLE
    IF NOT EXISTS sms_credit (
        id SERIAL PRIMARY KEY,
        credit numeric(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT now ()
    );