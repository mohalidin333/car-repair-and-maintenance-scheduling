CREATE TABLE
    IF NOT EXISTS `inventory_sales` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `category` TEXT CHECK (`category` IN ('Product', 'Part')) NOT NULL,
        `item_name` TEXT NOT NULL,
        `quantity` INT NOT NULL,
        `total_price` NUMERIC(10, 2) NOT NULL,
        `created_at` TIMESTAMP DEFAULT now ()
    )