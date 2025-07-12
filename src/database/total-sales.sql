CREATE TABLE
    IF NOT EXISTS `total_sales` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `service` NUMERIC(10, 2) NOT NULL,
        `inventory` NUMERIC(10, 2) NOT NULL,
        `total` NUMERIC(10, 2) NOT NULL,
        `created_at` TIMESTAMP DEFAULT now ()
    )