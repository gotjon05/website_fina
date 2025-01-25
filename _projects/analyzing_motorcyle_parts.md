---
title: Analyzing Motorcycle Parts
platform: DataCamp
difficulty: Hard
tags:
  - 
category: SQL
---


## Sales
| Column | Data type | Description |
|--------|-----------|-------------|
| `order_number` | `VARCHAR` | Unique order number. |
| `date` | `DATE` | Date of the order, from June to August 2021. |
| `warehouse` | `VARCHAR` | The warehouse that the order was made from&mdash; `North`, `Central`, or `West`. |
| `client_type` | `VARCHAR` | Whether the order was `Retail` or `Wholesale`. |
| `product_line` | `VARCHAR` | Type of product ordered. |
| `quantity` | `INT` | Number of products ordered. | 
| `unit_price` | `FLOAT` | Price per product (dollars). |
| `total` | `FLOAT` | Total price of the order (dollars). |
| `payment` | `VARCHAR` | Payment method&mdash;`Credit card`, `Transfer`, or `Cash`. |
| `payment_fee` | `FLOAT` | Percentage of `total` charged as a result of the `payment` method. |


Find out how much Wholesale net revenue each product_line generated per month per warehouse in the dataset.
The query should be saved as revenue_by_product_line using the SQL cell provided, and contain the following:
product_line, month: displayed as 'June', 'July', and 'August', warehouse, and net_revenue: the sum of total minus the sum of payment_fee.
The results should be sorted by product_line and month, followed by net_revenue in descending order.

## Requirements
- Wholesale net revenue (sum of total minus the sum of payment_fee) grouped by product_line, month and warehouse
- required fields: product_line, month (displayed with proper case name), warehouse, net revenue
- sorted by product_line and month, followed by net_revenue in descending order
-filter by wholsesale 

This problem looks fairly straightforward, my aggregate value wholesale net revenue and the non-aggregates im grouping by are product_line, month, warehouse, net revenue. I need to extract the month name from the date

```SQL
SELECT
    product_line,
    EXTRACT(MONTH FROM date) AS month,
    warehouse, 
    SUM(total-payment_fee) AS net_revenue
FROM
    sales
WHERE
    client_type = 'Wholesale'
GROUP BY
    product_line,
    month,
    warehouse
ORDER BY
     product_line,
     month,
     net_revenue DESC
```

##Solution

I needed to use TO_CHAR for postgresql to extract month name from date field. Extract only gave me the number of the month
```sql
SELECT
    product_line,
    TO_CHAR(date, 'FMMonth') AS month,
    warehouse, 
    SUM(total - payment_fee) AS net_revenue
FROM
    sales
WHERE
    client_type = 'Wholesale'
GROUP BY
    product_line,
    TO_CHAR(date, 'FMMonth'),
    warehouse
ORDER BY
    product_line,
    month,
    net_revenue DESC
```