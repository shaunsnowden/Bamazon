-- Create and USE SQL Database --

CREATE DATABASE bamazon;
USE bamazon;

-- create table 'products' with required fields -- 
create table products (
	primary key(itemID),
	itemID INTEGER(10) auto_increment not null,
    product_name varchar(100),
    department_name varchar(100),
    sales_price FLOAT(10,2),
    stock_quant int(10)
);

-- Verify creation --
Select * FROM products


-- Add items into table --
INSERT INTO products (product_name, department_name, sales_price, stock_quant)
VALUES ("pikachuplush", "toys", 10.50, 124),
	("puppydoll", "toys", 5, 15),
	("chair1", "furniture", 50, 5),
	("table2", "furniture", 90,12),
    ("table_large", "furniture", 200.75,2),
    ("dell_laptop", "technology", 799.99,15),
    ("monitor_1", "technology", 159.99,2),
    ("macbook", "technology", 1999.99,21),
    ("ipad", "technology", 699.50,2),
    ("wireless_mouse", "technolgy", 19.99,32),
    ("toy4totts", "toys", 15.20, 15);
    
-- Selection Queries --
SELECT * FROM products WHERE itemID=2;
UPDATE products SET stock_quant=11 WHERE itemID=11;
    