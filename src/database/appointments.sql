CREATE TABLE
    IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        contact TEXT NOT NULL,
        address TEXT NOT NULL,
        car_name TEXT NOT NULL,
        plate_number TEXT NOT NULL,
        issue_description TEXT NOT NULL,
        car_images TEXT NOT NULL,
        schedule TEXT NOT NULL,
        service_type TEXT CHECK (service_type IN ('Repair', 'Maintenance')) NOT NULL,
        service_name TEXT NOT NULL,
        service TEXT NOT NULL,
        service_fee NUMERIC(10, 2) NOT NULL,
        inventory TEXT NOT NULL,
        inventory_fee NUMERIC(10, 2) NOT NULL,
        total_fee NUMERIC(10, 2) NOT NULL,
        appointment_type TEXT CHECK (appointment_type IN ('Walk-in', 'Online')) NOT NULL,
        status TEXT CHECK (
            status IN (
                'Pending',
                'Approved',
                'Disapproved',
                'Cancelled',
                'In-Progress',
                'Completed'
            )
        ) NOT NULL,
        follow_up_for TEXT NOT NULL,
        follow_up_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT now ()
    );
