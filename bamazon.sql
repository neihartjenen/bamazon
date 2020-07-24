DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(60) NULL,
    department_name VARCHAR(60) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Dish Soap (67.6 fl.oz.)", "Cleaning Supplies", 25.00, 1000), 
("Hand Soap (121 oz.)", "Cleaning Supplies", 25.00, 2500), 
("Toilet Paper (30 ct.)", "Cleaning Supplies", 30.00, 3000), 
("Canvas Mask (1 ct.)", "Safety", 15.00, 2500), 
("N95 mask (25 ct.)", "Safety", 50.00, 2000),
("Chicken Breast (1 ct.)", "Groceries", 8.25, 10000),
("Eye Goggles (1 ct)", "Safety", 23.00, 2500),
("Sour Patch Kids (1 ct.)", "Groceries", 2.00, 10000),
("Clorox Wipes (100 ct.)", "Cleaning Supplies", 10.00, 2500);
