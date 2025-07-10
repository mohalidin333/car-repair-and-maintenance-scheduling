CREATE TABLE
    IF NOT EXISTS `inventory` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `category` TEXT CHECK (`category` IN ('Product', 'Part')) NOT NULL,
        `item_name` TEXT NOT NULL,
        `stock` FLOAT NOT NULL,
        `unit_price` NUMERIC(10, 2) NOT NULL,
        `created_at` TIMESTAMP DEFAULT now ()
    )