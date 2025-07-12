CREATE TABLE
    IF NOT EXISTS `service_sales` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `service_type` VARCHAR(255) NOT NULL,
        `service_name` VARCHAR(255) NOT NULL,
        `service_fee` NUMERIC(10, 2) NOT NULL,
        `created_at` TIMESTAMP DEFAULT now ()
    )